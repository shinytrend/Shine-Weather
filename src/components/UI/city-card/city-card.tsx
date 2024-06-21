import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, styled } from "@mui/material";
import { getWeatherData } from "@store/weather/weather.store";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

interface Props {
  city: string;
}

const PaperStyled = styled(Paper)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalContainer = styled(Box)`
  display: flex;
  gap: 4px;
`;

const CityCard: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const dataCurrent = weatherData[city].current;
  const temperatureInCelsius = dataCurrent.temp_c;
  const feelsLikeCelsius = dataCurrent.feelslike_c;
  const humidity = dataCurrent.humidity;
  const windKph = dataCurrent.wind_kph;

  return (
    <PaperStyled>
      <Typography variant="h4" margin="0 0 10px 0">
        {city}
      </Typography>
      <Typography variant="h4" margin="0 0 10px 0">
        {temperatureInCelsius}°
      </Typography>
      <HorizontalContainer>
        <WaterDropOutlinedIcon />
        <Typography>Влажность:</Typography>
        <Typography fontWeight="600">{humidity}%</Typography>
      </HorizontalContainer>
      <HorizontalContainer>
        <DeviceThermostatOutlinedIcon />
        <Typography>Ощущается как:</Typography>
        <Typography fontWeight="600">{feelsLikeCelsius}°</Typography>
      </HorizontalContainer>
      <HorizontalContainer>
        <AirOutlinedIcon />
        <Typography>Влажность:</Typography>
        <Typography fontWeight="600">{windKph}км/ч</Typography>
      </HorizontalContainer>
    </PaperStyled>
  );
};

export default CityCard;
