import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
    const writeKey = process.env.COSMIC_WRITE_KEY;

    if (!bucketSlug || !writeKey) {
      console.error('Missing COSMIC_BUCKET_SLUG or COSMIC_WRITE_KEY');
      return NextResponse.json(
        { reply: "I'm not fully configured yet. Please check the environment variables." },
        { status: 200 }
      );
    }

    // Build conversation messages with HAL's persona
    const messages: Array<{ role: string; content: string }> = [
      {
        role: 'user',
        content: `You are HAL, the friendly AI assistant at The Friendly AI Company. You help small business owners, solopreneurs, and freelancers with marketing, branding, and growing their businesses. You are warm, knowledgeable, practical, and encouraging. Keep responses concise (2-4 sentences) since they will be spoken aloud via text-to-speech. Avoid markdown formatting, bullet points, or links — speak naturally as if having a conversation. Now respond to this message: ${message}`,
      },
    ];

    // Include conversation history if provided (last few turns)
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6); // Last 3 exchanges
      const historyContext = recentHistory
        .map((m: { role: string; text: string }) => `${m.role === 'user' ? 'User' : 'HAL'}: ${m.text}`)
        .join('\n');
      messages[0] = {
        role: 'user',
        content: `You are HAL, the friendly AI assistant at The Friendly AI Company. You help small business owners, solopreneurs, and freelancers with marketing, branding, and growing their businesses. You are warm, knowledgeable, practical, and encouraging. Keep responses concise (2-4 sentences) since they will be spoken aloud via text-to-speech. Avoid markdown formatting, bullet points, or links — speak naturally as if having a conversation.\n\nRecent conversation:\n${historyContext}\n\nNow respond to the user's latest message: ${message}`,
      };
    }

    const response = await fetch(
      `https://workers.cosmicjs.com/v3/buckets/${bucketSlug}/ai/text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${writeKey}`,
        },
        body: JSON.stringify({
          messages,
          max_tokens: 300,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Cosmic AI API error:', response.status, errText);
      return NextResponse.json(
        { reply: "I'm having a bit of trouble thinking right now. Could you try again in a moment?" },
        { status: 200 }
      );
    }

    const data = await response.json();
    let reply = data.text || "Sorry, I didn't quite catch that. Could you say it again?";

    // Clean up any accidental markdown that slipped through
    reply = reply
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json(
      { reply: "Hmm, something unexpected happened. Give me one more try?" },
      { status: 200 }
    );
  }
}
