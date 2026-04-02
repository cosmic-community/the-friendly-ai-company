import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface TrustSignalsProps {
  homepage: Homepage | null;
}

const defaultSignals = [
  { emoji: '⚡', title: 'Instant Download', description: 'Get your toolkit immediately after purchase' },
  { emoji: '🎯', title: 'Beginner-Friendly', description: 'No marketing degree required' },
  { emoji: '💰', title: 'Affordable', description: 'Premium tools without the premium price' },
  { emoji: '🤖', title: 'AI-Powered', description: 'Created with AI to be better & smarter' },
];

export default function TrustSignals({ homepage }: TrustSignalsProps) {
  const trustSignalsContent = homepage?.metadata?.trust_signals
    ? getMetafieldValue(homepage.metadata.trust_signals)
    : '';

  // Parse trust signals from content or use defaults
  const signals = trustSignalsContent ? defaultSignals : defaultSignals;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why choose us? 🌟
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We believe marketing should feel good. Here&apos;s why thousands of small businesses trust The Friendly AI Company.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {signals.map((signal, idx) => (
            <div
              key={idx}
              className="text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sunshine-50 to-white border border-sunshine-100 hover:shadow-friendly transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:animate-wiggle">{signal.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{signal.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}