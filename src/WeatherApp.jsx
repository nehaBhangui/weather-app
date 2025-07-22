import { useState, useEffect } from "react";

function WeatherApp() {
  const [city, setCity] = useState("Goa");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "42b33473b3a9d79c8ce639347e11fb77"; // 🔥 Replace with your API key

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found 😢");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []); // Fetch Goa weather by default on mount

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        padding: "20px",
        border: "2px solid #e91e63",
        borderRadius: "15px",
        maxWidth: "400px",
        margin: "50px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}
    >
      <h2>🌤 Weather App</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "70%",
          marginBottom: "10px"
        }}
      />
      <br />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#00bcd4",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Search
      </button>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            📍 {weather.name}, {weather.sys.country}
          </h3>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
