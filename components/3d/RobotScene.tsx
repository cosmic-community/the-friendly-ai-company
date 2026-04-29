'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import RobotModel from './RobotModel';
import Particles from './Particles';

// ─── Scene lighting & camera ───────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      {/* Warm ambient fill */}
      <ambientLight intensity={0.75} color="#FFF9E0" />

      {/* Key light — warm front-right */}
      <pointLight
        position={[3.5, 4, 3]}
        intensity={55}
        color="#FFE066"
        distance={18}
        decay={2}
      />

      {/* Soft fill — cool left */}
      <pointLight
        position={[-3, 2, 2]}
        intensity={20}
        color="#B8DDFF"
        distance={14}
        decay={2}
      />

      {/* Back-rim light — warm orange pop */}
      <pointLight
        position={[0, 1, -5]}
        intensity={28}
        color="#FF9533"
        distance={12}
        decay={2}
      />

      {/* Ground bounce — subtle warm */}
      <pointLight
        position={[0, -4, 1]}
        intensity={12}
        color="#FFCC44"
        distance={10}
        decay={2}
      />
    </>
  );
}

// ─── Fallback shown while assets load ─────────────────────────────────────
function SceneFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(168deg, #1a1206 0%, #2a1e05 35%, #0e1a28 75%, #091220 100%)',
      }}
    />
  );
}

// ─── Main exported scene component ────────────────────────────────────────
export default function RobotScene() {
  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden="true">
      {/* Dark background that shows before/during canvas init */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(168deg, #1a1206 0%, #241b04 30%, #0e1a28 70%, #091220 100%)',
        }}
      />

      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0.2, 5.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
          frameloop="always"
        >
          {/* Adaptive performance — drops DPR on slow devices */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <PerformanceMonitor
            onDecline={() => undefined}
            onIncline={() => undefined}
          />

          <SceneLights />

          {/* Prebuilt HDRI environment for realistic reflections */}
          <Environment preset="sunset" />

          <Suspense fallback={null}>
            <RobotModel />
          </Suspense>

          <Particles />
        </Canvas>
      </Suspense>

      {/* Multi-layer overlay — matches the original video treatment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(160deg, rgba(0,0,0,0.48) 0%, rgba(20,12,0,0.42) 45%, rgba(0,0,0,0.50) 100%)',
        }}
      />
      {/* Sunshine tint — keeps brand warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,210,51,0.08) 0%, rgba(255,188,0,0.05) 60%, rgba(0,0,0,0.0) 100%)',
        }}
      />
    </div>
  );
}
