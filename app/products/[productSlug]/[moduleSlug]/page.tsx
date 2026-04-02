import Link from 'next/link';
import {
  getProductBySlug,
  getProductContent,
  getProductContentBySlug,
  getMetafieldValue,
} from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string; moduleSlug: string }>;
}): Promise<Metadata> {
  const { moduleSlug } = await params;
  const module = await getProductContentBySlug(moduleSlug);
  if (!module) return { title: 'Module Not Found' };
  const title = getMetafieldValue(module.metadata?.module_title) || module.title;
  return {
    title: `${title} — Members Area | The Friendly AI Company`,
    description: getMetafieldValue(module.metadata?.summary).slice(0, 160),
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ productSlug: string; moduleSlug: string }>;
}) {
  const { productSlug, moduleSlug } = await params;

  const [product, modules, currentModule] = await Promise.all([
    getProductBySlug(productSlug),
    getProductContent(productSlug),
    getProductContentBySlug(moduleSlug),
  ]);

  if (!product || !currentModule) notFound();

  const productName = getMetafieldValue(product.metadata?.name) || product.title;
  const moduleTitle = getMetafieldValue(currentModule.metadata?.module_title) || currentModule.title;
  const summary = getMetafieldValue(currentModule.metadata?.summary);
  const content = getMetafieldValue(currentModule.metadata?.content);
  const estimatedTime = currentModule.metadata?.estimated_time as number | undefined;
  const moduleNum = currentModule.metadata?.module_number as number | undefined;
  const totalModules = modules.length;

  // Find prev/next modules
  const currentIndex = modules.findIndex((m) => m.slug === moduleSlug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top Bar: breadcrumb + module progress ── */}
      <div className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 min-w-0 overflow-hidden">
              <Link href="/products" className="hover:text-gray-600 transition-colors flex-shrink-0">
                My Products
              </Link>
              <span className="text-gray-200 flex-shrink-0">/</span>
              <Link
                href={`/products/${productSlug}`}
                className="hover:text-gray-600 transition-colors truncate"
              >
                {productName}
              </Link>
              <span className="text-gray-200 flex-shrink-0">/</span>
              <span className="text-gray-700 font-medium truncate">{moduleTitle}</span>
            </nav>

            {/* Module counter pill */}
            <div className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
              <span className="text-sunshine-600">●</span>
              {moduleNum ?? currentIndex + 1} / {totalModules}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex gap-8 lg:gap-12">

          {/* ── Sidebar: module list ── */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-[120px]">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <Link
                    href={`/products/${productSlug}`}
                    className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {productName}
                  </Link>
                </div>

                <nav className="py-2" aria-label="Module navigation">
                  {modules.map((m, idx) => {
                    const mTitle = getMetafieldValue(m.metadata?.module_title) || m.title;
                    const mNum = (m.metadata?.module_number as number) ?? idx + 1;
                    const isActive = m.slug === moduleSlug;

                    return (
                      <Link
                        key={m.id}
                        href={`/products/${productSlug}/${m.slug}`}
                        className={`flex items-center gap-3 px-5 py-3 text-sm transition-all duration-150 ${
                          isActive
                            ? 'bg-sunshine-50 border-r-2 border-sunshine-400 text-gray-900 font-semibold'
                            : 'text-gray-500 hover:text-gray-800 hover:bg-white'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black transition-all duration-150 ${
                            isActive
                              ? 'bg-sunshine-400 text-gray-900 shadow-sm'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {mNum}
                        </span>
                        <span className="leading-snug line-clamp-2">{mTitle}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            {/* Module header */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {moduleNum !== undefined && (
                  <span
                    className="inline-flex items-center text-xs font-black text-gray-900 px-3 py-1.5 rounded-xl"
                    style={{
                      background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 100%)',
                    }}
                  >
                    Module {moduleNum}
                  </span>
                )}
                {estimatedTime !== undefined && estimatedTime > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl">
                    <svg
                      className="w-3.5 h-3.5"
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
                    {estimatedTime} min read
                  </span>
                )}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-[1.08]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '-0.025em',
                }}
              >
                {moduleTitle}
              </h1>

              {summary && (
                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">{summary}</p>
              )}
            </div>

            {/* ── Markdown content ── */}
            {content ? (
              <div
                className="
                  prose prose-lg max-w-none
                  prose-headings:font-black prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-sunshine-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:text-gray-600 prose-ol:text-gray-600
                  prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-sunshine-400
                  prose-blockquote:bg-sunshine-50 prose-blockquote:rounded-r-xl
                  prose-blockquote:not-italic prose-blockquote:text-gray-700
                  prose-code:text-blush-600 prose-code:bg-blush-50
                  prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                  prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:shadow-xl
                  prose-img:rounded-2xl prose-img:shadow-card
                  prose-hr:border-gray-100
                "
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-center py-16 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
                <div className="text-5xl mb-4">✍️</div>
                <p className="text-gray-400 font-medium">Content for this module is coming soon!</p>
              </div>
            )}

            {/* ── Prev / Next navigation ── */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous */}
                {prevModule ? (
                  <Link
                    href={`/products/${productSlug}/${prevModule.slug}`}
                    className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-sunshine-300 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-sunshine-100 transition-colors duration-200">
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-sunshine-600 transition-colors duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                        Previous
                      </div>
                      <div
                        className="text-sm font-bold text-gray-800 leading-snug line-clamp-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {getMetafieldValue(prevModule.metadata?.module_title) || prevModule.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next */}
                {nextModule ? (
                  <Link
                    href={`/products/${productSlug}/${nextModule.slug}`}
                    className="group flex items-center justify-end gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-sunshine-300 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 sm:text-right"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                        Next
                      </div>
                      <div
                        className="text-sm font-bold text-gray-800 leading-snug line-clamp-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {getMetafieldValue(nextModule.metadata?.module_title) || nextModule.title}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-friendly group-hover:shadow-friendly-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 100%)',
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/products/${productSlug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 font-bold text-sm text-gray-900 rounded-2xl shadow-friendly hover:shadow-friendly-lg transition-all duration-300 hover:-translate-y-px"
                      style={{
                        background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 100%)',
                      }}
                    >
                      🎉 All done! Back to overview
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* ── Mobile: module list accordion ── */}
            <div className="lg:hidden mt-10 pt-8 border-t border-gray-100">
              <h3
                className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
              >
                All Modules
              </h3>
              <div className="space-y-2">
                {modules.map((m, idx) => {
                  const mTitle = getMetafieldValue(m.metadata?.module_title) || m.title;
                  const mNum = (m.metadata?.module_number as number) ?? idx + 1;
                  const isActive = m.slug === moduleSlug;

                  return (
                    <Link
                      key={m.id}
                      href={`/products/${productSlug}/${m.slug}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 ${
                        isActive
                          ? 'bg-sunshine-50 border border-sunshine-300 text-gray-900 font-semibold'
                          : 'bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-white border border-transparent'
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black ${
                          isActive ? 'bg-sunshine-400 text-gray-900' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {mNum}
                      </span>
                      <span className="line-clamp-1">{mTitle}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
