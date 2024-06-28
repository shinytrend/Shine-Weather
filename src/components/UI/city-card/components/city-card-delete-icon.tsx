import { FC, memo } from "react";
import { toast } from "react-toastify";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  deleteCityFromWeatherData,
  getWeatherData
} from "@store/weather/weather-data.store";
import { selectCity } from "@store/weather/selected-city.store";
import { useAppDispatch } from "@hooks/redux/redux-hooks";

interface Props {
  city: string;
}

const DeleteIconStyled = styled(DeleteOutlineOutlinedIcon)`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 14px;
  top: 14px;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  background: IndianRed;
  color: white;
  padding: 4px;
  border: 1px solid black;
  border-radius: 50%;
  transition: transform 0.3s ease, visibility 0s, opacity 0.3s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const CityCardDeleteIcon: FC<Props> = ({ city }): JSX.Element => {
  const dispatch = useAppDispatch();
  const weatherData = useSelector(getWeatherData());
  const weatherDataKeys = Object.keys(weatherData);

  const handleDeleteCard = (city: string) => {
    if (city) {
      dispatch(deleteCityFromWeatherData(city))
        .then(() => {
          toast.success(`Город ${city} успешно удален`);
          if (!weatherDataKeys.length) {
            return null;
          }
          dispatch(selectCity(weatherDataKeys[0]));
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        });
    }
  };

  return (
    <DeleteIconStyled
      className="delete-icon"
      onClick={() => handleDeleteCard(city)}
    />
  );
};

export default memo(CityCardDeleteIcon);
