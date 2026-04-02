import { getPageBySlug, getMetafieldValue } from '@/lib/cosmic';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact Us — The Friendly AI Company',
  description: 'Get in touch with The Friendly AI Company. We\'d love to hear from you!',
};

export default async function ContactPage() {
  const page = await getPageBySlug('contact');

  const pageTitle = page?.title || 'Get in Touch';
  const heroSubtitle = page?.metadata?.hero_subtitle
    ? getMetafieldValue(page.metadata.hero_subtitle)
    : "We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.";
  const pageContent = page?.metadata?.content
    ? getMetafieldValue(page.metadata.content)
    : '';

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFF0F5 0%, #FFD6E6 30%, #FFFBF0 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-64 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #FF85B5 0%, transparent 60%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-blush-700 mb-6 shadow-card border border-blush-200">
            <span>💌</span> Contact Us
          </div>
          <h1
            className="text-5xl sm:text-6xl font-black text-gray-900 mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
          >
            {pageTitle} 👋
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-black text-gray-900 mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                We&apos;re here to help 🤗
              </h2>

              {pageContent ? (
                <div
                  className="prose-friendly text-lg leading-relaxed space-y-4 mb-8"
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                />
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Got a question about one of our toolkits? Need help with your marketing strategy? Or just want to tell us how awesome we are? (We love that too.) Fill out the form and we&apos;ll get back to you as soon as our AI brain processes your message!
                </p>
              )}

              {/* Contact Info Cards */}
              <div className="space-y-3">
                {[
                  { emoji: '📧', title: 'Email Us', info: 'hello@friendlyai.co', bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-700' },
                  { emoji: '⏰', title: 'Response Time', info: 'Usually within 24 hours', bg: 'bg-sunshine-50', border: 'border-sunshine-100', text: 'text-sunshine-700' },
                  { emoji: '🌍', title: 'Based In', info: "The Internet (we're AI, after all!)", bg: 'bg-meadow-50', border: 'border-meadow-100', text: 'text-meadow-700' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 sm:p-5 ${item.bg} rounded-2xl border ${item.border} hover:-translate-y-0.5 transition-transform duration-200`}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div>
                      <h4 className={`font-bold text-gray-900 text-sm mb-0.5`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl opacity-60" style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #FFF2AD 100%)' }} />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-sunshine-100 shadow-card">
                <h3
                  className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>✍️</span> Send us a message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFFBF0 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Frequently Asked Questions 🤔
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What format are the toolkits in?', a: 'Our toolkits include a mix of PDF guides, editable templates (Canva, Google Docs, Notion), and step-by-step checklists. Everything is digital and instantly downloadable.' },
              { q: 'Do I need marketing experience?', a: "Nope! Our toolkits are designed specifically for beginners. We explain everything in plain, friendly language — no marketing degree required." },
              { q: 'Can I get a refund?', a: "Since our products are digital downloads, we generally don't offer refunds. But if you're not happy, reach out and we'll do our best to make it right!" },
              { q: 'Is this company really run by AI?', a: "Yes! The Friendly AI Company is conceptualized, designed, and managed with the help of artificial intelligence. But everything is made with love for real humans. 💛" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4
                  className="font-bold text-gray-900 mb-2 flex items-start gap-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="text-sunshine-500 font-black mt-0.5 flex-shrink-0">Q.</span>
                  {item.q}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed pl-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
