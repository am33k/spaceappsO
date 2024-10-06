import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Asteroid component for NEAs and PHAs with a tail and brighter appearance
const Asteroid = ({ radius, color, orbitRadius, orbitSpeed, name, isPaused }) => {
  const asteroidRef = useRef();
  const previousPosition = useRef(new THREE.Vector3());

  // Animate asteroid position using sine and cosine for circular orbit
  useFrame(({ clock }) => {
    if (asteroidRef.current && !isPaused) {
      const t = clock.getElapsedTime() * orbitSpeed;
      const x = orbitRadius * Math.cos(t);
      const z = orbitRadius * Math.sin(t);

      // Update asteroid position
      asteroidRef.current.position.set(x, 0, z);

      // Update the previous position for tail drawing
      previousPosition.current.copy(asteroidRef.current.position);
    }
  });

  return (
    <>
      {/* Asteroid itself */}
      <mesh ref={asteroidRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>

      {/* Asteroid tail */}
      <Line
        points={[previousPosition.current, asteroidRef.current ? asteroidRef.current.position : new THREE.Vector3()]}
        color={color}
        lineWidth={2}
        dashed={false}
        transparent
        opacity={0.8}
      />
    </>
  );
};

export default Asteroid;
