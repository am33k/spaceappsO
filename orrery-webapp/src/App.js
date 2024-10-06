import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SolarSystem from "./SolarSystem";
import PlanetPage from "./PlanetPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orrery" element={<SolarSystem />} />
        <Route path="/planet/:planetName" element={<PlanetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
