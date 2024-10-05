import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

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

function OrbitLine({ orbitRadius }) {
  const points = [];
  const segments = 64;

  // Create points in a circular path
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    points.push(
      new THREE.Vector3(
        orbitRadius * Math.cos(theta),
        0,
        orbitRadius * Math.sin(theta)
      )
    );
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={orbitGeometry}>
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
}

const SolarSystem = () => {
  const [showOrbits, setShowOrbits] = useState(true); // State to toggle orbit visibility
  const navigate = useNavigate(); // Initialize navigate function

  const toggleOrbits = () => {
    setShowOrbits(!showOrbits);
  };

  const handleBackToHomeClick = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Show/Hide Orbit Paths Button */}
      <button
        onClick={toggleOrbits}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "10px 20px",
          background: showOrbits ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        {showOrbits ? "Hide Orbit Paths" : "Show Orbit Paths"}
      </button>

      {/* Back to Home Page Button */}
      <button
        onClick={handleBackToHomeClick}
        style={{
          position: "absolute",
          top: 10,
          left: 150, // Adjust position as needed
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        Back to Home Page
      </button>

      <Canvas camera={{ position: [0, 100, 0], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />

        {/* The Sun */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>

        {/* Conditionally render the orbit lines */}
        {showOrbits && <OrbitLine orbitRadius={8} />}   {/* Mercury's orbit */}
        {showOrbits && <OrbitLine orbitRadius={12} />}  {/* Venus's orbit */}
        {showOrbits && <OrbitLine orbitRadius={15} />}  {/* Earth's orbit */}
        {showOrbits && <OrbitLine orbitRadius={20} />}  {/* Mars's orbit */}
        {showOrbits && <OrbitLine orbitRadius={40} />}  {/* Jupiter's orbit */}
        {showOrbits && <OrbitLine orbitRadius={55} />}  {/* Saturn's orbit */}
        {showOrbits && <OrbitLine orbitRadius={70} />}  {/* Uranus's orbit */}
        {showOrbits && <OrbitLine orbitRadius={85} />}  {/* Neptune's orbit */}

        {/* Planets */}
        <Planet
          radius={0.3}
          color="gray"
          orbitRadius={8}
          orbitSpeed={4.15}
          name="Mercury"
        />
        <Planet
          radius={0.9}
          color="orange"
          orbitRadius={12}
          orbitSpeed={1.62}
          name="Venus"
        />
        <Planet
          radius={1}
          color="blue"
          orbitRadius={15}
          orbitSpeed={1.0}
          name="Earth"
        />
        <Planet
          radius={0.7}
          color="red"
          orbitRadius={20}
          orbitSpeed={0.53}
          name="Mars"
        />
        <Planet
          radius={2.5}
          color="brown"
          orbitRadius={40}
          orbitSpeed={0.08}
          name="Jupiter"
        />
        <Planet
          radius={2}
          color="goldenrod"
          orbitRadius={55}
          orbitSpeed={0.03}
          name="Saturn"
        />
        <Planet
          radius={1.7}
          color="lightblue"
          orbitRadius={70}
          orbitSpeed={0.011}
          name="Uranus"
        />
        <Planet
          radius={1.6}
          color="darkblue"
          orbitRadius={85}
          orbitSpeed={0.006}
          name="Neptune"
        />

        {/* OrbitControls for mouse control */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
