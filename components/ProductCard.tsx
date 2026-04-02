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

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`card-friendly group flex flex-col h-full ${featured ? 'ring-2 ring-sunshine-300' : ''}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 gradient-sunshine flex items-center justify-center">
            <span className="text-6xl group-hover:animate-wiggle transition-all">{categoryEmoji}</span>
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-sunshine-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
            ⭐ Featured
          </div>
        )}

        {/* Status badge */}
        {inventoryStatus && inventoryStatus.toLowerCase() === 'out of stock' && (
          <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
            Sold Out
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Category */}
        {category && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">{categoryEmoji}</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sunshine-600 transition-colors mb-2">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            {price !== undefined && price !== null ? (
              <>
                <span className="text-2xl font-bold text-gray-900">${price}</span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-sm text-gray-400 line-through">${compareAtPrice}</span>
                )}
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-500">Free</span>
            )}
          </div>
          <span className="text-sm font-medium text-sunshine-600 group-hover:text-sunshine-500 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}