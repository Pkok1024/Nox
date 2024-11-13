/** @format */

import axios from 'axios';

const fetchWeather = async daerah => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: daerah,
          units: 'metric',
          appid: '060a6bcfa19809c2cd4d97a212b19273',
        },
      }
    );

    const json = response.data;

    if (json.cod !== 200) {
      throw json;
    }

    return {
      location: json.name,
      country: json.sys.country,
      weather: json.weather[0].description,
      currentTemperature: `${json.main.temp} °C`,
      maxTemperature: `${json.main.temp_max} °C`,
      minTemperature: `${json.main.temp_min} °C`,
      humidity: `${json.main.humidity} %`,
      windSpeed: `${json.wind.speed} km/h`,
    };
  } catch (error) {
    throw 'Location not found';
  }
};

export default fetchWeather;
