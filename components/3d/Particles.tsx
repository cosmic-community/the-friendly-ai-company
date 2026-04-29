'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;

export default function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  // Generate random particle positions once
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles across a wide volume
      pos[i3]     = (Math.random() - 0.5) * 28;  // x
      pos[i3 + 1] = (Math.random() - 0.5) * 18;  // y
      pos[i3 + 2] = (Math.random() - 0.5) * 14 - 2; // z (mostly behind robot)
      sz[i]       = Math.random() * 0.06 + 0.02;
    }

    return { positions: pos, sizes: sz };
  }, []);

  // Slow drift rotation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.018;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.06;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#FFD233"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
