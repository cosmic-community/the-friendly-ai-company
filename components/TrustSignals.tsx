import { getMetafieldValue } from '@/lib/cosmic';
import type { Homepage } from '@/types';

interface TrustSignalsProps {
  homepage: Homepage | null;
}

const defaultSignals = [
  {
    label: 'Happy Customers',
    value: '2,000+',
    emoji: '😊',
    iconBg: 'bg-sunshine-100',
    iconRing: 'ring-sunshine-200',
    gradient: 'from-sunshine-50 to-amber-50',
    border: 'border-sunshine-200/60',
    valueColor: 'text-sunshine-600',
    accentBar: 'bg-gradient-to-r from-sunshine-400 to-amber-400',
  },
  {
    label: 'Marketing Toolkits',
    value: '50+',
    emoji: '🧰',
    iconBg: 'bg-sky-100',
    iconRing: 'ring-sky-200',
    gradient: 'from-sky-50 to-blue-50',
    border: 'border-sky-200/60',
    valueColor: 'text-sky-600',
    accentBar: 'bg-gradient-to-r from-sky-400 to-blue-400',
  },
  {
    label: 'Templates Included',
    value: '500+',
    emoji: '📄',
    iconBg: 'bg-emerald-100',
    iconRing: 'ring-emerald-200',
    gradient: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200/60',
    valueColor: 'text-emerald-600',
    accentBar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
  },
  {
    label: 'Money-Back Guarantee',
    value: '30 Day',
    emoji: '🛡️',
    iconBg: 'bg-violet-100',
    iconRing: 'ring-violet-200',
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-200/60',
    valueColor: 'text-violet-600',
    accentBar: 'bg-gradient-to-r from-violet-400 to-purple-400',
  },
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
    ? rawSignals.map((s, i) => ({ ...s, ...defaultSignals[i] ?? defaultSignals[0] }))
    : defaultSignals;

  return (
    <section className="py-10 bg-[#FFFDF8] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {signals.map((signal, idx) => (
            <div
              key={idx}
              className={`relative group flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${signal.gradient} border ${signal.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Gradient border shimmer on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,210,51,0.12) 0%, rgba(255,255,255,0) 60%)',
                }}
              />

              {/* Top accent bar */}
              <div className={`h-1 w-full ${signal.accentBar} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
                {/* Icon container with ring */}
                <div className={`relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${signal.iconBg} ring-2 ${signal.iconRing} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <span className="text-xl sm:text-2xl leading-none select-none">
                    {signal.emoji}
                  </span>
                  {/* Soft inner glow */}
                  <div className="absolute inset-0 rounded-xl bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="min-w-0">
                  <div
                    className={`text-xl sm:text-2xl font-black leading-none mb-1 ${signal.valueColor}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {signal.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-semibold leading-snug">
                    {signal.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
