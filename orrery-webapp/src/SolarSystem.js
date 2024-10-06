import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import Planet from "./Planet";
import Asteroid from "./Asteroid";
import * as THREE from "three";

const planetsInfo = {
  Mercury: { name: "Mercury", semiMajorAxis: 8, semiMinorAxis: 6.4, color: "gray", orbitSpeed: 4.15 },
  Venus: { name: "Venus", semiMajorAxis: 12, semiMinorAxis: 10.3, color: "orange", orbitSpeed: 1.62 },
  Earth: { name: "Earth", semiMajorAxis: 15, semiMinorAxis: 13.5, color: "blue", orbitSpeed: 1.0 },
  Mars: { name: "Mars", semiMajorAxis: 20, semiMinorAxis: 17.5, color: "red", orbitSpeed: 0.53 },
  Jupiter: { name: "Jupiter", semiMajorAxis: 40, semiMinorAxis: 35, color: "brown", orbitSpeed: 0.08 },
  Saturn: { name: "Saturn", semiMajorAxis: 55, semiMinorAxis: 49, color: "goldenrod", orbitSpeed: 0.03 },
  Uranus: { name: "Uranus", semiMajorAxis: 70, semiMinorAxis: 62, color: "lightblue", orbitSpeed: 0.011 },
  Neptune: { name: "Neptune", semiMajorAxis: 85, semiMinorAxis: 76, color: "darkblue", orbitSpeed: 0.006 },
};

function OrbitLine({ semiMajorAxis, semiMinorAxis, color = "white" }) {
  const points = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = semiMajorAxis * Math.cos(theta);
    const z = semiMinorAxis * Math.sin(theta);
    points.push(new THREE.Vector3(x, 0, z));
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={orbitGeometry}>
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
}

const SolarSystem = () => {
  const [showOrbits, setShowOrbits] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showNEAs, setShowNEAs] = useState(true);
  const [showPHAs, setShowPHAs] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const navigate = useNavigate();

  const toggleOrbits = () => setShowOrbits(!showOrbits);
  const togglePause = () => setIsPaused(!isPaused);
  const toggleNEAs = () => setShowNEAs(!showNEAs);
  const togglePHAs = () => setShowPHAs(!showPHAs);
  const handlePlanetClick = (planetName) => navigate(`/planet/${planetName}`);
  const handleBackToHomeClick = () => navigate("/");

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <button onClick={toggleOrbits} style={{ ...buttonStyles, left: 10 }}>
        {showOrbits ? "Hide Orbit Paths" : "Show Orbit Paths"}
      </button>

      <button onClick={togglePause} style={{ ...buttonStyles, left: 150 }}>
        {isPaused ? "Resume Orbits" : "Pause Orbits"}
      </button>

      <button onClick={toggleNEAs} style={{ ...buttonStyles, left: 300 }}>
        {showNEAs ? "Hide NEAs" : "Show NEAs"}
      </button>

      <button onClick={togglePHAs} style={{ ...buttonStyles, left: 450 }}>
        {showPHAs ? "Hide PHAs" : "Show PHAs"}
      </button>

      <button onClick={handleBackToHomeClick} style={{ ...buttonStyles, left: 600 }}>
        Back to Home Page
      </button>

      <Canvas camera={{ position: [0, 100, 0], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshStandardMaterial emissive="yellow" emissiveIntensity={3} color="yellow" />
        </mesh>

        {Object.values(planetsInfo).map((planet) => (
          <>
            {showOrbits && (
              <OrbitLine
                key={`orbit-${planet.name}`}
                semiMajorAxis={planet.semiMajorAxis}
                semiMinorAxis={planet.semiMinorAxis}
                color={planet.color}
              />
            )}

            <Planet
              key={planet.name}
              radius={planet.name === "Jupiter" ? 2.5 : planet.name === "Saturn" ? 2 : planet.name === "Neptune" ? 1.6 : 1}
              color={planet.color}
              semiMajorAxis={planet.semiMajorAxis}
              semiMinorAxis={planet.semiMinorAxis}
              orbitSpeed={planet.orbitSpeed}
              name={planet.name}
              onClick={handlePlanetClick}
              isPaused={isPaused}
            />
          </>
        ))}

        {showNEAs && (
          <>
            <Asteroid radius={0.05} color="orange" orbitRadius={25} orbitSpeed={2} name="NEA 1" isPaused={isPaused} />
            <Asteroid radius={0.05} color="orange" orbitRadius={30} orbitSpeed={2.2} name="NEA 2" isPaused={isPaused} />
            <Asteroid radius={0.05} color="orange" orbitRadius={35} orbitSpeed={2.5} name="NEA 3" isPaused={isPaused} />
          </>
        )}

        {showPHAs && (
          <>
            <Asteroid radius={0.08} color="purple" orbitRadius={60} orbitSpeed={0.5} name="PHA 1" isPaused={isPaused} />
            <Asteroid radius={0.08} color="purple" orbitRadius={75} orbitSpeed={0.6} name="PHA 2" isPaused={isPaused} />
          </>
        )}

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

const buttonStyles = {
  padding: "10px 20px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  zIndex: 10,
  cursor: "pointer",
  position: "absolute",
  top: 10,
};

export default SolarSystem;
