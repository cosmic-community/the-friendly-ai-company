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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 60%, #111827 100%)' }}>
      {/* Subtle yellow glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, #FFD233 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Yellow top accent line */}
      <div className="relative h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #FFD233 30%, #FF9533 60%, transparent 100%)' }} />

      {/* Trust bar */}
      <div className="relative border-b border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            {[
              { icon: '🛡️', text: '30-Day Money Back Guarantee' },
              { icon: '⚡', text: 'Instant Digital Download' },
              { icon: '🤖', text: 'Built by AI, Made for Humans' },
              { icon: '⭐', text: '5-Star Rated by 2,000+ Customers' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 bg-sunshine-400 rounded-xl flex items-center justify-center shadow-friendly group-hover:shadow-friendly-lg transition-all">
                <span className="text-xl">🤖</span>
              </div>
              <span className="text-xl font-black text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                The Friendly AI Co.
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Marketing made friendly. We help small businesses, solopreneurs, and freelancers grow with joyful, accessible marketing tools — built by AI, designed for humans.
            </p>
            {/* Social links placeholder */}
            <div className="flex items-center gap-3">
              {['Twitter', 'Instagram', 'LinkedIn'].map((s, i) => (
                <a
                  key={i}
                  href="/"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sunshine-400/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-sunshine-400 transition-all duration-200"
                  aria-label={s}
                >
                  <span className="text-sm">{['𝕏', '📸', '💼'][i]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sunshine-400 mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:translate-x-0.5 inline-block transition-transform duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sunshine-400 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:translate-x-0.5 inline-block transition-transform duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sunshine-400 mb-4">
              Stay in the Loop
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get friendly marketing tips, toolkit launches, and exclusive deals — straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder-gray-500 border border-white/10 focus:border-sunshine-400/60 focus:outline-none focus:bg-white/8 transition-all"
              />
              <button className="px-4 py-2.5 bg-sunshine-500 text-gray-900 font-bold rounded-xl hover:bg-sunshine-400 transition-all duration-200 text-sm flex-shrink-0 hover:shadow-friendly">
                Join →
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-2">No spam. Unsubscribe anytime. 💛</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            &copy; {currentYear} The Friendly AI Company. Made with ♥ by AI, for humans.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link, i) => (
              <Link key={i} href={link.href} className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
