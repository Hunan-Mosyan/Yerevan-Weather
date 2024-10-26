import React from 'react';

const WeatherCard = ({ day, icon, tempMax, tempMin }) => (
  <div className="weather-card">
    <h3>{day}</h3>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="
Weather icon" />
    <p>Max: {tempMax}°C</p>
    <p>Min: {tempMin}°C</p>
  </div>
);

export default WeatherCard;