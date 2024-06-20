import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./weather/weather.store";

const rootReducer = combineReducers({
  weatherData: weatherDataReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
