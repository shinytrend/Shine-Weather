import { Box } from "@mui/material";
import { getWeatherData } from "@store/weather/weather.store";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const weatherData = useSelector(getWeatherData());
  console.log("weatherData", weatherData);

  return <Box></Box>;
};

export default MainLayout;
