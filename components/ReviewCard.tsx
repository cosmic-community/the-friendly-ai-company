import { getMetafieldValue } from '@/lib/cosmic';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Happy Customer';
  const reviewText = getMetafieldValue(review.metadata?.review_text);
  const rating = review.metadata?.rating ?? 5;
  const verifiedPurchase = review.metadata?.verified_purchase;

  return (
    <div className="card-friendly p-6 sm:p-8 flex flex-col h-full">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-lg ${i < rating ? 'text-sunshine-500' : 'text-gray-200'}`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-1 mb-4">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}

      {/* Reviewer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-lg">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{reviewerName}</p>
            {verifiedPurchase && (
              <p className="text-xs text-meadow-600 font-medium">✅ Verified Purchase</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}