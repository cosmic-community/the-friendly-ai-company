import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

// Deterministic reading-time estimate from excerpt length
function estimateReadTime(text?: string): number {
  if (!text) return 3;
  const words = text.trim().split(/\s+/).length;
  // Assume ~250 wpm; blog posts are typically longer than excerpt alone
  return Math.max(2, Math.round((words * 8) / 250));
}

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  'AI Tips': { bg: 'bg-sunshine-100', text: 'text-sunshine-700', dot: 'bg-sunshine-400' },
  'Marketing': { bg: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-400' },
  'Productivity': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  'Case Study': { bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-400' },
  'Tutorial': { bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-400' },
  'News': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
};

const defaultCategoryStyle = { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };

export default function BlogCard({ post }: BlogCardProps) {
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const category = getMetafieldValue(post.metadata?.category) as string | undefined;
  const authorName = getMetafieldValue(post.metadata?.author_name);
  const featuredImage = post.metadata?.featured_image;
  const readMinutes = estimateReadTime(excerpt as string | undefined);
  const catStyle = (category && categoryColors[category]) ? categoryColors[category] : defaultCategoryStyle;

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
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100/80"
    >
      {/* Image container */}
      <div className="relative overflow-hidden">
        {featuredImage?.imgix_url ? (
          <>
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={224}
              className="w-full h-52 object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
            />
            {/* Image overlay gradient — adds depth and makes badge pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div
            className="w-full h-52 flex flex-col items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #DCEEFF 50%, #D6FFE3 100%)' }}
          >
            <span className="text-5xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              📝
            </span>
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Read Article
            </span>
          </div>
        )}

        {/* Category badge — elevated on image */}
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 ${catStyle.bg} ${catStyle.text} text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-white/40`}>
              <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot} flex-shrink-0`} />
              {category}
            </span>
          </div>
        )}

        {/* Read time pill — top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-full">
            <svg className="w-3 h-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readMinutes} min
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3
          className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-sunshine-600 transition-colors duration-200 mb-2.5 line-clamp-2 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {post.title}
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
            {excerpt as string}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4">
          {/* Gradient divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {authorName && (
                <>
                  {/* Author avatar initial */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sunshine-300 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-black text-white leading-none">
                      {String(authorName).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{authorName as string}</span>
                </>
              )}
              {authorName && createdDate && (
                <span className="text-gray-300 text-xs">·</span>
              )}
              {createdDate && (
                <span className="text-xs text-gray-400">{createdDate}</span>
              )}
            </div>

            {/* CTA arrow — animates on hover */}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sunshine-50 ring-1 ring-sunshine-200 group-hover:bg-sunshine-400 group-hover:ring-sunshine-400 transition-all duration-300">
              <svg
                className="w-3.5 h-3.5 text-sunshine-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
