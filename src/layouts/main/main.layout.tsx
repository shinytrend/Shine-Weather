import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// store
import {
  getWeatherData,
  updateWeatherData
} from "@store/weather/weather.store";
// components
import DateAndTime from "./components/date-and-time";
// styles
import { ContainerStyled } from "@styles/container-styled";
// forms
import SearchCityForm from "@forms/search-city.form";
import { Box, Paper, Typography, styled } from "@mui/material";
import CityCard from "@components/UI/city-card/city-card";

const MainLayoutInitialState = {
  selectedCity: ""
};

const MainLayout: FC = memo(() => {
  const dispatch = useDispatch();
  const weatherData = useSelector(getWeatherData());
  console.log("weatherData", weatherData);

  const { register, watch, setValue, handleSubmit, reset } = useForm({
    defaultValues: MainLayoutInitialState,
    mode: "onChange"
  });

  const selectedCity = watch("selectedCity");

  const onSubmit = () => {
    if (selectedCity) {
      dispatch<any>(updateWeatherData(selectedCity))
        .then(() => {
          toast.success("Город успешно добавлен!");
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        })
        .finally(() => {
          reset();
          setValue("selectedCity", "Выберите другой город");
        });
    }
  };

  return (
    <ContainerStyled>
      <SearchCityForm
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <DateAndTime margin="0 0 20px 0" />
      <Box sx={{ display: "flex", gap: "12px" }}>
        {Object.keys(weatherData)?.map((city) => {
          return <CityCard city={city} key={city} />;
        })}
      </Box>
    </ContainerStyled>
  );
});

export default MainLayout;
