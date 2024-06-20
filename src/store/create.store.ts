import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // objects: objectsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
