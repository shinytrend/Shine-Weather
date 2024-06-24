import { Box, styled, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import configFile from "@config/config.json";
// components
import ItemOnMap from "@components/UI/map/item-on-map";
import SunriseWidget from "@components/UI/widgets/sunrise-widget";
import SunsetWidget from "@components/UI/widgets/sunset-widget";
import DaylightWidget from "@components/UI/widgets/daylight-widget";
import MoonPhaseWidget from "@components/UI/widgets/moon-phase-widget";
import WidgetHours from "@components/common/widget/widget-hours/widget-hours";
// store
import { getWeatherData } from "@store/weather/weather-data.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MapContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;

const WidgetContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;

const MOBILE_WIDTH = configFile.mobile_width;

const WidgetsBlock = () => {
  const weatherData = useSelector(getWeatherData());
  const citiesLength = Object.keys(weatherData).length;

  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmScreen = useMediaQuery(`(max-width: 700px)`);

  return (
    !!citiesLength && (
      <Component sx={{ padding: isMobileScreen ? "0" : "0 26px" }}>
        <MapContainer>
          <ItemOnMap />
        </MapContainer>
        <WidgetContainer sx={{ flexDirection: isSmScreen ? "column" : "row" }}>
          <SunriseWidget />
          <SunsetWidget />
        </WidgetContainer>
        <WidgetContainer sx={{ flexDirection: isSmScreen ? "column" : "row" }}>
          <DaylightWidget />
          <MoonPhaseWidget />
        </WidgetContainer>
        <WidgetContainer sx={{ flexDirection: isSmScreen ? "column" : "row" }}>
          <WidgetHours />
        </WidgetContainer>
      </Component>
    )
  );
};

export default WidgetsBlock;
