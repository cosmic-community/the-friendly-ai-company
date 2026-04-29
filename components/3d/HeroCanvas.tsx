'use client';

/**
 * HeroCanvas — lazy-loaded wrapper around the R3F scene.
 *
 * Imported via next/dynamic in HeroSection so the entire Three.js +
 * React Three Fiber bundle is code-split and never downloaded until
 * the page hydrates on the client.
 */

import dynamic from 'next/dynamic';

const RobotScene = dynamic(
  () => import('./RobotScene'),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(168deg, #1a1206 0%, #241b04 30%, #0e1a28 70%, #091220 100%)',
        }}
        aria-hidden="true"
      />
    ),
  },
);

export default function HeroCanvas() {
  return <RobotScene />;
}
