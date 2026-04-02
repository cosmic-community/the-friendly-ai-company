import Link from 'next/link';
import { getProducts, getProductContent, getMetafieldValue } from '@/lib/cosmic';
import type { Metadata } from 'next';
import type { Product } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'My Products — The Friendly AI Company',
  description: 'Access all your purchased marketing toolkits and learning content.',
};

// Fetch module count for each product in parallel
async function getProductsWithModuleCount(
  products: Product[]
): Promise<{ product: Product; moduleCount: number }[]> {
  const results = await Promise.all(
    products.map(async (product) => {
      const modules = await getProductContent(product.slug);
      return { product, moduleCount: modules.length };
    })
  );
  return results;
}

export default async function ProductsLibraryPage() {
  const products = await getProducts();
  const productsWithCounts = await getProductsWithModuleCount(products);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #FFFBF0 0%, #FFF5D6 40%, #F0FFF4 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-50 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, #FFE066 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at bottom left, #85FFAB 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-meadow-700 mb-5 shadow-card border border-meadow-200">
                <span>🎓</span> Members Area
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '-0.025em',
                }}
              >
                Your Learning
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Library</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-3 -z-10 rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #FFD233 0%, #FFE066 100%)',
                      opacity: 0.55,
                    }}
                  />
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-xl leading-relaxed">
                Everything you&apos;ve unlocked, all in one place. Dive into a toolkit to start
                learning.
              </p>
            </div>

            {/* Stats chip */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-card border border-gray-100">
                <div className="text-center">
                  <div
                    className="text-3xl font-black text-gray-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {products.length}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-0.5">
                    Toolkit{products.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div className="text-center">
                  <div
                    className="text-3xl font-black text-gray-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {productsWithCounts.reduce((sum, p) => sum + p.moduleCount, 0)}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-0.5">
                    Modules
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Cards Grid ── */}
      <section
        className="py-14 sm:py-20"
        style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFFBF0 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productsWithCounts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {productsWithCounts.map(({ product, moduleCount }) => {
                const name = getMetafieldValue(product.metadata?.name) || product.title;
                const description = getMetafieldValue(product.metadata?.description);
                const image = product.metadata?.image;
                const category = product.metadata?.category;
                const categoryEmoji = category?.metadata?.emoji_icon
                  ? getMetafieldValue(category.metadata.emoji_icon)
                  : '📦';

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col h-full bg-white rounded-[22px] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ring-1 ring-black/[0.04]"
                  >
                    {/* Product image / fallback */}
                    <div className="relative overflow-hidden rounded-t-[22px] flex-shrink-0">
                      {image?.imgix_url ? (
                        <img
                          src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                          alt={name}
                          width={400}
                          height={250}
                          className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div
                          className="w-full h-44 flex items-center justify-center"
                          style={{
                            background:
                              'linear-gradient(140deg, #FFFBEA 0%, #FFF3B0 35%, #FFE566 65%, #FFD233 100%)',
                          }}
                        >
                          <span className="text-7xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {categoryEmoji}
                          </span>
                        </div>
                      )}

                      {/* Module count badge */}
                      {moduleCount > 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                            📚 {moduleCount} module{moduleCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      {/* Category */}
                      {category && (
                        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-3">
                          <span>{categoryEmoji}</span>
                          {getMetafieldValue(category.metadata?.name) || category.title}
                        </span>
                      )}

                      <h2
                        className="text-lg font-bold text-gray-900 mb-2 leading-snug"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {name}
                      </h2>

                      {description && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5 flex-1">
                          {description}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        {moduleCount > 0 ? (
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-[13.5px] text-gray-900 rounded-xl shadow-friendly hover:shadow-friendly-lg transition-all duration-300 hover:-translate-y-px active:translate-y-0"
                            style={{
                              background:
                                'linear-gradient(145deg, #FFE566 0%, #FFD233 50%, #F5C400 100%)',
                            }}
                          >
                            Start Learning
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-400 font-medium italic">
                            Content coming soon…
                          </span>
                        )}

                        <Link
                          href={`/shop/${product.slug}`}
                          className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors duration-200 underline underline-offset-2"
                        >
                          View in Shop
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-7xl mb-6 animate-float">📚</div>
              <h3
                className="text-3xl font-black text-gray-900 mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                No products yet!
              </h3>
              <p className="text-gray-500 text-lg mb-8">
                Head to the shop to grab your first toolkit.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 rounded-2xl shadow-friendly hover:shadow-friendly-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 50%, #F5C400 100%)',
                }}
              >
                Browse the Shop
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
