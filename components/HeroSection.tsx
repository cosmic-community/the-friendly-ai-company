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

  return (
    <section className="relative overflow-hidden bg-[#FFFBF0]">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at center, #FFE066 0%, #FFD233 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle at center, #B8DDFF 0%, #57B0FF 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, #FFD233 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='%23FFD233' fill-opacity='0.35'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 mb-8 shadow-card border border-sunshine-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-meadow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-meadow-500" />
              </span>
              Built by AI, designed for humans
            </div>

            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.0] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
            >
              {tagline.includes(' ') ? (
                <>
                  {tagline.split(' ').slice(0, -2).join(' ')}{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">{tagline.split(' ').slice(-2).join(' ')}</span>
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-3 sm:h-4 -z-10 rounded-sm"
                      style={{ background: 'linear-gradient(135deg, #FFD233 0%, #FFE066 100%)', opacity: 0.6 }}
                    />
                  </span>
                </>
              ) : tagline}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Browse Toolkits
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border border-gray-200 hover:border-sunshine-300 hover:bg-sunshine-50 transition-all duration-300 text-base shadow-card hover:-translate-y-0.5 active:translate-y-0"
              >
                Our Story
              </Link>
            </div>

            {/* Social proof micro bar */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['#FF9533', '#3399FF', '#33CC5C', '#FF3385'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ background: color }}
                  >
                    {['J', 'S', 'M', 'K'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5 fill-sunshine-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-medium">Loved by 2,000+ businesses</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up flex justify-center lg:justify-end">
            {/* Glow behind image */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,210,51,0.35) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative w-full max-w-[520px]">
              {/* Floating badge top-left */}
              <div className="absolute -top-4 -left-4 z-20 animate-float">
                <div className="bg-white rounded-2xl shadow-card-hover px-4 py-2.5 flex items-center gap-2 border border-sunshine-100">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">5.0 Rating</p>
                    <p className="text-[10px] text-gray-400">2,000+ reviews</p>
                  </div>
                </div>
              </div>

              {/* Floating badge bottom-right */}
              <div className="absolute -bottom-4 -right-4 z-20 animate-float-delayed">
                <div className="bg-white rounded-2xl shadow-card-hover px-4 py-2.5 flex items-center gap-2 border border-meadow-100">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">Instant Download</p>
                    <p className="text-[10px] text-gray-400">50+ toolkits</p>
                  </div>
                </div>
              </div>

              {/* Image frame */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-card-xl ring-1 ring-black/5">
                <img
                  src={`${robotImage}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt="Friendly AI Robot Mascot"
                  width={600}
                  height={450}
                  className="w-full object-cover"
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: 'linear-gradient(to top, rgba(255,251,240,0.5), transparent)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave fade */}
      <div
        className="relative h-12 sm:h-16"
        style={{
          background: 'linear-gradient(to bottom, transparent, #FFFDF8)',
        }}
      />
    </section>
  );
}
