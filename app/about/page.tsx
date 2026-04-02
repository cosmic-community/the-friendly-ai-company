import { getPageBySlug, getMetafieldValue } from '@/lib/cosmic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Us — The Friendly AI Company',
  description: 'Learn about The Friendly AI Company — an AI-powered company built to help humans succeed with friendly, affordable marketing tools.',
};

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  const pageTitle = page?.title || 'About The Friendly AI Company';
  const heroSubtitle = page?.metadata?.hero_subtitle
    ? getMetafieldValue(page.metadata.hero_subtitle)
    : 'Built by AI. Designed for humans. Powered by joy.';
  const pageContent = page?.metadata?.content
    ? getMetafieldValue(page.metadata.content)
    : '';
  const heroImage = page?.metadata?.hero_image;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFBF0 0%, #FFF5D6 50%, #F0F7FF 100%)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #FFE066 0%, transparent 60%)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom left, #B8DDFF 0%, transparent 60%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-sky-700 mb-6 shadow-card border border-sky-200">
                <span>💡</span> Our Story
              </div>
              <h1
                className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
              >
                {pageTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                {heroSubtitle}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 shadow-xl text-lg"
              >
                See Our Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="relative animate-slide-up">
              {heroImage?.imgix_url ? (
                <img
                  src={`${heroImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt={pageTitle}
                  width={600}
                  height={450}
                  className="rounded-[2rem] shadow-card-xl ring-1 ring-black/5 w-full object-cover"
                />
              ) : (
                <div className="relative bg-white rounded-[2rem] shadow-card-xl p-10 text-center border border-sunshine-100">
                  <div
                    className="absolute inset-0 rounded-[2rem] opacity-30"
                    style={{ background: 'linear-gradient(135deg, #FFF9D6, #FFF2AD)' }}
                  />
                  <div className="relative">
                    <div className="text-8xl mb-6 animate-float inline-block">🤖</div>
                    <h3
                      className="text-2xl font-black text-gray-900 mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Hello, Human! 👋
                    </h3>
                    <p className="text-gray-500 leading-relaxed">We&apos;re The Friendly AI Company — nice to meet you!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content from CMS */}
      {pageContent && (
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose-friendly text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFFBF0 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-semibold text-sunshine-700 mb-5">
              💛 Our Values
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
            >
              What we believe in
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Our values guide everything we create — every toolkit, every template, every word.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { emoji: '😊', title: 'Marketing Should Be Friendly', description: 'No jargon, no gatekeeping, no intimidation. We believe everyone deserves access to great marketing tools.', bg: 'bg-sunshine-50', border: 'border-sunshine-200' },
              { emoji: '🤖', title: 'AI for Good', description: "We use AI to create better, smarter, more accessible marketing resources — not to replace humans, but to help them thrive.", bg: 'bg-sky-50', border: 'border-sky-200' },
              { emoji: '💰', title: 'Affordable Excellence', description: "Premium quality shouldn't come with a premium price tag. Our toolkits are designed to be accessible for every budget.", bg: 'bg-meadow-50', border: 'border-meadow-200' },
              { emoji: '🌟', title: 'Joy in Every Pixel', description: "We design everything to spark joy. If using our tools makes you smile, we've done our job.", bg: 'bg-warm-50', border: 'border-warm-200' },
              { emoji: '🚀', title: 'Action Over Perfection', description: "Done is better than perfect. Our toolkits help you take action and iterate, not overthink.", bg: 'bg-blush-50', border: 'border-blush-200' },
              { emoji: '💪', title: 'Small Business Champions', description: "We're built specifically for small business owners, solopreneurs, and freelancers. You're our people.", bg: 'bg-sky-50', border: 'border-sky-200' },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`${value.bg} border ${value.border} rounded-3xl p-7 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 group`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{value.emoji}</div>
                <h3
                  className="text-lg font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FFD233 0%, #FFAA00 40%, #FF9533 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6 animate-float inline-block">🤝</div>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-5 leading-[1.05]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
          >
            Let&apos;s grow your business together
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 mb-10 max-w-2xl mx-auto font-medium">
            Whether you&apos;re just starting out or looking to level up, we&apos;ve got a toolkit for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg shadow-xl hover:-translate-y-0.5"
            >
              Browse Toolkits 🛍️
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/40 backdrop-blur-sm text-gray-900 font-bold rounded-2xl hover:bg-white/60 transition-all duration-300 text-lg border border-white/50 hover:-translate-y-0.5"
            >
              Say Hello 👋
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
