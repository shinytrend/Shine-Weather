import { FC, memo, useState, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
// store
import { getWeatherData } from "@store/weather/weather-data.store";
// components
import CityCard from "@components/UI/city-card/city-card";
import SliderArrowPrev from "./components/slider-arrow-prev";
import SliderArrowNext from "./components/slider-arrow-next";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Component = styled(Box)`
  padding: 0 20px 0 20px;
`;

const CityCardsSlider: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const [isDragging, setIsDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleAfterChange = useCallback(() => {
    setIsDragging(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <SliderArrowNext
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <SliderArrowPrev
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange
  };

  return (
    <Component>
      <Slider {...settings}>
        {Object.keys(weatherData)?.map((city) => {
          return <CityCard city={city} key={city} isDragging={isDragging} />;
        })}
      </Slider>
    </Component>
  );
};

export default memo(CityCardsSlider);
