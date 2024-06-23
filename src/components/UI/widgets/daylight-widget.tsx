import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, styled } from "@mui/material";
import { convertTime12to24 } from "@utils/convert-time-12-to-24";
import Loader from "@components/common/loader/loader";
import { getTimeDifference } from "@utils/get-time-difference";
import DaylightImage from "@assets/daylight.png";
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";
import { getSelectedCity } from "@store/weather/selected-city.store";

const CardStyled = styled(Card)`
  width: 100%;
  background-image: url(${DaylightImage});
  background-size: cover;
  background-position: center;
`;

const ContentStyled = styled(CardContent)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DaylightWidget: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());

  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];

  const sunriseTime = selectedCity?.astro?.sunrise;
  const sunsetTime = selectedCity?.astro?.sunset;

  let sunriseTime24: string | undefined;
  let sunsetTime24: string | undefined;
  let timeDifference;

  if (sunriseTime && sunsetTime) {
    sunriseTime24 = convertTime12to24(sunriseTime);
    sunsetTime24 = convertTime12to24(sunsetTime);
    timeDifference = getTimeDifference(sunriseTime24, sunsetTime24);
  }

  return (
    <CardStyled>
      {!isWeatherDataLoading ? (
        <ContentStyled>
          <Typography variant="h5" color="DarkSlateGrey">
            Световой день
          </Typography>
          <Typography>
            {`${timeDifference?.hours} часов и ${timeDifference?.minutes} минут`}
          </Typography>
        </ContentStyled>
      ) : (
        <Loader />
      )}
    </CardStyled>
  );
};

export default memo(DaylightWidget);
