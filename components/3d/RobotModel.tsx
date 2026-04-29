'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Colour palette (brand sunshine / warm) ───────────────────────────────
const COLORS = {
  body:        '#FFD233', // sunshine-500
  bodyDark:    '#E6B800', // sunshine-600
  head:        '#FFDD57', // sunshine-400
  headAccent:  '#FFF2AD', // sunshine-200 (lighter forehead)
  eye:         '#1a1a2e', // near-black pupils
  eyeGlow:     '#FFFFFF', // white highlight
  mouth:       '#B38F00', // sunshine-700 warm smile
  antenna:     '#FF9533', // warm-500
  antennaTip:  '#FF3385', // blush-500 — playful pink dot
  arms:        '#FFAA57', // warm-400
  legs:        '#E6A000', // warm amber
  hands:       '#FF9533', // warm-500
  feet:        '#CC6200', // warm-700
  cheek:       '#FF85B5', // blush-300 — cute rosy cheeks
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────

function Eye({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Eyeball */}
      <mesh>
        <sphereGeometry args={[0.085, 12, 12]} />
        <meshStandardMaterial color={COLORS.eye} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* White highlight */}
      <mesh position={[0.025, 0.025, 0.07]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial color={COLORS.eyeGlow} roughness={0} emissive={COLORS.eyeGlow} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Cheek({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.075, 10, 10]} />
      <meshStandardMaterial
        color={COLORS.cheek}
        transparent
        opacity={0.55}
        roughness={0.8}
        metalness={0}
      />
    </mesh>
  );
}

