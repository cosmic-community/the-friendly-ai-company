import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const category = getMetafieldValue(post.metadata?.category);
  const authorName = getMetafieldValue(post.metadata?.author_name);
  const featuredImage = post.metadata?.featured_image;
  const createdDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 border border-gray-100/80"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DCEEFF 0%, #F0F7FF 50%, #D6FFE3 100%)' }}>
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📝</span>
          </div>
        )}

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center bg-white/95 backdrop-blur-sm text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3
          className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-200 mb-2 line-clamp-2 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {post.title}
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {authorName && (
              <span className="font-medium text-gray-600">{authorName}</span>
            )}
            {authorName && createdDate && <span className="text-gray-300">·</span>}
            {createdDate && <span>{createdDate}</span>}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 group-hover:gap-2 transition-all duration-200">
            Read
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
