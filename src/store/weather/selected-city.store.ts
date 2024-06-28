import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

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
  error: ""
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState,
  reducers: {
    selectedCityRequested: (state) => {
      state.isLoading = true;
    },
    selectedCityReceived: (state, action: PayloadAction<string>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    selectedCityFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectCitySuccesses: (state, action: PayloadAction<string>) => {
      state.entities = action.payload;
    },
    clearSelectCity: (state) => {
      state.entities = "";
    }
  }
});

const { reducer: selectedCityReducer, actions } = selectedCitySlice;
export const {
  selectedCityRequested,
  selectedCityReceived,
  selectedCityFailed,
  selectCitySuccesses,
  clearSelectCity
} = actions;

export const loadSelectedCity = () => (dispatch: Dispatch) => {
  dispatch(selectedCityRequested());
  try {
    const selectedCity = localStorage.getItem("selected-city");
    if (selectedCity) {
      dispatch(selectedCityReceived(selectedCity));
    }
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

export const clearSelectedCity = () => (dispatch: Dispatch) => {
  localStorage.setItem("selected-city", "");
  dispatch(clearSelectCity());
};
export default selectedCityReducer;
