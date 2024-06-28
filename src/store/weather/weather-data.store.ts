import { IWeatherData } from "@interfaces/weather-data-interface";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "@hooks/redux/redux-hooks";
import { clearSelectedCity, selectCity } from "./selected-city.store";
// utils
import { getFirstWordBeforeComma } from "@utils/get-first-word-before-comma";
import { getStorageCities } from "@utils/get-storage-cities";
import { fetchNewCityData } from "@utils/fetch-new-city-data";
import { fetchWeatherData } from "@utils/fetch-weather-data";

interface IStoreState {
  weatherData: {
    entities: IWeatherData;
    isLoading: boolean;
    isCreatedLoading: boolean;
    error: string | null;
  };
}

const initialState = {
  entities: {},
  isLoading: false,
  isCreatedLoading: false,
  error: ""
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    weatherDataRequested: (state) => {
      state.isLoading = true;
    },
    weatherDataReceived: (state, action: PayloadAction<IWeatherData>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    weatherDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createdCityRequested: (state) => {
      state.isCreatedLoading = true;
    },
    createdCityFailed: (state) => {
      state.isCreatedLoading = false;
    },
    createdCity: (
      state,
      action: PayloadAction<{ newCityData: IWeatherData; searchedCity: string }>
    ) => {
      const { newCityData, searchedCity } = action.payload;
      const entities: { [key: string | number]: IWeatherData } = state.entities;
      entities[searchedCity] = newCityData;
      state.isCreatedLoading = false;
    },
    deletedCity: (state, action: PayloadAction<string>) => {
      const updatedEntities: IWeatherData = { ...state.entities };
      delete updatedEntities[action.payload];
      state.entities = updatedEntities;
    },
    removedAllWeatherData: (state) => {
      state.entities = {};
    }
  }
});

const { reducer: weatherDataReducer, actions } = weatherDataSlice;
export const {
  weatherDataRequested,
  weatherDataReceived,
  createdCity,
  weatherDataFailed,
  deletedCity,
  removedAllWeatherData,
  createdCityRequested,
  createdCityFailed
} = actions;

export const loadWeatherData =
  (selectedCities: string[]) => async (dispatch: Dispatch) => {
    dispatch(weatherDataRequested());
    try {
      const weatherData = await fetchWeatherData(selectedCities);
      dispatch(weatherDataReceived(weatherData));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error.message));
      }
    }
  };

export const createNewCity =
  (searchedCity: string) => async (dispatch: Dispatch) => {
    const dispatchApp = useAppDispatch();
    dispatch(createdCityRequested());
    try {
      const newCity = getFirstWordBeforeComma(searchedCity);

      const isDuplicated = getStorageCities().includes(newCity);
      if (isDuplicated) {
        dispatch(createdCityFailed());
        throw new Error("Этот город уже есть в списке, выберите другой");
      }

      const newCityData = await fetchNewCityData(newCity);

      const newSelectedCities = [...getStorageCities(), searchedCity];
      localStorage.setItem(
        "selected-cities",
        JSON.stringify(newSelectedCities)
      );

      const storageCity = localStorage.getItem("selected-city");

      if (!storageCity?.length) {
        dispatchApp(selectCity(newCity));
      }

      dispatch(createdCity({ newCityData, searchedCity }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error.message));
      }
      throw error;
    }
  };

export const deleteCityFromWeatherData =
  (selectedCity: string) => async (dispatch: Dispatch) => {
    const dispatchApp = useAppDispatch();
    try {
      const storageCitiesList = getStorageCities().filter(
        (city: string) => city !== selectedCity
      );

      if (storageCitiesList.length) {
        dispatchApp(selectCity(storageCitiesList[0]));
      } else {
        dispatchApp(clearSelectedCity());
      }

      localStorage.setItem(
        "selected-cities",
        JSON.stringify(storageCitiesList)
      );

      dispatch(deletedCity(selectedCity));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error.message));
      }
      throw error;
    }
  };

export const clearWeatherData = () => async (dispatch: Dispatch) => {
  const dispatchApp = useAppDispatch();
  try {
    localStorage.setItem("selected-cities", "");
    dispatch(removedAllWeatherData());
    dispatchApp(clearSelectedCity());
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(weatherDataFailed(error.message));
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
