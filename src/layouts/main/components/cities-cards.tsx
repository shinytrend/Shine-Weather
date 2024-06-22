import { FC } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
// store
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather.store";
// components
import CityCard from "@components/UI/city-card/city-card";
import EmptySelectTitle from "./empty-select-title";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// icons
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Component = styled(Box)`
  padding: 0px 40px;
`;

const CardsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 44%;
  color: green !important;
  &:hover {
    color: blue !important;
  }
`;

export const SampleNextArrow: FC<any> = ({ onClick }) => {
  return (
    <StyledIconButton style={{ right: -30 }} onClick={onClick}>
      <ArrowForwardIosOutlinedIcon />
    </StyledIconButton>
  );
};

export const SamplePrevArrow: FC<any> = ({ onClick }) => {
  return (
    <StyledIconButton style={{ left: -50 }} onClick={onClick}>
      <ArrowBackIosNewOutlinedIcon />
    </StyledIconButton>
  );
};
const CitiesCards = () => {
  const weatherData = useSelector(getWeatherData());
  const citiesLength = Object.keys(weatherData).length;
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    !isWeatherDataLoading &&
    (citiesLength ? (
      <Component>
        {citiesLength < 4 ? (
          <CardsContainer>
            {Object.keys(weatherData)?.map((city) => {
              return <CityCard city={city} key={city} />;
            })}
          </CardsContainer>
        ) : (
          <Slider {...settings}>
            {Object.keys(weatherData)?.map((city) => {
              return <CityCard city={city} key={city} />;
            })}
          </Slider>
        )}
      </Component>
    ) : (
      <EmptySelectTitle />
    ))
  );
};

export default CitiesCards;
