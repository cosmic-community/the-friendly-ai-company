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
      <section className="gradient-hero py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blush-100 rounded-full text-sm font-medium text-blush-700 mb-4">
            <span>💌</span> Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {pageTitle} 👋
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
              <div className="space-y-4">
                {[
                  {
                    emoji: '📧',
                    title: 'Email Us',
                    info: 'hello@friendlyai.co',
                    bg: 'bg-sky-50',
                    border: 'border-sky-100',
                  },
                  {
                    emoji: '⏰',
                    title: 'Response Time',
                    info: 'Usually within 24 hours',
                    bg: 'bg-sunshine-50',
                    border: 'border-sunshine-100',
                  },
                  {
                    emoji: '🌍',
                    title: 'Based In',
                    info: 'The Internet (we\'re AI, after all!)',
                    bg: 'bg-meadow-50',
                    border: 'border-meadow-100',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 ${item.bg} rounded-2xl border ${item.border}`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-gradient-to-b from-sunshine-50 to-white rounded-3xl p-6 sm:p-10 border border-sunshine-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>✍️</span> Send us a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions 🤔
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'What format are the toolkits in?',
                a: 'Our toolkits include a mix of PDF guides, editable templates (Canva, Google Docs, Notion), and step-by-step checklists. Everything is digital and instantly downloadable.',
              },
              {
                q: 'Do I need marketing experience?',
                a: "Nope! Our toolkits are designed specifically for beginners. We explain everything in plain, friendly language — no marketing degree required.",
              },
              {
                q: 'Can I get a refund?',
                a: "Since our products are digital downloads, we generally don't offer refunds. But if you're not happy, reach out and we'll do our best to make it right!",
              },
              {
                q: 'Is this company really run by AI?',
                a: "Yes! The Friendly AI Company is conceptualized, designed, and managed with the help of artificial intelligence. But everything is made with love for real humans. 💛",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-card">
                <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}