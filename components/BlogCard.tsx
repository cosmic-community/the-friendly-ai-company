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
    <Link href={`/blog/${post.slug}`} className="card-friendly group flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 gradient-sky flex items-center justify-center">
            <span className="text-5xl">📝</span>
          </div>
        )}

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {authorName && <span>{authorName}</span>}
            {authorName && createdDate && <span>·</span>}
            {createdDate && <span>{createdDate}</span>}
          </div>
          <span className="text-sm font-medium text-sky-600 group-hover:text-sky-500">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}