import Link from 'next/link';
import { getBlogPosts } from '@/lib/cosmic';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Marketing Tips & Advice | The Friendly AI Company',
  description: 'Free marketing tips, advice, and strategies for small business owners, solopreneurs, and freelancers.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #F0F7FF 0%, #DCEEFF 50%, #F0FFF4 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-64 opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #85C7FF 0%, transparent 60%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-sky-700 mb-6 shadow-card border border-sky-200">
            <span>📝</span> Our Blog
          </div>
          <h1
            className="text-5xl sm:text-6xl font-black text-gray-900 mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
          >
            Marketing tips &amp; tricks
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Free advice to help you market your business smarter, not harder. No jargon, no fluff — just friendly, actionable tips.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-6 animate-float">✍️</div>
              <h3
                className="text-3xl font-black text-gray-900 mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Blog Posts Coming Soon!
              </h3>
              <p className="text-gray-500 text-lg">We&apos;re working on some amazing content. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FFD233 0%, #FFAA00 40%, #FF9533 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-5 animate-float inline-block">🚀</div>
          <h2
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            Want to put these tips into action?
          </h2>
          <p className="text-lg text-gray-800 mb-8 font-medium">
            Our marketing toolkits give you everything you need to execute these strategies.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg shadow-xl hover:-translate-y-0.5"
          >
            Browse Toolkits
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
