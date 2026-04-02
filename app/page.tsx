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

  const featuredProducts =
    homepage?.metadata?.featured_products && Array.isArray(homepage.metadata.featured_products)
      ? homepage.metadata.featured_products
      : allProducts.slice(0, 3);

  const topReviews = reviews.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  const aboutTitle = homepage?.metadata?.about_section_title
    ? getMetafieldValue(homepage.metadata.about_section_title)
    : "We're a little different";
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
      <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFFBF0 50%, #FFFDF8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-semibold text-sunshine-700 mb-5">
              🧰 Popular Toolkits
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
            >
              Marketing kits that actually work
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Grab one of our best-selling marketing kits and start growing your business today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-sunshine-400 hover:bg-sunshine-50 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-semibold text-sunshine-700 mb-6">
                💡 Our Story
              </div>
              <h2
                className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-[1.1]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
              >
                {aboutTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {aboutContent}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sunshine-500 text-gray-900 font-bold rounded-2xl shadow-friendly hover:bg-sunshine-400 hover:shadow-friendly-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Learn More About Us
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop Toolkits
                </Link>
              </div>
            </div>

            {/* About visual card */}
            <div className="relative">
              <div
                className="relative rounded-[2rem] overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #FFF2AD 50%, #FFE985 100%)' }}
              >
                {/* Background dots pattern */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='%23B38F00' fill-opacity='0.15'/%3E%3C/svg%3E\")",
                  }}
                />

                <div className="relative p-8 sm:p-10">
                  <img
                    src="https://imgix.cosmicjs.com/d6f6ba40-2e93-11f1-86e7-4be326c2a87b-generated-1775134792625.jpg?w=700&h=500&fit=crop&auto=format,compress"
                    alt="Friendly AI Robot"
                    className="rounded-2xl shadow-card-xl w-full object-cover"
                    width={500}
                    height={350}
                  />

                  {/* Floating stat badges */}
                  <div className="absolute -bottom-4 left-6 bg-white rounded-2xl shadow-card-hover px-5 py-3 flex items-center gap-3 border border-gray-100">
                    <div className="w-10 h-10 bg-sunshine-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🤖</div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-none mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Built by AI</p>
                      <p className="text-[11px] text-gray-400">Smarter, faster, friendlier</p>
                    </div>
                  </div>

                  <div className="absolute -top-4 right-6 bg-white rounded-2xl shadow-card-hover px-5 py-3 flex items-center gap-3 border border-gray-100">
                    <div className="w-10 h-10 bg-meadow-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">💛</div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-none mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Made for Humans</p>
                      <p className="text-[11px] text-gray-400">Designed with joy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {topReviews.length > 0 && (
        <section
          className="py-20 sm:py-28"
          style={{ background: 'linear-gradient(180deg, #FFFBF0 0%, #FFFDF8 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunshine-100 rounded-full text-sm font-semibold text-sunshine-700 mb-5">
                ⭐ Customer Love
              </div>
              <h2
                className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
              >
                Real results, real stories
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Don&apos;t take our word for it — hear from small business owners who&apos;ve leveled up with our toolkits.
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
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sm font-semibold text-sky-700 mb-5">
                📝 From the Blog
              </div>
              <h2
                className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
              >
                Marketing tips & tricks
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
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                Read the Blog
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #FFD233 0%, #FFAA00 40%, #FF9533 100%)' }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-8 left-1/4 w-6 h-6 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full bg-white/25 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-5xl mb-6 animate-float">🚀</div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-[1.0]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
          >
            Ready to make marketing friendly?
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Join thousands of small business owners who&apos;ve already leveled up their marketing game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/40 backdrop-blur-sm text-gray-900 font-bold rounded-2xl hover:bg-white/60 transition-all duration-300 text-lg border border-white/50 hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>

          {/* Guarantee note */}
          <p className="mt-8 text-sm text-gray-700 font-medium flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>
    </div>
  );
}
