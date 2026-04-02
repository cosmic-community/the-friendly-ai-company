import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface TrustSignalsProps {
  homepage: Homepage | null;
}

const defaultSignals = [
  { label: 'Happy Customers', value: '2,000+' },
  { label: 'Marketing Toolkits', value: '50+' },
  { label: 'Templates Included', value: '500+' },
  { label: 'Money-Back Guarantee', value: '30 Day' },
];

export default function TrustSignals({ homepage }: TrustSignalsProps) {
  let signals = defaultSignals;

  if (homepage?.metadata?.trust_signals) {
    const raw = getMetafieldValue(homepage.metadata.trust_signals);
    if (Array.isArray(raw)) {
      signals = raw;
    } else if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) signals = parsed;
      } catch {}
    }
  }

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {signals.map((signal, idx) => (
            <div key={idx} className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {signal.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {signal.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}