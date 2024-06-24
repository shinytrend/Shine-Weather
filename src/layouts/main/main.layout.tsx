import { FC, memo } from "react";
import { ContainerStyled } from "@styles/container-styled";
import WidgetsBlock from "./components/widgets-block/widgets-block";
import WeatherBlock from "./components/weather-block/weather-block";
import { useSelector } from "react-redux";
import { getWeatherDataLoadingStatus } from "@store/weather/weather-data.store";
import Loader from "@components/common/loader/loader";

const MainLayout: FC = (): JSX.Element => {
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());

  return (
    <ContainerStyled>
      {!isWeatherDataLoading ? (
        <>
          <WeatherBlock />
          <WidgetsBlock />
        </>
      ) : (
        <Loader size={40} height="300px" />
      )}
    </ContainerStyled>
  );
};

export default memo(MainLayout);
