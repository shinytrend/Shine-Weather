import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// store
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather.store";
// components
import RowCityCard from "./row.city-card";
import Loader from "@components/common/loader/loader";
// icons
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

interface Props {
  city: string;
}

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Condition = styled("img")({
  width: "90px",
  height: "auto"
});

const CityCardContent: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isLoading = useSelector(getWeatherDataLoadingStatus());

  const dataCurrent = weatherData[city].current;
  const { temp_c, feelslike_c, humidity, wind_kph, condition } = dataCurrent;
  const { icon: conditionIcon, text: conditionText } = condition;

  return !isLoading ? (
    <Component>
      <Condition src={conditionIcon} alt={conditionText} />
      <Typography variant="h4" margin="0 0 10px 0">
        {temp_c}°
      </Typography>

      <RowCityCard
        title="Влажность"
        value={humidity}
        symbol="%"
        icon={WaterDropOutlinedIcon}
      />
      <RowCityCard
        title="Ощущается как"
        value={feelslike_c}
        symbol="°"
        icon={DeviceThermostatOutlinedIcon}
      />
      <RowCityCard
        title="Скорость ветра"
        value={wind_kph}
        symbol="км/ч"
        icon={AirOutlinedIcon}
      />
    </Component>
  ) : (
    <Loader color="green" />
  );
};

export default CityCardContent;
