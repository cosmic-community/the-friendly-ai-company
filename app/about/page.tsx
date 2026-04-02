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
      <section className="gradient-hero py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sm font-medium text-sky-700 mb-6">
                <span>💡</span> Our Story
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {pageTitle}
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                {heroSubtitle}
              </p>
              <Link href="/shop" className="btn-primary text-lg px-8 py-4">
                See Our Products 🛍️
              </Link>
            </div>
            <div className="relative">
              {heroImage?.imgix_url ? (
                <img
                  src={`${heroImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt={pageTitle}
                  width={600}
                  height={450}
                  className="rounded-3xl shadow-card"
                />
              ) : (
                <div className="bg-white rounded-3xl shadow-friendly-lg p-10 text-center">
                  <div className="text-8xl mb-6 animate-float">🤖</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Hello, Human! 👋</h3>
                  <p className="text-gray-500">
                    We&apos;re The Friendly AI Company — nice to meet you!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content from CMS */}
      {pageContent && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose-friendly text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-sunshine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We Believe 💛
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Our values guide everything we create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: '😊',
                title: 'Marketing Should Be Friendly',
                description: 'No jargon, no gatekeeping, no intimidation. We believe everyone deserves access to great marketing tools.',
              },
              {
                emoji: '🤖',
                title: 'AI for Good',
                description: "We use AI to create better, smarter, more accessible marketing resources — not to replace humans, but to help them thrive.",
              },
              {
                emoji: '💰',
                title: 'Affordable Excellence',
                description: "Premium quality shouldn't come with a premium price tag. Our toolkits are designed to be accessible for every budget.",
              },
              {
                emoji: '🌟',
                title: 'Joy in Every Pixel',
                description: 'We design everything to spark joy. If using our tools makes you smile, we\'ve done our job.',
              },
              {
                emoji: '🚀',
                title: 'Action Over Perfection',
                description: "Done is better than perfect. Our toolkits help you take action and iterate, not overthink.",
              },
              {
                emoji: '💪',
                title: 'Small Business Champions',
                description: "We're built specifically for small business owners, solopreneurs, and freelancers. You're our people.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:animate-wiggle">{value.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-sunshine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6 animate-float">🤝</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let&apos;s grow your business together
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re just starting out or looking to level up, we&apos;ve got a toolkit for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg"
            >
              Browse Toolkits 🛍️
            </Link>
            <Link href="/contact" className="btn-outline text-lg px-8 py-4 border-gray-900">
              Say Hello 👋
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}