import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import LocationWeather from "./location";
import React, { useState } from 'react';

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Loading...",
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const handleLocationFound = (weatherData) => {
    setWeatherInfo(weatherData);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weather App</h2>
      <LocationWeather onLocationFound={handleLocationFound} />
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}