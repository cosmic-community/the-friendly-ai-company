import { getProducts, getProductCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop — The Friendly AI Company',
  description: 'Browse our collection of friendly marketing toolkits and templates for small businesses.',
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFBF0 0%, #FFF5D6 50%, #F5F0FF 100%)' }}>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #FFE066 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom left, #B8DDFF 0%, transparent 60%)', filter: 'blur(50px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-sunshine-700 mb-6 shadow-card border border-sunshine-200">
            <span>🛍️</span> Marketing Toolkits
          </div>
          <h1
            className="text-5xl sm:text-6xl font-black text-gray-900 mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
          >
            Tools that make you
            <span className="relative inline-block ml-3">
              <span className="relative z-10">shine</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 -z-10 rounded-sm" style={{ background: 'linear-gradient(135deg, #FFD233 0%, #FFE066 100%)', opacity: 0.6 }} />
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            Grab the perfect toolkit for your business. Each one is packed with templates, guides, and strategies you can use right away.
          </p>

          {/* Category Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2.5 mt-4">
              {categories.map((cat) => {
                const emoji = cat.metadata?.emoji_icon ? String(cat.metadata.emoji_icon) : '📦';
                const name = cat.metadata?.name ? String(cat.metadata.name) : cat.title;
                return (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200 shadow-card hover:border-sunshine-300 hover:bg-sunshine-50 cursor-pointer transition-all duration-200 hover:-translate-y-px"
                  >
                    <span>{emoji}</span>
                    {name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14 sm:py-20" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFFBF0 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-6 animate-float">🏗️</div>
              <h3
                className="text-3xl font-black text-gray-900 mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Products Coming Soon!
              </h3>
              <p className="text-gray-500 text-lg">We&apos;re putting the finishing touches on our toolkits. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #DCEEFF 0%, #F0F7FF 50%, #D6FFE3 100%)' }} />
        <div className="absolute top-0 right-0 w-80 h-80 opacity-60 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #85C7FF 0%, transparent 60%)', filter: 'blur(50px)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-5xl mb-5 animate-float">📦</div>
          <h2
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            Want everything?
            <br />
            <span className="text-sky-600">Grab The Complete Bundle!</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Get all 5 toolkits for one unbeatable price. Save over 40% compared to buying individually.
          </p>
          <div className="inline-flex items-center gap-4 mb-8 bg-white rounded-3xl px-8 py-5 shadow-card border border-gray-100">
            <span
              className="text-5xl font-black text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >$79</span>
            <div>
              <span className="text-xl text-gray-400 line-through block">$130</span>
              <span className="inline-flex items-center bg-meadow-100 text-meadow-700 text-sm font-bold px-3 py-1 rounded-full">Save $51!</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
