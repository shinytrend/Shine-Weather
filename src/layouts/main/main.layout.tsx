import { Autocomplete, Box, TextField, styled } from "@mui/material";
import { getWeatherData } from "@store/weather/weather.store";
import { useSelector } from "react-redux";
import { russiaCities } from "../../data/russia";

interface ICities {
  region: string;
  city: string;
}

const Component = styled(Box)`
  width: 1024px;
  height: 100%;
  padding: 20px;
  background: gray;
  display: flex;
`;

const MainLayout = () => {
  const weatherData = useSelector(getWeatherData());
  console.log("weatherData", weatherData);

  function removeDuplicatesByCity(cities: ICities[]) {
    const uniqueCities = [];
    const seenCities = new Set();

    for (let city of cities) {
      if (!seenCities.has(city.city)) {
        seenCities.add(city.city);
        uniqueCities.push(city);
      }
    }

    return uniqueCities;
  }
  const uniqueRussiaCities = removeDuplicatesByCity(russiaCities);

  return (
    <Component>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={uniqueRussiaCities}
        getOptionLabel={(option) => option.city}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Выберите город" />
        )}
      />
    </Component>
  );
};

export default MainLayout;
