import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './Services'
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData('Yerevan');
      setWeatherData(data);
    };
    fetchData();
  }, []);

  if (!weatherData) return <p>Loading...</p>;

  const dailyData = weatherData.list.filter((_, index) => index % 8 === 0);

  const getHourlyDataForDay = (day) => {
    return weatherData.list.filter(item => item.dt_txt.startsWith(day));
  };

  return (
    <div className="app">
      <h1>5 day forecast for Yerevan</h1>
      <div className="forecast">
        {dailyData.map((day, index) => (
          <div
            key={index}
            onClick={() => setSelectedDay(day.dt_txt.split(' ')[0])} 
            className="forecast-day"
          >
            <h3>{new Date(day.dt_txt).toLocaleDateString('en-En', { weekday: 'short' })}</h3>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Иконка погоды" />
            <p>Max: {day.main.temp_max}°C</p>
            <p>Min: {day.main.temp_min}°C</p>
          </div>
        ))}
      </div>

      {/* Почасовой прогноз */}
      {selectedDay && (
        <div className="hourly-forecast">
          <h2>Hourly forecast in {new Date(selectedDay).toLocaleDateString('en-En')}</h2>
          <button className='custom-button' onClick={() => setSelectedDay(null)}>Back</button>
          <div className="hourly-details">
            {getHourlyDataForDay(selectedDay).map((hour, index) => (
              <div key={index} className="hourly-item">
                <p>{new Date(hour.dt_txt).toLocaleTimeString('en-En', { hour: '2-digit', minute: '2-digit' })}</p>
                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="
Weather icon" />
                <p>{hour.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
