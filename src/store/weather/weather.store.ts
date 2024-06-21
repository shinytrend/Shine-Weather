import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { groupCities } from "@utils/group-cities";

interface IStoreState {
  weatherData: any;
}

const initialState = {
  entities: [],
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
    weatherUpdated: (state, action) => {
      state.entities = action.payload;
    },
    weatherFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: weatherDataReducer, actions } = weatherDataSlice;
const { weatherRequested, weatherReceived, weatherUpdated, weatherFailed } =
  actions;

export const loadWeatherData =
  (selectedCities: string[]) => async (dispatch: Dispatch) => {
    dispatch(weatherRequested());
    try {
      const groupedCities = await groupCities(selectedCities);

      dispatch(weatherReceived(groupedCities));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherFailed(error.message));
      }
    }
  };

export const updateWeatherData =
  (selectedCity: string) => async (dispatch: Dispatch) => {
    try {
      const selectedCities = () => {
        const storedCities = localStorage.getItem("selected-cities");
        return storedCities ? JSON.parse(storedCities) : [];
      };

      function getFirstWordBeforeComma(str: string) {
        let commaIndex = str.indexOf(",");

        if (commaIndex !== -1) {
          return str.substring(0, commaIndex).split(" ")[0];
        } else {
          return str.split(" ")[0];
        }
      }

      const onlyCity = getFirstWordBeforeComma(selectedCity);
      const isDuplicated = selectedCities().includes(onlyCity);

      if (!isDuplicated) {
        const newSelectedCities = [...selectedCities(), selectedCity];
        localStorage.setItem(
          "selected-cities",
          JSON.stringify(newSelectedCities)
        );

        const groupedCities = await groupCities(newSelectedCities);
        dispatch(weatherUpdated(groupedCities));
      } else {
        console.log("Selected city is already in the list.");
        throw new Error("Этот город уже есть в списке, выберите другой");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherFailed(error));
      }
      throw error;
    }
  };

export const getWeatherData = () => (state: IStoreState) =>
  state.weatherData.entities;

export default weatherDataReducer;
