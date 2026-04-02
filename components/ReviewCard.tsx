import { getMetafieldValue } from '@/lib/cosmic';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

const avatarGradients = [
  { bg: 'from-sunshine-400 to-amber-500', ring: 'ring-sunshine-200' },
  { bg: 'from-sky-400 to-blue-600', ring: 'ring-sky-200' },
  { bg: 'from-emerald-400 to-teal-600', ring: 'ring-emerald-200' },
  { bg: 'from-rose-400 to-pink-600', ring: 'ring-rose-200' },
  { bg: 'from-violet-400 to-purple-600', ring: 'ring-violet-200' },
];

const defaultGrad = { bg: 'from-sunshine-400 to-amber-500', ring: 'ring-sunshine-200' };

// Role/title suggestions for added personality
const reviewerTitles = [
  'Small Business Owner',
  'Freelance Designer',
  'E-commerce Founder',
  'Marketing Consultant',
  'Solopreneur',
];

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Happy Customer';
  const reviewText = getMetafieldValue(review.metadata?.review_text);
  const rating = review.metadata?.rating ?? 5;
  const verifiedPurchase = review.metadata?.verified_purchase;
  const gradientIdx = reviewerName.charCodeAt(0) % avatarGradients.length;
  const titleIdx = reviewerName.charCodeAt(0) % reviewerTitles.length;
  const avatarGrad = avatarGradients[gradientIdx] ?? defaultGrad;

  return (
    <div className="relative group bg-white rounded-3xl p-6 sm:p-7 flex flex-col h-full border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunshine-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Decorative large opening quote — top left */}
      <div
        className="absolute -top-3 -left-1 text-[96px] leading-none font-serif select-none pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #FFD233 0%, #FBBF24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.25,
        }}
        aria-hidden="true"
      >
        &#8220;
      </div>

      {/* Decorative closing quote — bottom right */}
      <div
        className="absolute -bottom-6 -right-1 text-[96px] leading-none font-serif select-none pointer-events-none rotate-180"
        style={{
          background: 'linear-gradient(135deg, #FFD233 0%, #FBBF24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.15,
        }}
        aria-hidden="true"
      >
        &#8220;
      </div>

      {/* Stars with subtle glow */}
      <div className="flex items-center gap-1 mb-4 relative z-10">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 drop-shadow-sm ${ i < rating ? 'fill-sunshine-400' : 'fill-gray-200' }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {/* Numeric rating badge */}
        <span className="ml-1.5 text-[11px] font-bold text-sunshine-600 bg-sunshine-50 ring-1 ring-sunshine-200 px-1.5 py-0.5 rounded-full leading-none">
          {rating}.0
        </span>
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px] flex-1 mb-5 relative z-10 pl-1">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}

      {/* Divider */}
      <div className="relative z-10 mt-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar with gradient + ring */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGrad.bg} ring-2 ${avatarGrad.ring} ring-offset-1 flex items-center justify-center shadow-md`}
              >
                <span className="text-sm font-extrabold text-white drop-shadow-sm">
                  {reviewerName.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Online-style dot for verified */}
              {verifiedPurchase && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
              )}
            </div>

            <div>
              <p className="font-bold text-gray-900 text-sm leading-none mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {reviewerName}
              </p>
              {verifiedPurchase ? (
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3 fill-emerald-500" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Purchase
                </p>
              ) : (
                <p className="text-[11px] text-gray-400 font-medium">
                  {reviewerTitles[titleIdx]}
                </p>
              )}
            </div>
          </div>

          {/* Friendly AI logo mark */}
          <div className="w-7 h-7 rounded-lg bg-sunshine-100 ring-1 ring-sunshine-200 flex items-center justify-center flex-shrink-0" title="The Friendly AI Company">
            <span className="text-sm leading-none select-none">🤖</span>
          </div>
        </div>
      </div>
    </div>
  );
}
