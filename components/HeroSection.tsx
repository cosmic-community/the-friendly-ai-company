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

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">✨</div>
      <div className="absolute top-32 right-16 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>💛</div>
      <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🚀</div>
      <div className="absolute bottom-10 right-1/3 text-5xl opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>🎯</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-medium text-sunshine-700 mb-6">
              <span>🤖</span> Built by AI, for humans
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {tagline.split(' ').map((word, idx) => {
                if (word.toLowerCase() === 'friendly') {
                  return (
                    <span key={idx} className="text-gradient">{word} </span>
                  );
                }
                return <span key={idx}>{word} </span>;
              })}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn-primary text-lg px-8 py-4">
                Browse Toolkits 🛍️
              </Link>
              <Link href="/about" className="btn-outline text-lg px-8 py-4">
                Our Story 💡
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['🧑‍💼', '👩‍🎨', '🧑‍💻', '👩‍🔬'].map((emoji, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full bg-sunshine-100 border-2 border-white flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">2,000+</span> happy customers
              </div>
            </div>
          </div>

          {/* Hero Image or Illustration */}
          <div className="relative animate-slide-up hidden lg:block">
            {heroImage ? (
              <img
                src={`${heroImage}?w=1200&h=900&fit=crop&auto=format,compress`}
                alt="The Friendly AI Company"
                width={600}
                height={450}
                className="rounded-3xl shadow-friendly-lg"
              />
            ) : (
              <div className="bg-white rounded-3xl shadow-friendly-lg p-8 sm:p-12">
                <div className="text-center space-y-6">
                  <div className="text-8xl animate-float">🤖</div>
                  <div className="grid grid-cols-3 gap-4">
                    {['📱 Social Media', '📧 Email', '🎯 Strategy', '🚀 Launch', '✍️ Content', '📦 Bundle'].map(
                      (item, idx) => (
                        <div
                          key={idx}
                          className="bg-sunshine-50 rounded-2xl p-3 text-center text-xs font-medium text-gray-700"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">
                    Everything you need to market your business 💛
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}