import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import configFile from "@config/config.json";
// store
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather.store";
// components
import EmptySelectTitle from "../empty-select-title";
import CitiesCardsInBox from "./components/city-cards-list";
import CityCardsSlider from "./components/city-cards-slider";
import CityCardsList from "./components/city-cards-list";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC } from "react";

const MOBILE_WIDTH = configFile.mobile_width;

const CityCards: FC = () => {
  const weatherData = useSelector(getWeatherData());
  console.log("weatherData", weatherData);

  const citiesLength = Object.keys(weatherData).length;

  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);

  return (
    !isWeatherDataLoading &&
    (citiesLength ? (
      isMobileScreen ? (
        <CityCardsList />
      ) : citiesLength < 4 ? (
        <CitiesCardsInBox />
      ) : (
        <CityCardsSlider />
      )
    ) : (
      <EmptySelectTitle />
    ))
  );
};

export default CityCards;
