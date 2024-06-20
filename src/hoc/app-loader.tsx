import { loadWeatherData } from "@store/weather/weather.store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  const [selectedCities, setSelectedCities] = useState<string[]>(() => {
    const storedCities = localStorage.getItem("selected-cities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  const selectedCitiesMock = ["London", "Moscow", "Boston", "New York"];

  useEffect(() => {
    localStorage.setItem("selected-cities", JSON.stringify(selectedCitiesMock));
    setSelectedCities(selectedCitiesMock);
  }, []);

  useEffect(() => {
    localStorage.setItem("selected-cities", JSON.stringify(selectedCitiesMock));
  }, [selectedCities]);

  useEffect(() => {
    dispatch<any>(loadWeatherData(selectedCities));
  }, [dispatch]);

  return children;
};

export default AppLoader;
