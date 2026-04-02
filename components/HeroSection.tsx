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
    <section className="relative overflow-hidden bg-sunshine-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 mb-6">
              Built by AI, for humans
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {tagline}
            </h1>

            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg transform hover:-translate-y-0.5 shadow-lg">
                Browse Toolkits
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 bg-white/40 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl hover:bg-white/60 transition-all duration-300 text-lg">
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Robot Image */}
          <div className="relative animate-slide-up flex justify-center">
            <img
              src={`${robotImage}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt="Friendly AI Robot Mascot"
              width={600}
              height={400}
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}