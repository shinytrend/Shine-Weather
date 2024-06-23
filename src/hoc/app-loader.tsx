import { loadSelectedCity } from "@store/weather/selected-city.store";
import { loadWeatherData } from "@store/weather/weather-data.store";
import { getStorageCities } from "@utils/get-storage-cities";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadWeatherData(getStorageCities()));
    dispatch<any>(loadSelectedCity());
  }, [dispatch]);

  return children;
};

export default AppLoader;
