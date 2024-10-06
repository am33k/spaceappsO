import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Planet = ({ radius, color, semiMajorAxis, semiMinorAxis, orbitSpeed, name, isPaused, onClick }) => {
  const planetRef = useRef();

  useFrame(({ clock }) => {
    if (!isPaused && planetRef.current) {
      const t = clock.getElapsedTime() * orbitSpeed; // Time-based factor for smooth movement

      // Calculate planet's position in the elliptical orbit using parametric equations
      const x = semiMajorAxis * Math.cos(t); // Semi-major axis along the x-direction
      const z = semiMinorAxis * Math.sin(t); // Semi-minor axis along the z-direction

      // Update planet's position without reversing or jitter
      planetRef.current.position.set(x, 0, z); // Set planet position in 3D space
    }
  });

  return (
    <mesh ref={planetRef} onClick={() => onClick(name)}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Planet;
