import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { moonPhases } from "@data/moon-phases";
import NightSkyImage from "@assets/moon-phases/night-sky.jpg";
import WidgetSimple from "@components/common/widget/widget-simple";
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
import { getSelectedCity } from "@store/weather/selected-city.store";

const MoonPhaseWidget: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());

  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];

  const moonPhase = selectedCity?.astro?.moon_phase;

  const phase = moonPhases.find((phase) => phase.phase === moonPhase);
  const src = phase?.src;
  const text = phase?.phaseRu;

  return (
    <WidgetSimple
      title="Фаза луны"
      subtitle={text}
      colorTitle="white"
      colorSubtitle="white"
      imageSrc={src}
      imageAlt="Фаза луны"
      background={`url(${NightSkyImage})`}
      isLoading={isWeatherDataLoading}
    />
  );
};

export default memo(MoonPhaseWidget);
