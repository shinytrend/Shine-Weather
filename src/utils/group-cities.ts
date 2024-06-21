import configFile from "@config/config.json";
import axios from "axios";

const API_KEY = configFile.api_key_weatherapi;
const BASE_URL = configFile.base_url_weatherapi;

export async function groupCities(selectedCities: string[]) {
  const citiesData = await Promise.all(
    selectedCities.map(async (city) => {
      const { data } = await axios(
        `${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      return { [city]: data };
    })
  );

  const groupedCities = citiesData.reduce((acc, cityData) => {
    const cityName = Object.keys(cityData)[0];
    acc[cityName] = cityData[cityName];
    return acc;
  }, {});

  return groupedCities;
}
