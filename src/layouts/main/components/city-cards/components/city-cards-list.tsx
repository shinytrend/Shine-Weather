import { FC, memo } from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import configFile from "@config/config.json";
// store
import { getWeatherData } from "@store/weather/weather.store";
// components
import CityCard from "@components/UI/city-card/city-card";
import CityCardSM from "@components/UI/city-card/variants/SM/city-card-sm";
import CityCardMD from "@components/UI/city-card/variants/MD/city-card-md";
import CityCardXS from "@components/UI/city-card/variants/XS/city-card-xs";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// hooks
import useWindowWidth from "@hooks/window/use-window-width";

const CardsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding-bottom: 70px;
`;

const MOBILE_WIDTH = configFile.mobile_width;

const CityCardsList: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);

  const screenWidth = useWindowWidth();

  return (
    <CardsContainer
      sx={{
        flexDirection: isMobileScreen ? "column" : "row",
        gap: isMobileScreen ? "0" : "8px"
      }}
    >
      {Object.keys(weatherData)?.map((city) => {
        if (!isMobileScreen) {
          return <CityCard city={city} key={city} />;
        }
        if (screenWidth <= 1024 && screenWidth >= 700) {
          return <CityCardMD city={city} key={city} />;
        }
        if (screenWidth <= 699 && screenWidth >= 500) {
          return <CityCardSM city={city} key={city} />;
        }
        if (screenWidth < 499) {
          return <CityCardXS city={city} key={city} />;
        }
      })}
    </CardsContainer>
  );
};

export default memo(CityCardsList);
