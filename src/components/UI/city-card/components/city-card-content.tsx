import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// store
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
// components
import RowCityCard from "./city-card-row";
import Loader from "@components/common/loader/loader";
import CityTemperature from "./city-temperature";
// icons
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

interface Props {
  city: string;
}

const Component = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ValuesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Condition = styled("img")({
  width: "90px",
  height: "auto"
});

const CityCardContent: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isLoading = useSelector(getWeatherDataLoadingStatus());

  const dataCurrent = weatherData[city].current;
  const { feelslike_c, humidity, wind_kph, condition } = dataCurrent;
  const { icon: conditionIcon, text: conditionText } = condition;

  return !isLoading ? (
    <Component>
      <Condition src={conditionIcon} alt={conditionText} />
      <Content>
        <CityTemperature city={city} />
        <ValuesContainer>
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
        </ValuesContainer>
      </Content>
    </Component>
  ) : (
    <Loader color="green" />
  );
};

export default memo(CityCardContent);
