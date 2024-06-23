import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface IStoreState {
  selectedCity: {
    entities: string;
    isLoading: boolean;
    isSelectedLoading: boolean;
    error: string | null;
  };
}

const initialState = {
  entities: "",
  isLoading: false,
  error: null
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState,
  reducers: {
    selectedCityRequested: (state) => {
      state.isLoading = true;
    },
    selectedCityReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    selectedCityFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectCitySuccesses: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: selectedCityReducer, actions } = selectedCitySlice;
export const {
  selectedCityRequested,
  selectedCityReceived,
  selectedCityFailed,
  selectCitySuccesses
} = actions;

export const loadSelectedCity = () => (dispatch: Dispatch) => {
  dispatch(selectedCityRequested());
  try {
    const selectedCity = localStorage.getItem("selected-city");
    dispatch(selectedCityReceived(selectedCity));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(selectedCityFailed(error.message));
    }
  }
};

export const selectCity = (city: string) => (dispatch: Dispatch) => {
  localStorage.setItem("selected-city", city);
  dispatch(selectCitySuccesses(city));
};

export const getSelectedCity = () => (state: IStoreState) =>
  state.selectedCity.entities;

export default selectedCityReducer;
