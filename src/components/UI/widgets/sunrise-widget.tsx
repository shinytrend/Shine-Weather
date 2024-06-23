import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { convertTime12to24 } from "@utils/convert-time-12-to-24";
import WidgetSimple from "@components/common/widget/widget-simple";
import SunriseImage from "@assets/sunrise.png";
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
import { getSelectedCity } from "@store/weather/selected-city.store";

const SunriseWidget: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());

  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];

  const sunriseTime = selectedCity?.astro?.sunrise;

  let time;

  if (sunriseTime) {
    time = convertTime12to24(sunriseTime);
  }

  return (
    <WidgetSimple
      title="Восход"
      subtitle={`в ${time}`}
      colorTitle="darkOrange"
      colorSubtitle="red"
      imageSrc={SunriseImage}
      imageAlt="Восход"
      background="linear-gradient(to right, #fffacc, #87ceeb)"
      isLoading={isWeatherDataLoading}
    />
  );
};

export default memo(SunriseWidget);
