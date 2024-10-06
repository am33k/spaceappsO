import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the planet name from the URL

const PlanetDetails = () => {
  const { planetName } = useParams(); // Get the planet name from the URL params
  const [realTimeData, setRealTimeData] = useState(null);

  // Placeholder data for planets (you can extend this with more info)
  const planetsData = {
    Mercury: {
      name: "Mercury",
      image: "/images/mercury.jpg", // Replace with actual image paths
      description: "Mercury is the smallest planet in our solar system and closest to the Sun.",
    },
    Venus: {
      name: "Venus",
      image: "/images/venus.jpg",
      description: "Venus has a thick, toxic atmosphere that traps heat.",
    },
    Earth: {
      name: "Earth",
      image: "/images/earth.jpg",
      description: "Earth is our home planet, the only one known to support life.",
    },
    Mars: {
      name: "Mars",
      image: "/images/mars.jpg",
      description: "Mars is the red planet known for having the tallest mountain in the solar system.",
    },
    // Add more planets here...
  };

  // Fetch real-time data (this is where you would integrate an API)
  useEffect(() => {
    const fetchRealTimeData = async () => {
      // Simulated real-time data fetch (you can use an actual API here)
      const data = await fetch(`https://api.example.com/planet/${planetName}`);
      const result = await data.json();
      setRealTimeData(result);
    };

    fetchRealTimeData();
  }, [planetName]);

  const planetInfo = planetsData[planetName];

  if (!planetInfo) {
    return <p>Planet information not available.</p>;
  }

  return (
    <div style={detailsPageStyle}>
      <h1>{planetInfo.name}</h1>
      <img src={planetInfo.image} alt={planetInfo.name} style={imageStyle} />
      <p>{planetInfo.description}</p>

      {realTimeData ? (
        <div>
          <h3>Real-Time Data:</h3>
          <p>Temperature: {realTimeData.temperature}°C</p>
          <p>Distance from Sun: {realTimeData.distanceFromSun} km</p>
          {/* Add more real-time data as needed */}
        </div>
      ) : (
        <p>Loading real-time data...</p>
      )}
    </div>
  );
};

// Basic styles for the details page
const detailsPageStyle = {
  textAlign: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const imageStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  marginBottom: "20px",
};

export default PlanetDetails;
