import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./weather/weather-data.store";
import selectedCityReducer from "./weather/selected-city.store";

const rootReducer = combineReducers({
  weatherData: weatherDataReducer,
  selectedCity: selectedCityReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
