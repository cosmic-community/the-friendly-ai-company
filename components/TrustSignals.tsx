import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface TrustSignalsProps {
  homepage: Homepage | null;
}

const defaultSignals = [
  { label: 'Happy Customers', value: '2,000+', emoji: '😊', color: 'bg-sunshine-50 border-sunshine-200' },
  { label: 'Marketing Toolkits', value: '50+', emoji: '🧰', color: 'bg-sky-50 border-sky-200' },
  { label: 'Templates Included', value: '500+', emoji: '📄', color: 'bg-meadow-50 border-meadow-200' },
  { label: 'Money-Back Guarantee', value: '30 Day', emoji: '🛡️', color: 'bg-blush-50 border-blush-200' },
];

export default function TrustSignals({ homepage }: TrustSignalsProps) {
  let rawSignals: { label: string; value: string }[] = [];

  if (homepage?.metadata?.trust_signals) {
    const raw = getMetafieldValue(homepage.metadata.trust_signals);
    if (Array.isArray(raw)) {
      rawSignals = raw;
    } else if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) rawSignals = parsed;
      } catch {}
    }
  }

  const signals = rawSignals.length > 0
    ? rawSignals.map((s, i) => ({ ...s, emoji: defaultSignals[i]?.emoji ?? '✨', color: defaultSignals[i]?.color ?? 'bg-gray-50 border-gray-200' }))
    : defaultSignals;

  return (
    <section className="py-8 bg-[#FFFDF8] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {signals.map((signal, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border ${signal.color} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card`}
            >
              <div className="text-2xl sm:text-3xl flex-shrink-0">{signal.emoji}</div>
              <div>
                <div
                  className="text-xl sm:text-2xl font-black text-gray-900 leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {signal.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {signal.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
