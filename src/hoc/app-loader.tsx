import { useAppDispatch } from "@hooks/redux/redux-hooks";
import { loadSelectedCity } from "@store/weather/selected-city.store";
import { loadWeatherData } from "@store/weather/weather-data.store";
import { getStorageCities } from "@utils/get-storage-cities";
import { useEffect } from "react";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWeatherData(getStorageCities()));
    dispatch(loadSelectedCity());
  }, [dispatch]);

  return children;
};

export default AppLoader;
