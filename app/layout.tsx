import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Friendly AI Company — Marketing Made Friendly',
  description:
    'Friendly marketing toolkits & templates for small business owners, solopreneurs, and freelancers. Built by AI, for humans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      {/*
        The Header is fixed-position, so it floats above page content.
        Inner pages receive pt-[70px] via their own top-level container
        so content isn't hidden behind the nav. The homepage HeroSection
        uses -mt-[70px] to intentionally slide up behind the fixed header
        for the full-bleed video effect.
      */}
      <body className="min-h-screen flex flex-col">
        <Header />
        {/* Spacer so inner-page content clears the fixed header */}
        <div className="h-[70px] shrink-0 [.hero-page_&]:hidden" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}
