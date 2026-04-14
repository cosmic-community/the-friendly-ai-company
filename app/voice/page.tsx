'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function VoicePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Press the microphone to talk to HAL');
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const playTTS = useCallback(async (text: string) => {
    setIsSpeaking(true);
    setStatus('HAL is speaking...');
    try {
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('TTS failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        setStatus('Press the microphone to talk to HAL');
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        setStatus('Press the microphone to talk to HAL');
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch {
      setIsSpeaking(false);
      setStatus('Press the microphone to talk to HAL');
    }
  }, []);

  const sendToHAL = useCallback(async (userText: string) => {
    setIsProcessing(true);
    setStatus('HAL is thinking...');
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);

    try {
      const res = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      if (!res.ok) throw new Error('Chat failed');
      const data = await res.json();
      const reply = data.reply || 'Sorry, I didn\'t get a response.';
      setMessages(prev => [...prev, { role: 'assistant', text: reply, timestamp: new Date() }]);
      setIsProcessing(false);
      await playTTS(reply);
    } catch {
      setIsProcessing(false);
      setError('Failed to get a response. Please try again.');
      setStatus('Press the microphone to talk to HAL');
    }
  }, [playTTS]);

  const startListening = useCallback(() => {
    setError(null);
    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setStatus('Listening...');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result && result[0]) {
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
      }
      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Get the final transcript from the closure
      const finalText = document.getElementById('live-transcript')?.textContent?.trim();
      if (finalText) {
        sendToHAL(finalText);
      } else {
        setStatus('Press the microphone to talk to HAL');
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      if (event.error !== 'no-speech') {
        setError(`Speech recognition error: ${event.error}`);
      }
      setStatus('Press the microphone to talk to HAL');
    };

    recognition.start();

    // Audio visualizer
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const animate = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(avg / 255);
        animFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    }).catch(() => { /* mic access denied, visualizer just won't show */ });
  }, [sendToHAL]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  const handleMicClick = () => {
    if (isProcessing || isSpeaking) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      {/* Hero header */}
      <div className="text-center pt-12 pb-6 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sunshine-100 rounded-full mb-4">
          <span className="text-lg">🎙️</span>
          <span className="text-sm font-semibold text-sunshine-700">Voice Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Talk to <span className="text-sunshine-500">HAL</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Press the microphone and speak naturally. HAL will listen, respond, and speak back to you.
        </p>
      </div>

      {/* Chat transcript */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 overflow-y-auto mb-4">
        {messages.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🤖</div>
            <p className="text-sm">Your conversation will appear here</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-sunshine-400 text-gray-900 rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              {msg.role === 'assistant' && (
                <span className="text-xs font-bold text-sunshine-600 block mb-1">HAL</span>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start mb-3">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
              <span className="text-xs font-bold text-sunshine-600 block mb-1">HAL</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Live transcript */}
      {transcript && (
        <div className="text-center px-4 mb-2">
          <p id="live-transcript" className="text-sm text-gray-500 italic">&ldquo;{transcript}&rdquo;</p>
        </div>
      )}

      {/* Status */}
      <div className="text-center mb-3">
        <p className="text-xs font-medium text-gray-400">{status}</p>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center mb-3 px-4">
          <p className="text-xs text-red-500 bg-red-50 inline-block px-3 py-1.5 rounded-lg">{error}</p>
        </div>
      )}

      {/* Microphone button */}
      <div className="flex justify-center pb-10 pt-2">
        <button
          onClick={handleMicClick}
          disabled={isProcessing || isSpeaking}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] scale-110'
              : isProcessing || isSpeaking
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-br from-sunshine-400 to-sunshine-500 shadow-[0_4px_20px_rgba(255,210,51,0.5)] hover:shadow-[0_8px_30px_rgba(255,210,51,0.6)] hover:scale-105 active:scale-95'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {/* Pulse rings when listening */}
          {isListening && (
            <>
              <span
                className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"
                style={{ transform: `scale(${1 + audioLevel * 0.5})` }}
              />
              <span
                className="absolute inset-[-8px] rounded-full border-2 border-red-400 opacity-30 animate-pulse"
              />
            </>
          )}

          {/* Speaking animation */}
          {isSpeaking && (
            <span className="absolute inset-[-6px] rounded-full border-2 border-sunshine-400 opacity-40 animate-pulse" />
          )}

          {/* Mic icon */}
          {isListening ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
            </svg>
          ) : isSpeaking ? (
            <div className="flex items-center gap-[3px]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] bg-white rounded-full animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 16}px`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>
          ) : (
            <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
