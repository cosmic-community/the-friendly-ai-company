// app/shop/[slug]/page.tsx
import { getProductBySlug, getProducts, getReviewsForProduct, getMetafieldValue } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
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
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description) || '';
  return {
    title: `${name} — The Friendly AI Company`,
    description: description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [reviews, allProducts] = await Promise.all([
    getReviewsForProduct(product.id),
    getProducts(),
  ]);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description);
  const whatsIncluded = getMetafieldValue(product.metadata?.whats_included);
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const image = product.metadata?.image;
  const category = product.metadata?.category;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const categoryEmoji = category?.metadata?.emoji_icon
    ? getMetafieldValue(category.metadata.emoji_icon)
    : '📦';

  const isInStock = !inventoryStatus || inventoryStatus.toLowerCase() !== 'out of stock';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-sunshine-50 border-b border-sunshine-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="relative">
              {image?.imgix_url ? (
                <img
                  src={`${image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt={name}
                  width={600}
                  height={450}
                  className="w-full rounded-3xl shadow-card"
                />
              ) : (
                <div className="w-full aspect-[4/3] gradient-sunshine rounded-3xl flex items-center justify-center shadow-card">
                  <span className="text-8xl">{categoryEmoji}</span>
                </div>
              )}

              {!isInStock && (
                <div className="absolute top-4 right-4 bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Sold Out
                </div>
              )}

              {compareAtPrice && price && compareAtPrice > price && (
                <div className="absolute top-4 left-4 bg-blush-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Save ${compareAtPrice - price}!
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Category */}
              {category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-50 rounded-full text-sm font-medium text-sunshine-700 mb-4">
                  <span>{categoryEmoji}</span>
                  {getMetafieldValue(category.metadata?.name) || category.title}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                {price !== undefined && price !== null ? (
                  <>
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    {compareAtPrice && compareAtPrice > price && (
                      <span className="text-xl text-gray-400 line-through">${compareAtPrice}</span>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold text-meadow-600">Free</span>
                )}
              </div>

              {/* Description */}
              {description && (
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{description}</p>
              )}

              {/* Buy Button */}
              <div className="mb-8">
                {isInStock ? (
                  <button className="btn-primary w-full sm:w-auto text-lg px-10 py-4">
                    Buy Now — ${price ?? 0} 🛍️
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full sm:w-auto text-lg px-10 py-4 bg-gray-200 text-gray-500 font-semibold rounded-2xl cursor-not-allowed"
                  >
                    Sold Out 😔
                  </button>
                )}
                <p className="text-sm text-gray-400 mt-3">
                  ⚡ Instant digital download after purchase
                </p>
              </div>

              {/* What's Included */}
              {whatsIncluded && (
                <div className="bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📋</span> What&apos;s Included
                  </h3>
                  <div
                    className="prose-friendly text-sm space-y-2"
                    dangerouslySetInnerHTML={{ __html: whatsIncluded }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-12 sm:py-16 bg-sunshine-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Customer Reviews ⭐
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like 💛
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}