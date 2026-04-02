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

  const savingsAmount =
    compareAtPrice && price != null && compareAtPrice > price
      ? compareAtPrice - price
      : null;
  const savingsPct =
    savingsAmount && compareAtPrice
      ? Math.round((savingsAmount / compareAtPrice) * 100)
      : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group relative flex flex-col h-full rounded-[22px] overflow-hidden transition-all duration-300 ease-out
        hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunshine-400 focus-visible:ring-offset-2
        ${
          featured
            ? 'shadow-[0_4px_24px_rgba(255,210,51,0.2),0_1px_4px_rgba(0,0,0,0.06)] ring-2 ring-sunshine-400/50 ring-offset-2 hover:shadow-[0_12px_40px_rgba(255,210,51,0.3),0_2px_8px_rgba(0,0,0,0.08)]'
            : 'shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]'
        }`}
    >
      {/* Card background — pure white with subtle depth */}
      <div className="absolute inset-0 bg-white rounded-[22px]" />

      {/* Hover gradient border glow */}
      <div
        className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,229,102,0.12) 0%, rgba(255,210,51,0.06) 40%, transparent 70%)',
        }}
      />

      {/* ── Image area ── */}
      <div className="relative overflow-hidden rounded-t-[22px] bg-gray-50 flex-shrink-0">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-48 sm:h-52 object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-48 sm:h-52 flex items-center justify-center"
            style={{
              background:
                'linear-gradient(140deg, #FFFBEA 0%, #FFF3B0 35%, #FFE566 65%, #FFD233 100%)',
            }}
          >
            <span className="text-6xl drop-shadow-sm group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-300 ease-out">
              {categoryEmoji}
            </span>
          </div>
        )}

        {/* ── Badges layer ── */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Left badges */}
          <div className="flex flex-col gap-1.5">
            {featured && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-900 px-2.5 py-[5px] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                style={{
                  background:
                    'linear-gradient(135deg, #FFE566 0%, #FFD233 100%)',
                }}
              >
                ⭐ Featured
              </span>
            )}
            {savingsPct && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-extrabold text-white px-2.5 py-[5px] rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.4)] animate-none"
                style={{
                  background:
                    'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                }}
              >
                −{savingsPct}% OFF
              </span>
            )}
          </div>

          {/* Right: out-of-stock */}
          {isOutOfStock && (
            <span className="inline-flex items-center text-[11px] font-bold text-white/90 bg-gray-900/85 backdrop-blur-sm px-2.5 py-[5px] rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Shine overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 65%)',
          }}
        />

        {/* Bottom image fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative flex flex-col flex-1 p-5 sm:p-6">
        {/* Category pill */}
        {category && (
          <div className="flex items-center gap-1.5 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-500/80 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100"
            >
              <span className="text-[12px] leading-none">{categoryEmoji}</span>
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-[15px] sm:text-base font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200 mb-2 leading-snug tracking-[-0.01em]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[13px] text-gray-500 leading-[1.65] mb-4 flex-1 line-clamp-2">
            {description}
          </p>
        )}

        {/* ── Price row ── */}
        <div className="mt-auto">
          {/* Savings strip — shown when there's a compare price */}
          {savingsAmount && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl mb-3 -mx-1"
              style={{
                background:
                  'linear-gradient(135deg, rgba(254,226,226,0.7) 0%, rgba(254,202,202,0.5) 100%)',
              }}
            >
              <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wide">
                🔥 Save ${savingsAmount.toFixed(2)}
              </span>
              <span className="text-[11px] text-red-400/80">
                ({savingsPct}% discount)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              {price !== undefined && price !== null ? (
                <>
                  <span
                    className="text-2xl font-black text-gray-900 tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    ${price}
                  </span>
                  {compareAtPrice && compareAtPrice > price && (
                    <span className="text-[13px] text-gray-400 line-through font-medium">
                      ${compareAtPrice}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-lg font-bold text-emerald-600">Free</span>
              )}
            </div>

            {/* View CTA chip */}
            <span
              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gray-900 px-3.5 py-1.5 rounded-full shadow-[0_1px_4px_rgba(255,210,51,0.3)] group-hover:shadow-[0_2px_10px_rgba(255,210,51,0.5)] transition-all duration-300"
              style={{
                background:
                  'linear-gradient(145deg, #FFE566 0%, #FFD233 100%)',
              }}
            >
              View
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
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
