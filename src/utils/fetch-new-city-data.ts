import axios from "axios";
import configFile from "@config/config.json";
import { Dispatch } from "@reduxjs/toolkit";
import { createdCityFailed } from "@store/weather/weather.store";

const API_KEY = configFile.api_key_weatherapi;
const BASE_URL = configFile.base_url_weatherapi;

export function fetchNewCityData(newCity: string, dispatch: Dispatch) {
  return axios(`${BASE_URL}?key=${API_KEY}&q=${newCity}&aqi=no`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      dispatch(createdCityFailed());
      console.error("Error fetching city data", error);
      throw new Error(
        "Данные по этому городу не найдены, выберите другой город"
      );
    });
}
