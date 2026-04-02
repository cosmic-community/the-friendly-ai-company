import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description);
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const image = product.metadata?.image;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;
  const categoryEmoji = category?.metadata?.emoji_icon
    ? getMetafieldValue(category.metadata.emoji_icon)
    : '📦';
  const isOutOfStock = inventoryStatus?.toLowerCase() === 'out of stock';
  const savingsAmount = compareAtPrice && price && compareAtPrice > price ? compareAtPrice - price : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
        featured
          ? 'shadow-card-hover ring-2 ring-sunshine-400/60 ring-offset-2'
          : 'shadow-card hover:shadow-card-hover'
      }`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-48 sm:h-52 object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-48 sm:h-52 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #FFE985 50%, #FFD233 100%)' }}>
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{categoryEmoji}</span>
          </div>
        )}

        {/* Badges layer */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 bg-sunshine-400 text-gray-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                ⭐ Featured
              </span>
            )}
            {savingsAmount && (
              <span className="inline-flex items-center gap-1 bg-blush-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                Save ${savingsAmount}
              </span>
            )}
          </div>
          {isOutOfStock && (
            <span className="inline-flex items-center bg-gray-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover shine overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Category */}
        {category && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-sm">{categoryEmoji}</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-sunshine-700 transition-colors duration-200 mb-2 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
            {description}
          </p>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            {price !== undefined && price !== null ? (
              <>
                <span className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ${price}
                </span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-sm text-gray-400 line-through">${compareAtPrice}</span>
                )}
              </>
            ) : (
              <span className="text-lg font-bold text-meadow-600">Free</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-sunshine-700 group-hover:gap-2 transition-all duration-200">
            View
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
