import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanetPage = () => {
  const { planetName } = useParams();  // Getting planet name from the URL
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${planetName}&media_type=image`
        );

        if (response.data.collection.items.length > 0) {
          setImageData(response.data.collection.items[0]);  // Grab first image result
        } else {
          setError("No images available for this planet.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching data: " + err.message);
        setLoading(false);
      }
    };

    fetchImageData();
  }, [planetName]);

  const planetsInfo = {
    Mercury: {
      name: "Mercury",
      semiMajorAxis: 8,
      semiMinorAxis: 6.4,
      color: "gray",
      orbitSpeed: 4.15,
      size: "4,880 km",
      distance: "57.9 million km",
      description: "Mercury is the closest planet to the Sun and has a very thin atmosphere."
    },
    Venus: {
      name: "Venus",
      semiMajorAxis: 12,
      semiMinorAxis: 10.3,
      color: "orange",
      orbitSpeed: 1.62,
      size: "12,104 km",
      distance: "108.2 million km",
      description: "Venus is known for its thick, toxic atmosphere and high surface temperatures."
    },
    Earth: {
      name: "Earth",
      semiMajorAxis: 15,
      semiMinorAxis: 13.5,
      color: "blue",
      orbitSpeed: 1.0,
      size: "12,742 km",
      distance: "149.6 million km",
      description: "Earth is the only planet known to support life, with water covering 70% of its surface."
    },
    Mars: {
      name: "Mars",
      semiMajorAxis: 20,
      semiMinorAxis: 17.5,
      color: "red",
      orbitSpeed: 0.53,
      size: "6,779 km",
      distance: "227.9 million km",
      description: "Mars is known as the Red Planet, with a thin atmosphere and surface features resembling Earth."
    },
    Jupiter: {
      name: "Jupiter",
      semiMajorAxis: 40,
      semiMinorAxis: 35,
      color: "brown",
      orbitSpeed: 0.08,
      size: "139,820 km",
      distance: "778.5 million km",
      description: "Jupiter is the largest planet in the solar system and has a strong magnetic field."
    },
    Saturn: {
      name: "Saturn",
      semiMajorAxis: 55,
      semiMinorAxis: 49,
      color: "goldenrod",
      orbitSpeed: 0.03,
      size: "116,460 km",
      distance: "1.4 billion km",
      description: "Saturn is known for its extensive ring system made of ice and rock particles."
    },
    Uranus: {
      name: "Uranus",
      semiMajorAxis: 70,
      semiMinorAxis: 62,
      color: "lightblue",
      orbitSpeed: 0.011,
      size: "50,724 km",
      distance: "2.9 billion km",
      description: "Uranus is tilted on its side and has a faint ring system and 27 known moons."
    },
    Neptune: {
      name: "Neptune",
      semiMajorAxis: 85,
      semiMinorAxis: 76,
      color: "darkblue",
      orbitSpeed: 0.006,
      size: "49,244 km",
      distance: "4.5 billion km",
      description: "Neptune is known for its intense blue color and the fastest winds in the solar system."
    }

  };

  if (loading) {
    return <div style={{ textAlign: 'center', paddingTop: '20px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', paddingTop: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
      <h1>{planetName}</h1>
      {imageData ? (
        <div>
          <img
            src={imageData.links[0].href}
            alt={planetName}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
          <p>{imageData.data[0].description}</p>
        </div>
      ) : (
        <p>No images available.</p>
      )}
      <h2>Planet Information</h2>
      {planetsInfo[planetName] ? (
        <>
          <p>Size: {planetsInfo[planetName].size}</p>
          <p>Distance from Sun: {planetsInfo[planetName].distance}</p>
          <p>{planetsInfo[planetName].description}</p>
        </>
      ) : (
        <p>No additional data available for {planetName}.</p>
      )}
    </div>
  );
};

export default PlanetPage;
