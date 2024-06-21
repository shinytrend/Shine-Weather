import { loadWeatherData } from "@store/weather/weather.store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  const storedCities = localStorage.getItem("selected-cities");
  const cities = storedCities ? JSON.parse(storedCities) : [];

  useEffect(() => {
    dispatch<any>(loadWeatherData(cities));
  }, [dispatch]);

  return children;
};

export default AppLoader;
