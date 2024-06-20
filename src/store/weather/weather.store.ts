import { Dispatch, createSlice } from "@reduxjs/toolkit";

const API_KEY = "bd44a36bd5174b1f87c161005242006";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

// interface IWeatherStoreInitialState {
//   entities: IMeeting[];
//   isLoading: boolean;
//   error: any;
//   isLoggedIn: boolean;
//   dataLoaded: boolean;
//   lastFetch: string | null;
// }

interface IStoreState {
  weatherData: any;
}

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

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

export const loadWeatherData = () => async (dispatch: Dispatch) => {
  dispatch(weatherRequested());
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=Boston&aqi=no`);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    dispatch(weatherReceived(data));
  } catch (error) {
    dispatch(weatherFailed(error.message));
  }
};

export const getWeatherData = () => (state: IStoreState) =>
  state.weatherData.entities;

export default weatherDataReducer;
