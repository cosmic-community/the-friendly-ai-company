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
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Divider */}
      <div className="h-2 bg-sunshine-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sunshine-400 rounded-xl flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <span className="text-xl font-bold">The Friendly AI Co.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Marketing made friendly. We're an AI-powered company helping small businesses, solopreneurs, and freelancers succeed with joyful marketing tools.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sunshine-400 mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sunshine-400 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sunshine-400 mb-4">
              Stay in Touch
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get friendly marketing tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-gray-800 rounded-xl text-sm text-white placeholder-gray-500 border border-gray-700 focus:border-sunshine-400 focus:outline-none transition-colors"
              />
              <button className="px-4 py-2 bg-sunshine-400 text-gray-900 font-semibold rounded-xl hover:bg-sunshine-300 transition-colors text-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {currentYear} The Friendly AI Company. Made with care by AI, for humans.
          </p>
          <p className="text-gray-500 text-sm">
            Built with Cosmic &amp; Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}