import { FC, memo } from "react";
import { ContainerStyled } from "@styles/container-styled";
import WidgetsBlock from "./components/widgets-block/widgets-block";
import WeatherBlock from "./components/weather-block/weather-block";

const MainLayout: FC = (): JSX.Element => {
  return (
    <ContainerStyled>
      <WeatherBlock />
      <WidgetsBlock />
    </ContainerStyled>
  );
};

export default memo(MainLayout);
