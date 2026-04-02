// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getBlogPosts, getMetafieldValue } from '@/lib/cosmic';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  return {
    title: `${post.title} — The Friendly AI Company Blog`,
    description: excerpt.slice(0, 160) || post.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const content = getMetafieldValue(post.metadata?.content);
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const category = getMetafieldValue(post.metadata?.category);
  const authorName = getMetafieldValue(post.metadata?.author_name);
  const featuredImage = post.metadata?.featured_image;
  const createdDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-sky-50 border-b border-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-10">
            {category && (
              <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-medium rounded-full mb-4">
                {category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            {excerpt && (
              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto mb-6">
                {excerpt}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              {authorName && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sm font-semibold text-sky-700">
                    {authorName.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700">{authorName}</span>
                </div>
              )}
              {createdDate && <span>{createdDate}</span>}
            </div>
          </header>

          {/* Featured Image */}
          {featuredImage?.imgix_url && (
            <div className="mb-10">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
                alt={post.title}
                width={800}
                height={400}
                className="w-full rounded-3xl shadow-card"
              />
            </div>
          )}

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            {content ? (
              <div
                className="prose-friendly text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : post.content ? (
              <div
                className="prose-friendly text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                Content coming soon! 📝
              </p>
            )}
          </div>

          {/* Share CTA */}
          <div className="max-w-3xl mx-auto mt-12 p-8 bg-sunshine-50 rounded-3xl border border-sunshine-200 text-center">
            <div className="text-4xl mb-3">💛</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoyed this article?</h3>
            <p className="text-gray-600 mb-4">Check out our marketing toolkits to put these tips into action!</p>
            <Link href="/shop" className="btn-primary">
              Browse Toolkits 🛍️
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              More from the Blog 📝
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}