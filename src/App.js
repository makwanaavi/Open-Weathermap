import React, { useState } from "react";
import "./App.css";

const API_KEY = "2ca89520240689f7d741929ded81167a"; // replace this with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1 className="app-title">Weather Forecast</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Search
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="location">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <p className="coordinates">
                {weather.coord.lat}°N, {weather.coord.lon}°E
              </p>
            </div>
            
            <div className="current-weather">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
            </div>

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