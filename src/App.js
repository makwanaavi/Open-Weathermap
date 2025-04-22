import React, { useState } from "react";
import "./App.css";

const API_KEY = "2ca89520240689f7d741929ded81167a"; // Your OpenWeatherMap API Key

function App() {
  const [city, setCity] = useState("");       // User input
  const [weather, setWeather] = useState(null); // Weather data
  const [error, setError] = useState("");     // Error message

  // Fetch weather data from API
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError("City not found");
      }
    } catch {
      setError("Failed to fetch weather");
    }
  };

  // When Enter key is pressed in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1 className="app-title">Weather Forecast</h1>

        {/* Input + Button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Search
          </button>
        </div>

        {/* Show error if exists */}
        {error && <p className="error-message">{error}</p>}

        {/* Show weather info if available */}
        {weather && (
          <div className="weather-info">
            {/* Location */}
            <div className="location">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <p className="coordinates">
                {weather.coord.lat}°N, {weather.coord.lon}°E
              </p>
            </div>

            {/* Temperature & Description */}
            <div className="current-weather">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
            </div>

            {/* More Weather Details */}
            <div className="weather-details">
              <div className="detail-item">
                <span>Feels Like</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>Wind</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
