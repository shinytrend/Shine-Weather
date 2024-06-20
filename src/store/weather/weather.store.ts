import axios from "axios";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import configFile from "@config/config.json";

interface IStoreState {
  weatherData: any;
}

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

const API_KEY = configFile.api_key_weatherapi;
const BASE_URL = configFile.base_url_weatherapi;

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    weatherRequested: (state) => {
      state.isLoading = true;
    },
    weatherReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    weatherFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: weatherDataReducer, actions } = weatherDataSlice;
const { weatherRequested, weatherReceived, weatherFailed } = actions;

export const loadWeatherData =
  (selectedCities: string[]) => async (dispatch: Dispatch) => {
    dispatch(weatherRequested());
    try {
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

      dispatch(weatherReceived(groupedCities));
    } catch (error) {
      dispatch(weatherFailed(error.message));
    }
  };

export const getWeatherData = () => (state: IStoreState) =>
  state.weatherData.entities;

export default weatherDataReducer;
