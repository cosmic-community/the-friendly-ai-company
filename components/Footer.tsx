import Link from 'next/link';

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop', label: 'Marketing Toolkits' },
    { href: '/shop', label: 'Templates' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/', label: 'Privacy Policy' },
    { href: '/', label: 'Terms of Service' },
    { href: '/', label: 'Refund Policy' },
  ],
};

const trustItems = [
  { icon: '🛡️', text: '30-Day Money Back' },
  { icon: '⚡', text: 'Instant Download' },
  { icon: '🤖', text: 'Built by AI, for Humans' },
  { icon: '⭐', text: '5-Star Rated' },
];

const socialLinks = [
  { label: 'Twitter / X', symbol: '𝕏', href: '/' },
  { label: 'Instagram', symbol: '◈', href: '/' },
  { label: 'LinkedIn', symbol: 'in', href: '/' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(175deg, #0c0c1a 0%, #111127 40%, #0f1420 70%, #0a0f1e 100%)',
      }}
    >
      {/* ── Ambient glow layer ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Large warm glow top-center */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.14]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, #FFD233 0%, #FF9533 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-left cool glow */}
        <div
          className="absolute bottom-0 -left-40 w-[500px] h-[300px] opacity-[0.07]"
          style={{
            background:
              'radial-gradient(ellipse at 30% 100%, #6366f1 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Bottom-right warm glow */}
        <div
          className="absolute bottom-0 -right-40 w-[400px] h-[250px] opacity-[0.06]"
          style={{
            background:
              'radial-gradient(ellipse at 70% 100%, #FFD233 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Top accent bar ── */}
      <div
        className="relative h-[3px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #FFD233 20%, #FFBB33 50%, #FF9533 75%, transparent 100%)',
        }}
      />

      {/* ── Trust bar ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-sm"
                  style={{ background: 'rgba(255,210,51,0.1)' }}
                >
                  {item.icon}
                </span>
                <span className="text-[12.5px] font-semibold text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 sm:pt-16 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div
                className="w-11 h-11 rounded-[13px] flex items-center justify-center shadow-[0_2px_12px_rgba(255,210,51,0.35)] group-hover:shadow-[0_4px_20px_rgba(255,210,51,0.5)] group-hover:scale-[1.06] transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(145deg, #FFE566 0%, #FFD233 60%, #F5C400 100%)',
                }}
              >
                <span className="text-xl leading-none select-none">🤖</span>
              </div>
              <span
                className="text-xl font-extrabold text-white tracking-[-0.02em]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Friendly AI Co.
              </span>
            </Link>

            <p className="text-[13.5px] text-gray-400/90 leading-[1.75] mb-6 max-w-[280px]">
              Marketing made friendly. We help small businesses, solopreneurs,
              and freelancers grow with joyful, accessible tools — built by AI,
              designed for humans.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold text-gray-500 border border-white/[0.08] hover:border-sunshine-400/40 hover:text-sunshine-400 hover:bg-sunshine-400/[0.08] transition-all duration-200"
                >
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-sunshine-400/90 mb-5">
              Shop
            </h3>
            <ul className="space-y-[13px]">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group/fl inline-flex items-center gap-1.5 text-[13.5px] text-gray-400 hover:text-white font-medium transition-colors duration-150"
                  >
                    <span className="w-0 group-hover/fl:w-2.5 h-[1.5px] bg-sunshine-400 rounded-full transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-sunshine-400/90 mb-5">
              Company
            </h3>
            <ul className="space-y-[13px]">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group/fl inline-flex items-center gap-1.5 text-[13.5px] text-gray-400 hover:text-white font-medium transition-colors duration-150"
                  >
                    <span className="w-0 group-hover/fl:w-2.5 h-[1.5px] bg-sunshine-400 rounded-full transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-sunshine-400/90 mb-5">
              Stay in the Loop
            </h3>
            <p className="text-[13px] text-gray-400/90 leading-relaxed mb-4">
              Friendly tips, toolkit launches &amp; exclusive deals — straight to
              your inbox.
            </p>

            {/* Email form */}
            <div
              className="flex gap-2 p-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:border-white/[0.13] focus-within:border-sunshine-400/50 focus-within:bg-white/[0.06] transition-all duration-300"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-1.5 bg-transparent text-[13.5px] text-white placeholder-gray-600 focus:outline-none"
              />
              <button
                className="flex-shrink-0 px-4 py-2 text-[13px] font-bold text-gray-900 rounded-[10px] transition-all duration-200 hover:brightness-105 active:scale-[0.97] shadow-[0_2px_8px_rgba(255,210,51,0.35)] hover:shadow-[0_4px_16px_rgba(255,210,51,0.5)]"
                style={{
                  background:
                    'linear-gradient(145deg, #FFE566 0%, #FFD233 60%, #F5C400 100%)',
                }}
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2.5 text-[11px] text-gray-600 font-medium">
              No spam, ever. Unsubscribe anytime. 💛
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-14 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-600 text-center sm:text-left leading-relaxed">
            &copy; {currentYear}{' '}
            <span className="text-gray-500 font-medium">The Friendly AI Company</span>
            . Made with{' '}
            <span className="text-sunshine-500">♥</span> by AI, for humans.
          </p>
          <div className="flex items-center gap-1">
            {footerLinks.legal.map((link, i) => (
              <>
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11.5px] text-gray-600 hover:text-gray-400 px-2 py-1 rounded-lg hover:bg-white/[0.04] transition-all duration-150 font-medium"
                >
                  {link.label}
                </Link>
                {i < footerLinks.legal.length - 1 && (
                  <span className="text-white/10 text-xs select-none" aria-hidden="true">·</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
