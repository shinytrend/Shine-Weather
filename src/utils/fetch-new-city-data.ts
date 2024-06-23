import axios from "axios";
import configFile from "@config/config.json";

const API_KEY = configFile.api_key_weatherapi;
const CURRENT_URL = configFile.current_url_weatherapi;
const ASTRONOMY_URL = configFile.astronomy_url_weatherapi;
const FORECAST_URL = configFile.forecast_url_weatherapi;

export async function fetchNewCityData(newCity: string) {
  const { data: current } = await axios(
    `${CURRENT_URL}?key=${API_KEY}&q=${newCity}&aqi=no`
  );
  const currentData = current;

  const { data: astronomy } = await axios(
    `${ASTRONOMY_URL}?key=${API_KEY}&q=${newCity}&aqi=no`
  );
  const astronomyData = astronomy.astronomy;

  const { data: forecast } = await axios(
    `${FORECAST_URL}?key=${API_KEY}&q=${newCity}&aqi=no`
  );
  const forecastData = forecast.forecast;

  const result = {
    ...currentData,
    ...astronomyData,
    hour: forecastData.forecastday[0].hour
  };

  return result;
}
