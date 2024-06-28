import { Box, useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import configFile from "@config/config.json";
import { useSelector } from "react-redux";
// store
import {
  clearWeatherData,
  createNewCity,
  getCreateCityLoadingStatus,
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
// components
import DateAndTime from "./components/date-and-time";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import CityCards from "./components/city-cards";
// forms
import SearchCityForm from "@forms/search-city-form/search-city.form";
// hooks
import useRemoveItem from "@hooks/item/use-remove-item";
import { useAppDispatch } from "@hooks/redux/redux-hooks";

const MainLayoutInitialState = {
  selectedCity: ""
};

const MOBILE_WIDTH = configFile.mobile_width;

const WeatherBlock = () => {
  const dispatch = useAppDispatch();
  const weatherData = useSelector(getWeatherData());
  const citiesLength = Object.keys(weatherData).length;

  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());
  const isCreateCityLoading = useSelector(getCreateCityLoadingStatus());
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);

  const { register, watch, setValue, handleSubmit, reset } = useForm({
    defaultValues: MainLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();
  const selectedCity = watch("selectedCity");

  const {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  } = useRemoveItem({
    onRemove: clearWeatherData(),
    successMessage: "Города успешно удалены!"
  });

  const onSubmit = () => {
    if (selectedCity) {
      dispatch(createNewCity(selectedCity))
        .then(() => {
          toast.success(`Город ${selectedCity} успешно добавлен!`);
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        })
        .finally(() => {
          reset(MainLayoutInitialState);
        });
    }
  };
  return (
    <Box
      sx={{
        marginBottom: citiesLength < 4 ? "0px" : isMobileScreen ? 0 : "34px"
      }}
    >
      <Box
        sx={{
          margin: isMobileScreen ? "0 -6px" : "inherit",
          paddingTop: isMobileScreen ? "20px" : 0,
          position: isMobileScreen ? "sticky" : "static",
          top: isMobileScreen ? 0 : "auto",
          zIndex: isMobileScreen ? 1000 : "auto",
          backgroundColor: isMobileScreen ? "white" : "transparent"
        }}
      >
        <SearchCityForm
          data={data}
          register={register}
          setValue={setValue}
          onSubmit={onSubmit}
          onClear={handleOpenConfirm}
          handleSubmit={handleSubmit}
        />
        <DateAndTime margin="0 0 20px 0" />
      </Box>
      <CityCards />

      <DialogConfirm
        question="Вы уверены, что хотите удалить все выбранные города?"
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccessClick={() => handleRemoveItem()}
      />
      <LoaderFullWindow
        color="green"
        size={75}
        isLoading={isCreateCityLoading || isWeatherDataLoading}
      />
    </Box>
  );
};

export default WeatherBlock;
