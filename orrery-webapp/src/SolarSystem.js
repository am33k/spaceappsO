import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

function Planet({ radius, color, orbitRadius, orbitSpeed, name }) {
  const planetRef = useRef();

  // Animate planet position using sine and cosine for circular orbit
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orbitSpeed; // Scale speed of orbit
    planetRef.current.position.x = orbitRadius * Math.cos(t);
    planetRef.current.position.z = orbitRadius * Math.sin(t);
  });

  return (
    <mesh ref={planetRef} onClick={() => alert(`You clicked on ${name}`)}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const SolarSystem = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />

      {/* The Sun (Fixed position, no animation) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* Mercury */}
      <Planet radius={0.3} color="gray" orbitRadius={8} orbitSpeed={4.15} name="Mercury" />

      {/* Venus */}
      <Planet radius={0.9} color="orange" orbitRadius={12} orbitSpeed={1.62} name="Venus" />

      {/* Earth */}
      <Planet radius={1} color="blue" orbitRadius={15} orbitSpeed={1.0} name="Earth" />

      {/* Mars */}
      <Planet radius={0.7} color="red" orbitRadius={20} orbitSpeed={0.53} name="Mars" />

      {/* Jupiter */}
      <Planet radius={2.5} color="brown" orbitRadius={40} orbitSpeed={0.08} name="Jupiter" />

      {/* Saturn */}
      <Planet radius={2} color="goldenrod" orbitRadius={55} orbitSpeed={0.03} name="Saturn" />

      {/* Uranus */}
      <Planet radius={1.7} color="lightblue" orbitRadius={70} orbitSpeed={0.011} name="Uranus" />

      {/* Neptune */}
      <Planet radius={1.6} color="darkblue" orbitRadius={85} orbitSpeed={0.006} name="Neptune" />

      <OrbitControls />
    </Canvas>
  );
};

export default SolarSystem;
