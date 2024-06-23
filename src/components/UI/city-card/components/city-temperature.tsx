import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getWeatherData } from "@store/weather/weather.store";

interface Props {
  city: string;
}

const CityTemperature: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const dataCurrent = weatherData[city].current;
  const { temp_c } = dataCurrent;

  return (
    <Typography variant="h4" margin="0 0 10px 0">
      {temp_c}°
    </Typography>
  );
};

export default memo(CityTemperature);
