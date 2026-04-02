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
      <section className="gradient-hero py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sm font-medium text-sky-700 mb-4">
            <span>📝</span> Our Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Marketing Tips & Tricks
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Free advice to help you market your business smarter, not harder. No jargon, no fluff — just friendly, actionable tips.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Blog Posts Coming Soon!</h3>
              <p className="text-gray-500">
                We&apos;re working on some amazing content. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 gradient-sunshine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to put these tips into action? 🚀
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Our marketing toolkits give you everything you need to execute these strategies.
          </p>
          <a href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg">
            Browse Toolkits 🛍️
          </a>
        </div>
      </section>
    </div>
  );
}