import configFile from "@config/config.json";
import axios from "axios";

const API_KEY = configFile.api_key_weatherapi;
const CURRENT_URL = configFile.current_url_weatherapi;
const ASTRONOMY_URL = configFile.astronomy_url_weatherapi;
const FORECAST_URL = configFile.forecast_url_weatherapi;

export async function fetchWeatherData(selectedCities: string[]) {
  const weatherData = await Promise.all(
    selectedCities.map(async (city) => {
      const { data: current } = await axios(
        `${CURRENT_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      const currentData = current;

      const { data: astronomy } = await axios(
        `${ASTRONOMY_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      const astronomyData = astronomy.astronomy;

      const { data: forecast } = await axios(
        `${FORECAST_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      const forecastData = forecast.forecast;

      const result = {
        ...currentData,
        ...astronomyData,
        hour: forecastData.forecastday[0].hour
      };

      return { [city]: result };
    })
  );

  const groupedCities = weatherData.reduce((acc, cityData) => {
    const cityName = Object.keys(cityData)[0];
    acc[cityName] = cityData[cityName];
    return acc;
  }, {});

  return groupedCities;
}
