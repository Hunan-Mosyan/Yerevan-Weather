const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '201a576cf463fd6b1780e1de9ca983ff '; 

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Error while retrieving weather data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


