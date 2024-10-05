import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  // Load the Spline Viewer script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  const handleExploreClick = () => {
    navigate('/orrery');  // This will navigate to the Orrery route in React
  };

  return (
    <div>
      <header>
        <h1>Interactive Orrery</h1>
        <nav>
          <ul className="nav-tabs">
            <li><a href="#data">Data</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#challenge">Challenge</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero">
          <h2>Welcome to our project</h2>

          {/* Spline Viewer Section */}
          <div id="spline-container">
            <spline-viewer url="https://prod.spline.design/B6P09pbWGcYGpuAt/scene.splinecode"></spline-viewer>
          </div>

          <h2>Explore Our Solar System</h2>
          <p>Learn about celestial bodies through our interactive orrery!</p>
          <button className="explore-btn" onClick={handleExploreClick}>Start Exploring</button>
        </section>

        <section id="data">
          <h2>Data</h2>
          <p>Access real-time data from NASA and other sources to learn about celestial bodies.</p>
        </section>

        <section id="about">
          <h2>About the Orrery</h2>
          <p>This interactive orrery displays planets, asteroids, and comets, providing educational insights into our solar system.</p>
        </section>

        <section id="challenge">
          <h2>Challenge</h2>
          <p>Join us in exploring space and solving real-world challenges with our interactive tools.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Interactive Orrery. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
