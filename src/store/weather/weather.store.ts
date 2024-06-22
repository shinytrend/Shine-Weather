import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { groupCities } from "@utils/group-cities";
import { getStorageCities } from "@utils/get-storage-cities";
import { getFirstWordBeforeComma } from "@utils/get-first-word-before-comma";

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
    error: string | null;
  };
}

const initialState = {
  entities: {},
  isLoading: true,
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
    weatherDataUpdated: (state, action) => {
      state.entities = action.payload;
    },
    weatherDataFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeAllWeatherData: (state) => {
      state.entities = {};
    },
    deleteCity: (state, action) => {
      const updatedEntities = { ...state.entities };
      delete updatedEntities[action.payload];
      state.entities = updatedEntities;
    }
  }
});

const { reducer: weatherDataReducer, actions } = weatherDataSlice;
const {
  weatherDataRequested,
  weatherDataReceived,
  weatherDataUpdated,
  weatherDataFailed,
  deleteCity,
  removeAllWeatherData
} = actions;

export const loadWeatherData =
  (selectedCities: string[]) => async (dispatch: Dispatch) => {
    dispatch(weatherDataRequested());
    try {
      const groupedCities = await groupCities(selectedCities);
      dispatch(weatherDataReceived(groupedCities));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherDataFailed(error.message));
      }
    }
  };

export const updateWeatherData =
  (selectedCity: string) => async (dispatch: Dispatch) => {
    try {
      const onlyCity = getFirstWordBeforeComma(selectedCity);
      const isDuplicated = getStorageCities().includes(onlyCity);

      if (!isDuplicated) {
        const newSelectedCities = [...getStorageCities(), selectedCity];
        localStorage.setItem(
          "selected-cities",
          JSON.stringify(newSelectedCities)
        );

        const groupedCities = await groupCities(newSelectedCities);
        dispatch(weatherDataUpdated(groupedCities));
      } else {
        throw new Error("Этот город уже есть в списке, выберите другой");
      }
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
      dispatch(deleteCity(selectedCity));
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
    dispatch(removeAllWeatherData({}));
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

export default weatherDataReducer;
