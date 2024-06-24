import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { convertTime12to24 } from "@utils/convert-time-12-to-24";
import WidgetSimple from "@components/common/widget/widget-simple/widget-simple";
import SunsetImage from "@assets/sunset.png";
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
import { getSelectedCity } from "@store/weather/selected-city.store";

const SunsetWidget: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());

  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];

  const sunsetTime = selectedCity?.astro?.sunset;

  let time;

  if (sunsetTime) {
    time = convertTime12to24(sunsetTime);
  }

  return (
    <WidgetSimple
      title="Закат"
      subtitle={`в ${time}`}
      colorTitle="white"
      colorSubtitle="yellow"
      imageSrc={SunsetImage}
      imageAlt="Закат"
      background="linear-gradient(to right, #87ceeb, #1a237e);"
      isLoading={isWeatherDataLoading}
    />
  );
};

export default memo(SunsetWidget);
