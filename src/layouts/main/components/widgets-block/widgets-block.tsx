import ItemOnMap from "@components/UI/map/item-on-map";
import { Box, styled } from "@mui/material";
import SunriseWidget from "@components/UI/widgets/sunrise-widget";
import SunsetWidget from "@components/UI/widgets/sunset-widget";
import DaylightWidget from "@components/UI/widgets/daylight-widget";
import MoonPhaseWidget from "@components/UI/widgets/moon-phase-widget";
import { useSelector } from "react-redux";
import { getWeatherData } from "@store/weather/weather-data.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 26px;
`;

const MapContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;

const WidgetContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;

const WidgetsBlock = () => {
  const weatherData = useSelector(getWeatherData());
  const citiesLength = Object.keys(weatherData).length;

  return (
    !!citiesLength && (
      <Component>
        <MapContainer>
          <ItemOnMap />
        </MapContainer>
        <WidgetContainer>
          <SunriseWidget />
          <DaylightWidget />
          <SunsetWidget />
        </WidgetContainer>
        <WidgetContainer>
          <MoonPhaseWidget />
        </WidgetContainer>
      </Component>
    )
  );
};

export default WidgetsBlock;
