import { getWeatherData } from "@store/weather/weather.store";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const weatherData = useSelector(getWeatherData());
  const selectedCities = ["London", "Moscow", "Boston"];
  console.log("weatherData", weatherData);
  return <h1>hello world</h1>;
};

export default MainLayout;
