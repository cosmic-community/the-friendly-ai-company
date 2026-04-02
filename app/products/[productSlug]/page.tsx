import Link from 'next/link';
import { getProductBySlug, getProductContent, getMetafieldValue } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return { title: 'Product Not Found' };
  const name = getMetafieldValue(product.metadata?.name) || product.title;
  return {
    title: `${name} — Members Area | The Friendly AI Company`,
    description: `Access all learning modules for ${name}.`,
  };
}

export default async function ProductContentPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const [product, modules] = await Promise.all([
    getProductBySlug(productSlug),
    getProductContent(productSlug),
  ]);

  if (!product) notFound();

  const name = getMetafieldValue(product.metadata?.name) || product.title;
  const description = getMetafieldValue(product.metadata?.description);
  const image = product.metadata?.image;
  const category = product.metadata?.category;
  const categoryEmoji = category?.metadata?.emoji_icon
    ? getMetafieldValue(category.metadata.emoji_icon)
    : '📦';
  const totalModules = modules.length;

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <div className="bg-[#FFFBF0] border-b border-sunshine-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="hover:text-gray-700 transition-colors">
              My Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product Header ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #FFFBF0 0%, #FFF5D6 50%, #F0FFF4 100%)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-64 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, #FFE066 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              {image?.imgix_url ? (
                <img
                  src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                  alt={name}
                  width={200}
                  height={150}
                  className="w-40 h-32 sm:w-48 sm:h-36 object-cover rounded-3xl shadow-card-xl ring-1 ring-black/5"
                />
              ) : (
                <div
                  className="w-40 h-32 sm:w-48 sm:h-36 flex items-center justify-center rounded-3xl shadow-card-xl"
                  style={{
                    background:
                      'linear-gradient(140deg, #FFFBEA 0%, #FFF3B0 35%, #FFE566 65%, #FFD233 100%)',
                  }}
                >
                  <span className="text-6xl">{categoryEmoji}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {category && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-xs font-bold text-sunshine-700 mb-4 shadow-card border border-sunshine-200">
                  <span>{categoryEmoji}</span>
                  {getMetafieldValue(category.metadata?.name) || category.title}
                </div>
              )}

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 leading-[1.08]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '-0.025em',
                }}
              >
                {name}
              </h1>

              {description && (
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-5 max-w-2xl">
                  {description}
                </p>
              )}

              {/* Progress bar */}
              {totalModules > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {totalModules} module{totalModules !== 1 ? 's' : ''} total
                      </span>
                    </div>
                    <div className="h-2 bg-white rounded-full shadow-inner-top overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: '0%',
                          background: 'linear-gradient(90deg, #FFD233 0%, #85FFAB 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {modules[0] && (
                    <Link
                      href={`/products/${productSlug}/${modules[0].slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm text-gray-900 rounded-xl shadow-friendly hover:shadow-friendly-lg transition-all duration-300 hover:-translate-y-px flex-shrink-0"
                      style={{
                        background:
                          'linear-gradient(145deg, #FFE566 0%, #FFD233 50%, #F5C400 100%)',
                      }}
                    >
                      Start Module 1
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
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Modules List ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              className="text-2xl sm:text-3xl font-black text-gray-900 mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Course Modules
            </h2>
            <p className="text-gray-500">
              Work through each module in order for the best experience.
            </p>
          </div>

          {modules.length > 0 ? (
            <div className="space-y-4">
              {modules.map((module, index) => {
                const moduleTitle =
                  getMetafieldValue(module.metadata?.module_title) || module.title;
                const summary = getMetafieldValue(module.metadata?.summary);
                const estimatedTime = module.metadata?.estimated_time as number | undefined;
                const moduleNum = (module.metadata?.module_number as number) ?? index + 1;

                return (
                  <Link
                    key={module.id}
                    href={`/products/${productSlug}/${module.slug}`}
                    className="group flex items-start gap-5 p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 hover:border-sunshine-300 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Module number badge */}
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-gray-900 text-sm shadow-friendly group-hover:shadow-friendly-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 100%)',
                      }}
                    >
                      {moduleNum}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="text-base font-bold text-gray-900 group-hover:text-gray-800 leading-snug"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {moduleTitle}
                        </h3>
                        {estimatedTime !== undefined && estimatedTime > 0 && (
                          <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {estimatedTime} min
                          </span>
                        )}
                      </div>

                      {summary && (
                        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {summary}
                        </p>
                      )}

                      {/* Progress indicator placeholder */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">
                          Module {moduleNum} of {totalModules}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          Start
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
              <div className="text-5xl mb-4">🏗️</div>
              <h3
                className="text-xl font-bold text-gray-700 mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Modules coming soon!
              </h3>
              <p className="text-gray-400 text-sm">
                We&apos;re building out the content for this toolkit. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
