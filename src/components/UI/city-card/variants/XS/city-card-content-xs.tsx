import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// store
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
// components
import RowCityCard from "../../components/city-card-row";
import Loader from "@components/common/loader/loader";
// icons
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

interface Props {
  city: string;
}

const Component = styled(Box)`
  width: 100%;
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

const CityCardContentSM: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isLoading = useSelector(getWeatherDataLoadingStatus());

  const dataCurrent = weatherData[city].current;
  const { feelslike_c, humidity, wind_kph } = dataCurrent;

  return !isLoading ? (
    <Component>
      <Content>
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

export default CityCardContentSM;
