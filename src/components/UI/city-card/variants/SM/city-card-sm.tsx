import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, styled } from "@mui/material";
// components
import CityCardDeleteIcon from "../../components/city-card-delete-icon";
import CityTemperature from "../../components/city-temperature";
import CityCardContentSM from "./city-card-content-sm";
// store
import { getWeatherData } from "@store/weather/weather.store";
// utils
import { getBackgroundColor } from "@utils/get-background-card-color";

interface Props {
  city: string;
}

const Title = styled(Typography)`
  text-align: center;
`;

const Component = styled(Paper)`
  width: 100%;
  padding: 20px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 4px 1px;
  border: 1px solid transparent;
  transition: border 0.3s ease;
  &:hover {
    border: 1px solid black;
    .delete-icon {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const LeftSide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Condition = styled("img")({
  width: "90px",
  height: "auto"
});

const CityCardSM: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const code = weatherData[city].current.condition.code;

  const dataCurrent = weatherData[city].current;
  const { condition } = dataCurrent;
  const { icon: conditionIcon, text: conditionText } = condition;

  return (
    <Component sx={{ background: getBackgroundColor(code) }}>
      <CityCardDeleteIcon city={city} />
      <LeftSide>
        <Title variant="h4">{city}</Title>
        <CityTemperature city={city} />
        <CityCardContentSM city={city} />
      </LeftSide>
      <Condition src={conditionIcon} alt={conditionText} />
    </Component>
  );
};

export default CityCardSM;
