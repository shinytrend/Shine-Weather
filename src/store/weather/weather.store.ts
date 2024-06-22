import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getStorageCities } from "@utils/get-storage-cities";
import { getFirstWordBeforeComma } from "@utils/get-first-word-before-comma";
import { getCitiesList } from "@utils/get-cities-list";
import { fetchNewCityData } from "@utils/fetch-new-city-data";

interface WeatherData {
  [key: string]: {
    location: any;
    current: any;
  };
}

interface IStoreState {
  weatherData: {
    entities: WeatherData;
    isLoading: boolean;
    isCreatedLoading: boolean;
    error: string | null;
  };
}

const initialState = {
  entities: {},
  isLoading: false,
  isCreatedLoading: false,
  error: null
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    weatherDataRequested: (state) => {
      state.isLoading = true;
    },
    weatherDataReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    weatherDataFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createdCityRequested: (state) => {
      state.isCreatedLoading = true;
    },
    createdCity: (state, action) => {
      const { newCityData, searchedCity } = action.payload;
      state.entities[searchedCity] = newCityData;
      state.isCreatedLoading = false;
    },
    deletedCity: (state, action) => {
      const updatedEntities = { ...state.entities };
      delete updatedEntities[action.payload];
      state.entities = updatedEntities;
    },
    removedAllWeatherData: (state) => {
      state.entities = {};
    }
  }
});

const { reducer: weatherDataReducer, actions } = weatherDataSlice;
const {
  weatherDataRequested,
  weatherDataReceived,
  createdCity,
  weatherDataFailed,
  deletedCity,
  removedAllWeatherData,
  createdCityRequested
} = actions;

export const loadWeatherData =
  (selectedCities: string[]) => async (dispatch: Dispatch) => {
    dispatch(weatherDataRequested());
    try {
      const groupedCities = await getCitiesList(selectedCities);
      dispatch(weatherDataReceived(groupedCities));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error.message));
      }
    }
  };

export const createWeatherData =
  (searchedCity: string) => async (dispatch: Dispatch) => {
    dispatch(createdCityRequested());
    try {
      const newCity = getFirstWordBeforeComma(searchedCity);

      const isDuplicated = getStorageCities().includes(newCity);
      if (isDuplicated) {
        throw new Error("Этот город уже есть в списке, выберите другой");
      }

      const newCityData = await fetchNewCityData(newCity);
      if (!newCityData) {
        return;
      }

      const newSelectedCities = [...getStorageCities(), searchedCity];
      localStorage.setItem(
        "selected-cities",
        JSON.stringify(newSelectedCities)
      );

      dispatch(createdCity({ newCityData, searchedCity }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error));
      }
      throw error;
    }
  };

export const deleteCityFromWeatherData =
  (selectedCity: string) => async (dispatch: Dispatch) => {
    try {
      const storageCitiesList = getStorageCities().filter(
        (city: string) => city !== selectedCity
      );
      localStorage.setItem(
        "selected-cities",
        JSON.stringify(storageCitiesList)
      );

      dispatch(deletedCity(selectedCity));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error));
      }
      throw error;
    }
  };

export const clearWeatherData = () => async (dispatch: Dispatch) => {
  try {
    localStorage.setItem("selected-cities", "");
    dispatch(removedAllWeatherData());
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(weatherDataFailed(error));
    }
    throw error;
  }
};

export const getWeatherData = () => (state: IStoreState) =>
  state.weatherData.entities;

export const getWeatherDataLoadingStatus = () => (state: IStoreState) =>
  state.weatherData.isLoading;

export const getCreateCityLoadingStatus = () => (state: IStoreState) =>
  state.weatherData.isCreatedLoading;

export default weatherDataReducer;
