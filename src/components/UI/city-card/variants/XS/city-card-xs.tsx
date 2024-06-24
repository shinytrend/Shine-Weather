import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import CityTemperature from "../../components/city-temperature";
import CityCardContentXS from "./city-card-content-xs";
import SwipeContainer from "@components/common/swipe-container/swipe-container";
// store
import { getWeatherData } from "@store/weather/weather-data.store";

interface Props {
  city: string;
}

const Title = styled(Typography)`
  text-align: center;
`;

const LeftSide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightSide = styled(Box)`
  display: flex;
`;

const Condition = styled("img")({
  width: "90px",
  height: "auto"
});

const CityCardXS: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const dataCurrent = weatherData[city].current;
  const { condition } = dataCurrent;
  const { icon: conditionIcon, text: conditionText } = condition;

  return (
    <SwipeContainer city={city}>
      <Box>
        <LeftSide>
          <Title variant="h4">{city}</Title>
          <CityTemperature city={city} />
          <Condition src={conditionIcon} alt={conditionText} />
        </LeftSide>
        <RightSide>
          <CityCardContentXS city={city} />
        </RightSide>
      </Box>
    </SwipeContainer>
  );
};

export default CityCardXS;
