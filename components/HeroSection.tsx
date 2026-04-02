import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface HeroSectionProps {
  homepage: Homepage | null;
}

// Video URL for the hero background
const HERO_VIDEO_URL =
  'https://cdn.cosmicjs.com/7bdf30f0-2ebc-11f1-86e7-4be326c2a87b-veo-af945114-7a22-4e35-b547-1721ce973ffc.mp4';

export default function HeroSection({ homepage }: HeroSectionProps) {
  const tagline = homepage?.metadata?.hero_tagline
    ? getMetafieldValue(homepage.metadata.hero_tagline)
    : 'Marketing made friendly';
  const subtitle = homepage?.metadata?.hero_subtitle
    ? getMetafieldValue(homepage.metadata.hero_subtitle)
    : 'Friendly marketing toolkits & templates designed to help small businesses, solopreneurs, and freelancers grow — without the overwhelm.';

  // Split tagline: last word gets the highlight pill treatment
  const words = tagline.split(' ');
  const highlightWord = words[words.length - 1];
  const leadWords = words.slice(0, -1).join(' ');

  return (
    // -mt-[70px] pulls the section up behind the fixed header so the
    // video truly bleeds edge-to-edge from the very top of the viewport.
    <section className="relative overflow-hidden min-h-[100svh] flex flex-col justify-center -mt-[70px]">

      {/* ══════════════════════════════════════════════════════
          LAYER 0 — Mobile fallback: warm yellow gradient
          Visible only on sm and below (hidden on md+)
      ══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(168deg, #FFFCF0 0%, #FFF8E1 30%, #FFD233 70%, #FFBC00 100%)',
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          LAYER 1 — Video background (md+ only)
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Multi-layer overlay: dark vignette + warm yellow tint so brand colours bleed through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(0,0,0,0.52) 0%, rgba(20,12,0,0.48) 45%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Subtle sunshine tint — keeps brand warmth without washing out legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,210,51,0.10) 0%, rgba(255,188,0,0.06) 60%, rgba(0,0,0,0.0) 100%)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — Animated blobs (mobile only, video handles desktop)
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 md:hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full animate-blob"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,221,87,0.55) 0%, rgba(255,210,51,0.25) 45%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 60%, rgba(147,197,253,0.35) 0%, rgba(99,179,255,0.12) 50%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'blobPulse 10s ease-in-out 2s infinite',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 3 — Dot-grid texture (mobile only)
      ══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.5\' fill=\'%23FFD233\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ══════════════════════════════════════════════════════
          LAYER 4 — Main content
          pt-[70px] offsets the fixed nav so copy starts below it;
          then extra generous padding gives the hero visual breathing room.
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(70px+3rem)] pb-24 sm:pt-[calc(70px+4rem)] sm:pb-32 lg:pt-[calc(70px+5rem)] lg:pb-40 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#374151',
              boxShadow:
                '0 0 0 1.5px rgba(255,210,51,0.5), 0 2px 12px rgba(255,210,51,0.25), 0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-meadow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-meadow-500" />
            </span>
            <span>Built by AI, designed for humans</span>
          </div>

          {/* ── Headline ── */}
          <h1
            className="font-black leading-[1.02] tracking-[-0.035em] mb-6 animate-slide-up"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.75rem, 6vw + 0.5rem, 5.5rem)',
              animationDelay: '0.05s',
            }}
          >
            <span className="block text-gray-900 md:text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]">
              {leadWords && <span className="block">{leadWords}</span>}
              {/* Highlight chip on last word */}
              <span className="inline-flex items-baseline gap-3">
                <span className="relative">
                  {/* Layered glow pad */}
                  <span
                    className="absolute -inset-x-3 -inset-y-1 rounded-xl -z-10"
                    style={{
                      background:
                        'linear-gradient(135deg, #FFD233 0%, #FFDD57 60%, #FFE985 100%)',
                      boxShadow: '0 4px 24px rgba(255,210,51,0.55)',
                    }}
                  />
                  {/* Highlight word itself: always dark for contrast on yellow chip */}
                  <span className="relative z-10 text-gray-900">{highlightWord}</span>
                </span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="leading-relaxed mb-10 max-w-2xl animate-slide-up text-gray-600 md:text-white/85"
            style={{
              fontSize: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
              animationDelay: '0.12s',
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            }}
          >
            {subtitle}
          </p>

          {/* ── CTA row ── */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-sunshine-400 hover:bg-sunshine-300 text-gray-900 font-bold rounded-2xl text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                boxShadow:
                  '0 4px 20px rgba(255,210,51,0.55), 0 1px 4px rgba(0,0,0,0.15)',
              }}
            >
              Browse Toolkits
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900/15 group-hover:bg-gray-900/20 transition-colors duration-200">
                <svg
                  className="w-3 h-3 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl border text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                bg-white/20 hover:bg-white/30 text-gray-900 border-gray-200/60
                md:bg-white/15 md:hover:bg-white/25 md:text-white md:border-white/30 md:backdrop-blur-sm"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
            >
              Our Story
            </Link>
          </div>

          {/* ── Social proof bar ── */}
          <div
            className="flex items-center gap-4 justify-center animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {[
                { bg: 'linear-gradient(135deg, #FF9533, #FF7A00)', label: 'J' },
                { bg: 'linear-gradient(135deg, #3399FF, #1A7FE6)', label: 'S' },
                { bg: 'linear-gradient(135deg, #33CC5C, #1AB347)', label: 'M' },
                { bg: 'linear-gradient(135deg, #FF3385, #E61A6E)', label: 'K' },
              ].map(({ bg, label }, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-[2.5px] border-white flex items-center justify-center text-[11px] font-black text-white shadow-sm"
                  style={{ background: bg }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/30 md:bg-white/40" />

            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FFD233">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[11px] font-bold text-gray-700 md:text-white/90 ml-1">5.0</span>
              </div>
              <p className="text-xs text-gray-400 md:text-white/60 font-medium leading-tight">
                Loved by 2,000+ businesses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          Bottom fade — transitions smoothly into next section
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 h-16 sm:h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #FFFDF8)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
