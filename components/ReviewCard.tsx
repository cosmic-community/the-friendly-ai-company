import { getMetafieldValue } from '@/lib/cosmic';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

const avatarGradients = [
  'linear-gradient(135deg, #FFD233 0%, #FF9533 100%)',
  'linear-gradient(135deg, #3399FF 0%, #8B5CF6 100%)',
  'linear-gradient(135deg, #33CC5C 0%, #3399FF 100%)',
  'linear-gradient(135deg, #FF3385 0%, #FF9533 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #FF3385 100%)',
];

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Happy Customer';
  const reviewText = getMetafieldValue(review.metadata?.review_text);
  const rating = review.metadata?.rating ?? 5;
  const verifiedPurchase = review.metadata?.verified_purchase;
  const gradientIndex = reviewerName.charCodeAt(0) % avatarGradients.length;

  return (
    <div className="relative group bg-white rounded-3xl p-6 sm:p-7 flex flex-col h-full shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100/80">
      {/* Quote mark decoration */}
      <div
        className="absolute top-4 right-5 text-6xl leading-none font-serif text-sunshine-200 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${ i < rating ? 'fill-sunshine-400' : 'fill-gray-200' }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px] flex-1 mb-5 relative z-10">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}

      {/* Reviewer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0"
            style={{ background: avatarGradients[gradientIndex] }}
          >
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-none mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {reviewerName}
            </p>
            {verifiedPurchase && (
              <p className="text-[11px] text-meadow-600 font-semibold flex items-center gap-1">
                <svg className="w-3 h-3 fill-meadow-500" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Purchase
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
