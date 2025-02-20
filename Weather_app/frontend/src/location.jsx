import React, { useEffect } from "react";

const LocationWeather = ({ onLocationFound }) => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Call your backend API
            const response = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
            const data = await response.json();

            if (response.ok) {
              onLocationFound(data);
            } else {
              console.error("Error from backend:", data.error);
            }
          } catch (error) {
            console.error("Error calling backend:", error);
          }
        },
        (error) => {
          console.error("Location access denied or unavailable:", error);
        }
      );
    }
  }, []);

  return null;
};

export default LocationWeather;