// ─── Main robot component ──────────────────────────────────────────────────
export default function RobotModel() {
  const robotRef  = useRef<THREE.Group>(null);
  const headRef   = useRef<THREE.Group>(null);

  // Mouse tracking via pointer position in normalised device coords
  const mouseTarget = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const mouseSmooth = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.current.set(
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
        -((e.clientY - rect.top)  / rect.height) * 2 + 1,
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouseTarget.current.set(
        ((touch.clientX - rect.left) / rect.width)  * 2 - 1,
        -((touch.clientY - rect.top)  / rect.height) * 2 + 1,
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gl.domElement]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ── Smooth-follow mouse ──────────────────────────────────────
    mouseSmooth.current.lerp(mouseTarget.current, 0.05);

    // ── Body: gentle bob + slow y-rotation ──────────────────────
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(t * 0.9) * 0.18;
      robotRef.current.rotation.y = Math.sin(t * 0.25) * 0.25 + mouseSmooth.current.x * 0.15;
    }

    // ── Head: tracks cursor more expressively ───────────────────
    if (headRef.current) {
      headRef.current.rotation.y = mouseSmooth.current.x * 0.55;
      headRef.current.rotation.x = -mouseSmooth.current.y * 0.35;
      // Tiny idle nod
      headRef.current.rotation.z = Math.sin(t * 1.1 + 1) * 0.025;
    }
  });

  return (
    <group ref={robotRef} position={[0, 0, 0]}>

      {/* ══ LEGS ══════════════════════════════════════════════ */}
      {([-0.22, 0.22] as const).map((x, i) => (
        <group key={i} position={[x, -1.32, 0]}>
          {/* Upper leg */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.11, 0.1, 0.38, 10]} />
            <meshStandardMaterial color={COLORS.legs} roughness={0.45} metalness={0.15} />
          </mesh>
          {/* Knee joint */}
          <mesh position={[0, -0.04, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color={COLORS.bodyDark} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.38, 10]} />
            <meshStandardMaterial color={COLORS.legs} roughness={0.45} metalness={0.15} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.5, 0.06]}>
            <boxGeometry args={[0.18, 0.12, 0.28]} />
            <meshStandardMaterial color={COLORS.feet} roughness={0.55} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* ══ BODY ══════════════════════════════════════════════ */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.42, 0.38, 1.05, 14]} />
        <meshStandardMaterial
          color={COLORS.body}
          roughness={0.38}
          metalness={0.22}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Chest panel / belly button detail */}
      <mesh position={[0, -0.28, 0.41]}>
        <boxGeometry args={[0.38, 0.42, 0.04]} />
        <meshStandardMaterial color={COLORS.bodyDark} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Glowing chest orb */}
      <mesh position={[0, -0.26, 0.45]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFDE0"
          emissiveIntensity={1.2}
          roughness={0}
          metalness={0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ══ ARMS ══════════════════════════════════════════════ */}
      {([-1, 1] as const).map((side, i) => {
        const x = side * 0.68;
        return (
          <group key={i} position={[x, -0.1, 0]}>
            {/* Shoulder joint */}
            <mesh>
              <sphereGeometry args={[0.13, 10, 10]} />
              <meshStandardMaterial color={COLORS.bodyDark} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Upper arm */}
            <mesh
              position={[side * 0.08, -0.28, 0]}
              rotation={[0, 0, side * 0.22]}
            >
              <cylinderGeometry args={[0.1, 0.09, 0.48, 10]} />
              <meshStandardMaterial color={COLORS.arms} roughness={0.42} metalness={0.18} />
            </mesh>
            {/* Elbow */}
            <mesh position={[side * 0.12, -0.54, 0]}>
              <sphereGeometry args={[0.09, 10, 10]} />
              <meshStandardMaterial color={COLORS.bodyDark} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Forearm */}
            <mesh
              position={[side * 0.1, -0.76, 0]}
              rotation={[0, 0, side * 0.15]}
            >
              <cylinderGeometry args={[0.09, 0.085, 0.38, 10]} />
              <meshStandardMaterial color={COLORS.arms} roughness={0.42} metalness={0.18} />
            </mesh>
            {/* Hand (rounded box) */}
            <mesh position={[side * 0.08, -0.99, 0]}>
              <boxGeometry args={[0.18, 0.18, 0.14]} />
              <meshStandardMaterial color={COLORS.hands} roughness={0.5} metalness={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* ══ NECK ══════════════════════════════════════════════ */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.14, 0.17, 0.22, 10]} />
        <meshStandardMaterial color={COLORS.bodyDark} roughness={0.5} metalness={0.15} />
      </mesh>

      {/* ══ HEAD ══════════════════════════════════════════════ */}
      <group ref={headRef} position={[0, 0.44, 0]}>
        {/* Main head sphere */}
        <mesh>
          <sphereGeometry args={[0.44, 22, 22]} />
          <meshStandardMaterial
            color={COLORS.head}
            roughness={0.32}
            metalness={0.25}
            envMapIntensity={0.7}
          />
        </mesh>

        {/* Forehead highlight */}
        <mesh position={[0, 0.2, 0.3]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color={COLORS.headAccent}
            transparent
            opacity={0.35}
            roughness={0.2}
            metalness={0}
          />
        </mesh>

        {/* Eyes */}
        <Eye position={[-0.155, 0.05, 0.385]} />
        <Eye position={[ 0.155, 0.05, 0.385]} />

        {/* Cheeks */}
        <Cheek position={[-0.3,  -0.08, 0.3]} />
        <Cheek position={[ 0.3,  -0.08, 0.3]} />

        {/* Smile — arc made of small boxes */}
        {([- 0.12, -0.06, 0, 0.06, 0.12] as const).map((x, i) => (
          <mesh
            key={i}
            position={[x, -0.14 + Math.abs(x) * 0.55, 0.40]}
            rotation={[0.1, 0, 0]}
          >
            <boxGeometry args={[0.05, 0.035, 0.02]} />
            <meshStandardMaterial color={COLORS.mouth} roughness={0.6} />
          </mesh>
        ))}

        {/* Ear panels */}
        {([-1, 1] as const).map((side, i) => (
          <mesh key={i} position={[side * 0.43, 0.02, 0]} rotation={[0, side * 0.45, 0]}>
            <boxGeometry args={[0.06, 0.22, 0.18]} />
            <meshStandardMaterial color={COLORS.bodyDark} roughness={0.5} metalness={0.2} />
          </mesh>
        ))}

        {/* Antenna base */}
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.22, 8]} />
          <meshStandardMaterial color={COLORS.antenna} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Antenna tip (blush pink orb — glows) */}
        <mesh position={[0, 0.60, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial
            color={COLORS.antennaTip}
            emissive={COLORS.antennaTip}
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}
