import { getProductBySlug, getProducts, getReviewsForProduct, getMetafieldValue } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description) || '';
  return {
    title: `${name} — The Friendly AI Company`,
    description: description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const [reviews, allProducts] = await Promise.all([
    getReviewsForProduct(product.id),
    getProducts(),
  ]);

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description);
  const whatsIncluded = getMetafieldValue(product.metadata?.whats_included);
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const image = product.metadata?.image;
  const category = product.metadata?.category;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const categoryEmoji = category?.metadata?.emoji_icon ? getMetafieldValue(category.metadata.emoji_icon) : '📦';
  const isInStock = !inventoryStatus || inventoryStatus.toLowerCase() !== 'out of stock';
  const savingsAmount = compareAtPrice && price && compareAtPrice > price ? compareAtPrice - price : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#FFFBF0] border-b border-sunshine-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-card-xl ring-1 ring-black/5">
                {image?.imgix_url ? (
                  <img
                    src={`${image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                    alt={name}
                    width={600}
                    height={450}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #FFE985 50%, #FFD233 100%)' }}>
                    <span className="text-8xl">{categoryEmoji}</span>
                  </div>
                )}

                {/* Status/savings badges */}
                {!isInStock && (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    Sold Out
                  </div>
                )}
                {savingsAmount && (
                  <div className="absolute top-4 left-4 bg-blush-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    Save ${savingsAmount}!
                  </div>
                )}
              </div>

              {/* Guarantee strip */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 py-4 px-5 bg-meadow-50 rounded-2xl border border-meadow-100">
                {[
                  { icon: '⚡', text: 'Instant Download' },
                  { icon: '🛡️', text: '30-Day Guarantee' },
                  { icon: '🔄', text: 'Free Updates' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Category badge */}
              {category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-semibold text-sunshine-700 mb-5">
                  <span>{categoryEmoji}</span>
                  {getMetafieldValue(category.metadata?.name) || category.title}
                </div>
              )}

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-[1.05]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
              >
                {name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                {price !== undefined && price !== null ? (
                  <>
                    <span
                      className="text-5xl font-black text-gray-900"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      ${price}
                    </span>
                    {compareAtPrice && compareAtPrice > price && (
                      <>
                        <span className="text-xl text-gray-400 line-through">${compareAtPrice}</span>
                        <span className="text-sm font-bold text-meadow-600 bg-meadow-100 px-2.5 py-1 rounded-full">
                          {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% off
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-4xl font-black text-meadow-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Free</span>
                )}
              </div>

              {/* Description */}
              {description && (
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{description}</p>
              )}

              {/* Buy Button */}
              <div className="mb-8">
                {isInStock ? (
                  <button
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-sunshine-500 text-gray-900 font-black rounded-2xl hover:bg-sunshine-400 transition-all duration-300 text-lg shadow-friendly hover:shadow-friendly-lg hover:-translate-y-0.5 active:translate-y-0"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Buy Now — ${price ?? 0}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full sm:w-auto text-lg px-10 py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed border border-gray-200"
                  >
                    Sold Out 😔
                  </button>
                )}
                <p className="text-sm text-gray-400 mt-3 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-meadow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant digital download after purchase
                </p>
              </div>

              {/* What's Included */}
              {whatsIncluded && (
                <div className="bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-100">
                  <h3
                    className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <span className="w-7 h-7 bg-sky-200 rounded-lg flex items-center justify-center text-sm">📋</span>
                    What&apos;s Included
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
        <section className="py-14 sm:py-20" style={{ background: 'linear-gradient(180deg, #FFFBF0 0%, #FFFDF8 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-black text-gray-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
              >
                Customer Reviews ⭐
              </h2>
            </div>
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
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
              >
                You Might Also Like
              </h2>
              <p className="text-gray-500">More toolkits to grow your business 💛</p>
            </div>
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
