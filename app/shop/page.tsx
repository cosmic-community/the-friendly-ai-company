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
      <section className="gradient-hero py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-medium text-sunshine-700 mb-4">
            <span>🛍️</span> Our Toolkits
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Marketing Toolkits
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Grab the perfect toolkit for your business. Each one is packed with templates, guides, and strategies you can use right away.
          </p>

          {/* Category Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => {
                const emoji = cat.metadata?.emoji_icon ? String(cat.metadata.emoji_icon) : '📦';
                const name = cat.metadata?.name ? String(cat.metadata.name) : cat.title;
                return (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200 shadow-sm"
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-sunshine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Products Coming Soon!</h3>
              <p className="text-gray-500">
                We&apos;re putting the finishing touches on our toolkits. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-sky-50 to-meadow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want everything? Grab The Complete Bundle!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Get all 5 toolkits for one unbeatable price. Save over 40% compared to buying individually.
          </p>
          <div className="inline-flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">$79</span>
            <span className="text-xl text-gray-400 line-through">$130</span>
            <span className="bg-meadow-100 text-meadow-700 text-sm font-bold px-3 py-1 rounded-full">
              Save $51!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}