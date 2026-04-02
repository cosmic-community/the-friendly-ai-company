import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface HeroSectionProps {
  homepage: Homepage | null;
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const tagline = homepage?.metadata?.hero_tagline
    ? getMetafieldValue(homepage.metadata.hero_tagline)
    : 'Marketing made friendly';
  const subtitle = homepage?.metadata?.hero_subtitle
    ? getMetafieldValue(homepage.metadata.hero_subtitle)
    : 'Friendly marketing toolkits & templates designed to help small businesses, solopreneurs, and freelancers grow — without the overwhelm.';
  const heroImage = homepage?.metadata?.hero_image?.imgix_url;
  const robotImage = heroImage || 'https://imgix.cosmicjs.com/d6f6ba40-2e93-11f1-86e7-4be326c2a87b-generated-1775134792625.jpg';

  // Split tagline: last word gets the highlight pill treatment
  const words = tagline.split(' ');
  const highlightWord = words[words.length - 1];
  const leadWords = words.slice(0, -1).join(' ');

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(168deg, #FFFCF0 0%, #FFF8E1 35%, #F5F0FF 75%, #F0F7FF 100%)' }}>

      {/* ── Layer 1: Animated soft blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary sunshine blob */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full animate-blob"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255,221,87,0.55) 0%, rgba(255,210,51,0.25) 45%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Secondary blue bloom */}
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 60%, rgba(147,197,253,0.4) 0%, rgba(99,179,255,0.15) 50%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'blobPulse 10s ease-in-out 2s infinite',
          }}
        />
        {/* Lavender accent top-left */}
        <div
          className="absolute top-8 -left-16 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196,181,253,0.25) 0%, transparent 65%)',
            filter: 'blur(60px)',
            animation: 'blobPulse 12s ease-in-out 4s infinite',
          }}
        />
      </div>

      {/* ── Layer 2: Dot-grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden="true"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.5\' fill=\'%23FFD233\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")' }}
      />

      {/* ── Main content grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ════ LEFT: Copy ════ */}
          <div className="text-center lg:text-left">

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 mb-8 animate-fade-in"
              style={{
                background: 'white',
                boxShadow: '0 0 0 1.5px rgba(255,210,51,0.5), 0 2px 12px rgba(255,210,51,0.2), 0 1px 3px rgba(0,0,0,0.06)',
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
              className="font-black text-gray-900 leading-[1.02] tracking-[-0.035em] mb-6 animate-slide-up"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2.75rem, 6vw + 0.5rem, 5.25rem)',
                animationDelay: '0.05s',
              }}
            >
              {leadWords && (
                <span className="block">{leadWords}</span>
              )}
              {/* Highlight chip on last word */}
              <span className="inline-flex items-baseline gap-3">
                <span className="relative">
                  {/* Layered glow pad */}
                  <span
                    className="absolute -inset-x-3 -inset-y-1 rounded-xl -z-10"
                    style={{
                      background: 'linear-gradient(135deg, #FFD233 0%, #FFDD57 60%, #FFE985 100%)',
                      boxShadow: '0 4px 24px rgba(255,210,51,0.45)',
                    }}
                  />
                  <span className="relative z-10">{highlightWord}</span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-slide-up"
              style={{
                fontSize: 'clamp(1rem, 1.5vw + 0.25rem, 1.2rem)',
                animationDelay: '0.12s',
              }}
            >
              {subtitle}
            </p>

            {/* ── CTA row ── */}
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl text-base transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}
              >
                Browse Toolkits
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sunshine-400 group-hover:bg-sunshine-300 transition-colors duration-200">
                  <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-sunshine-300 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-base"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' }}
              >
                Our Story
              </Link>
            </div>

            {/* ── Social proof bar ── */}
            <div
              className="flex items-center gap-4 justify-center lg:justify-start animate-fade-in"
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
              <div className="w-px h-8 bg-gray-200" />

              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FFD233">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-[11px] font-bold text-gray-700 ml-1">5.0</span>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-tight">Loved by 2,000+ businesses</p>
              </div>
            </div>
          </div>

          {/* ════ RIGHT: Visual ════ */}
          <div
            className="relative flex justify-center lg:justify-end animate-slide-up"
            style={{ animationDelay: '0.08s' }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,210,51,0.28) 0%, rgba(255,210,51,0.08) 45%, transparent 65%)',
                filter: 'blur(32px)',
              }}
            />

            <div className="relative w-full max-w-[540px]">

              {/* ── Floating badge: top-left ── */}
              <div
                className="absolute -top-5 left-4 z-20 animate-float"
                style={{ animationDelay: '0s' }}
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: 'white',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(255,210,51,0.25)',
                  }}
                >
                  <div className="w-8 h-8 rounded-xl bg-sunshine-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg leading-none">⭐</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 leading-none mb-0.5">5.0 Rating</p>
                    <p className="text-[10px] text-gray-400 leading-none">2,000+ reviews</p>
                  </div>
                </div>
              </div>

              {/* ── Floating badge: bottom-right ── */}
              <div
                className="absolute -bottom-5 right-4 z-20 animate-float-delayed"
                style={{ animationDelay: '1.5s' }}
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: 'white',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(51,204,92,0.25)',
                  }}
                >
                  <div className="w-8 h-8 rounded-xl bg-meadow-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg leading-none">⚡</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 leading-none mb-0.5">Instant Download</p>
                    <p className="text-[10px] text-gray-400 leading-none">50+ toolkits ready</p>
                  </div>
                </div>
              </div>

              {/* ── Floating badge: mid-right ── */}
              <div
                className="absolute top-1/3 -right-6 z-20"
                style={{ animation: 'float 5s ease-in-out 0.75s infinite' }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(51,153,255,0.2)',
                  }}
                >
                  <span className="text-sm">🤖</span>
                  <p className="text-[11px] font-bold text-gray-700 whitespace-nowrap">AI-Powered</p>
                </div>
              </div>

              {/* ── Image frame ── */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '2rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              >
                {/* Yellow ring accent */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 rounded-[2rem]"
                  style={{ boxShadow: 'inset 0 0 0 2px rgba(255,210,51,0.2)' }}
                />
                <img
                  src={`${robotImage}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt="Friendly AI Robot Mascot"
                  width={600}
                  height={450}
                  className="w-full object-cover block"
                />
                {/* Subtle bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(255,252,240,0.6), transparent)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade-out ── */}
      <div
        className="relative h-16 sm:h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFDF8)' }}
        aria-hidden="true"
      />
    </section>
  );
}
