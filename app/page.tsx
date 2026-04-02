import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import TrustSignals from '@/components/TrustSignals';
import ReviewCard from '@/components/ReviewCard';
import BlogCard from '@/components/BlogCard';
import { getHomepage, getProducts, getReviews, getBlogPosts, getMetafieldValue } from '@/lib/cosmic';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const [homepage, allProducts, reviews, blogPosts] = await Promise.all([
    getHomepage(),
    getProducts(),
    getReviews(),
    getBlogPosts(),
  ]);

  // Get featured products from homepage or fallback to first 3 products
  const featuredProducts =
    homepage?.metadata?.featured_products && Array.isArray(homepage.metadata.featured_products)
      ? homepage.metadata.featured_products
      : allProducts.slice(0, 3);

  const topReviews = reviews.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  const aboutTitle = homepage?.metadata?.about_section_title
    ? getMetafieldValue(homepage.metadata.about_section_title)
    : "We're a little different 🤖";
  const aboutContent = homepage?.metadata?.about_section_content
    ? getMetafieldValue(homepage.metadata.about_section_content)
    : "The Friendly AI Company is built and run by artificial intelligence — but everything we make is designed with real humans in mind. We believe marketing shouldn't be scary, expensive, or overwhelming. It should be friendly, accessible, and joyful. That's why we create beautiful, easy-to-use toolkits that help you grow your business without the headache.";

  return (
    <div>
      {/* Hero */}
      <HeroSection homepage={homepage} />

      {/* Trust Signals */}
      <TrustSignals homepage={homepage} />

      {/* Featured Products */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-sunshine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Toolkits 🛍️
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Grab one of our best-selling marketing kits and start growing your business today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-outline text-lg px-8 py-4">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sm font-medium text-sky-700 mb-6">
                <span>💡</span> Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {aboutTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {aboutContent}
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us 💛
              </Link>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-meadow-50 rounded-3xl p-8 sm:p-12 text-center">
              <div className="text-7xl mb-6 animate-float">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Built by AI</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use artificial intelligence to create marketing toolkits that are smarter, more effective, and way more fun than the boring stuff out there.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs font-semibold text-gray-700">Social</div>
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-2xl mb-1">📧</div>
                  <div className="text-xs font-semibold text-gray-700">Email</div>
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs font-semibold text-gray-700">Strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {topReviews.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-sunshine-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say ⭐
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Don&apos;t take our word for it — hear from real business owners who&apos;ve used our toolkits.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {topReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Preview */}
      {recentPosts.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Marketing Tips & Tricks 📝
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Free advice to help you market smarter, not harder.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/blog" className="btn-outline text-lg px-8 py-4">
                Read the Blog →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-sunshine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6 animate-float">🚀</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to make marketing friendly?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of small business owners who&apos;ve already leveled up their marketing game with our toolkits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg"
            >
              Shop Now 🛍️
            </Link>
            <Link href="/contact" className="btn-outline text-lg px-8 py-4 border-gray-900">
              Get in Touch 💌
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}