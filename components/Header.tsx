'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/products', label: 'Learn' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // True when we're on the homepage — we'll render the header transparent
  // until the user scrolls, so the hero video shows through unobstructed.
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // Fire once on mount so SSR→hydration state is correct
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ── Derived state ─────────────────────────────────────────────────────────
  // Transparent mode: homepage AND not yet scrolled
  const isTransparent = isHome && !scrolled;

  // Whether nav text / icons should be light (white) for dark video bg
  const isLight = isTransparent;

  return (
    // Fixed positioning so the hero section can slide up behind it.
    // On inner pages the header looks exactly the same as before.
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isTransparent
          ? 'bg-transparent'
          : scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05),0_8px_32px_rgba(0,0,0,0.08)]'
          : 'bg-white/85 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      {/* Top accent line — sunshine gradient, appears on scroll */}
      <div
        className={`h-[2.5px] w-full transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #FFD233 25%, #FFBB33 55%, #FF9533 75%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Icon badge */}
            <div className="relative flex-shrink-0">
              <div
                className="w-10 h-10 rounded-[13px] flex items-center justify-center shadow-[0_2px_8px_rgba(255,210,51,0.45)] group-hover:shadow-[0_4px_16px_rgba(255,210,51,0.6)] transition-all duration-300 group-hover:scale-[1.07] group-hover:rotate-[-2deg]"
                style={{
                  background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 60%, #F5C400 100%)',
                }}
              >
                <span className="text-[18px] leading-none select-none">🤖</span>
              </div>
              {/* Subtle halo ping */}
              <span className="absolute -inset-1 rounded-[16px] border border-sunshine-400/0 group-hover:border-sunshine-400/30 transition-all duration-300" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col -space-y-0.5">
              <span
                className={`text-[15px] sm:text-base font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-500 ${
                  isLight ? 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Friendly AI Co.
              </span>
              <span
                className={`text-[9.5px] font-semibold hidden sm:block tracking-[0.12em] uppercase transition-colors duration-500 ${
                  isLight ? 'text-white/70' : 'text-gray-400/90'
                }`}
              >
                Marketing made friendly
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-[14px] py-2 text-[13.5px] font-semibold rounded-xl transition-all duration-200 select-none ${
                    isActive
                      ? isLight
                        ? 'text-white'
                        : 'text-gray-900'
                      : isLight
                      ? 'text-white/80 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {/* Hover / active background pill */}
                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                      isActive
                        ? isLight
                          ? 'bg-white/15'
                          : 'bg-sunshine-400/15'
                        : 'bg-transparent'
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className={`absolute bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-colors duration-500 ${
                        isLight ? 'bg-sunshine-400' : 'bg-sunshine-500'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Ghost secondary link */}
            <Link
              href="/blog"
              className={`text-[13px] font-semibold transition-colors duration-200 px-2 py-1 ${
                isLight
                  ? 'text-white/80 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Free Resources
            </Link>

            {/* Primary CTA — always yellow, always legible */}
            <Link
              href="/shop"
              className="group/cta relative inline-flex items-center gap-2 px-5 py-[10px] font-bold text-[13.5px] text-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[1px] active:translate-y-0 shadow-[0_2px_8px_rgba(255,210,51,0.4)] hover:shadow-[0_6px_20px_rgba(255,210,51,0.55)]"
              style={{
                background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 50%, #F5C400 100%)',
              }}
            >
              {/* Shimmer on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)',
                }}
              />
              <span className="relative z-10">Get Started</span>
              <svg
                className="relative z-10 w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative p-2.5 rounded-xl transition-all duration-150 ${
              isLight
                ? 'text-white/90 hover:text-white hover:bg-white/15 active:bg-white/25'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 active:bg-gray-200'
            }`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-[18px] h-[14px] flex flex-col justify-between">
              <span
                className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-current rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Always use solid backdrop for mobile menu for readability */}
        <div className="border-t border-black/[0.05] bg-white/98 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 pt-3 pb-5 space-y-0.5" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 text-[14px] font-semibold rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'text-gray-900 bg-sunshine-400/12'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-500" aria-hidden="true" />
                  )}
                </Link>
              );
            })}

            <div className="pt-3">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 font-bold text-[14px] text-gray-900 rounded-xl shadow-[0_2px_10px_rgba(255,210,51,0.4)] hover:shadow-[0_4px_16px_rgba(255,210,51,0.55)] transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(145deg, #FFE566 0%, #FFD233 50%, #F5C400 100%)',
                }}
              >
                Get Started
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
