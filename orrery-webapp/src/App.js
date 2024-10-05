// src/App.js
import React from "react";
import SolarSystem from "./SolarSystem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Orrery Web App</h1>
      </header>
      <SolarSystem />
    </div>
  );
}

export default App;
