import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, Typography, styled } from "@mui/material";
import { toast } from "react-toastify";
// components
import CityCardContent from "./components/city-card-content";
import CityCardDeleteIcon from "./components/city-card-delete-icon";
// store
import { getWeatherData } from "@store/weather/weather-data.store";
import {
  getSelectedCity,
  selectCity
} from "@store/weather/selected-city.store";
// utils
import { getBackgroundColor } from "@utils/get-background-card-color";

interface Props {
  city: string;
  isDragging: boolean;
}

const Title = styled(Typography)`
  text-align: center;
`;

const Component = styled(Paper)`
  width: 304px;
  height: 380px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 4px 4px 4px 5px;
  border: 1px solid transparent;
  transition: border 0.3s ease;
  &:hover {
    .delete-icon {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const CityCard: FC<Props> = ({ city, isDragging }): JSX.Element => {
  const dispatch = useDispatch();
  const weatherData = useSelector(getWeatherData());

  const code = weatherData[city].current.condition.code;
  const storageCity = useSelector(getSelectedCity());

  const handleClick = () => {
    if (!isDragging && city) {
      dispatch<any>(selectCity(city));
      toast.success(`Город ${city} успешно выбран`);
    }
  };

  return (
    <Component
      sx={{
        background: getBackgroundColor(code),
        border: storageCity === city ? "3px dotted red" : "",
        boxShadow:
          storageCity === city ? "0 0 5px 2px rgba(255, 0, 0, 0.5)" : "none",
        "&:hover": {
          border: storageCity === city ? "3px dotted red" : "1px solid black"
        }
      }}
    >
      <Box onClick={handleClick}>
        <Title variant="h4">{city}</Title>
        <CityCardContent city={city} />
      </Box>
      <CityCardDeleteIcon city={city} />
    </Component>
  );
};

export default memo(CityCard);
