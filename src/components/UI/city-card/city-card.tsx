import { FC } from "react";
import { Paper, Typography, styled } from "@mui/material";
import CityCardContent from "./components/city-card-content";
import CityCardDeleteIcon from "./components/city-card-delete-icon";
import { useSelector } from "react-redux";
import { getWeatherData } from "@store/weather/weather.store";
import { getBackgroundColor } from "@utils/get-background-card-color";

interface Props {
  city: string;
}

const Title = styled(Typography)`
  text-align: center;
`;

const Component = styled(Paper)`
  width: 291px;
  height: 380px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  cursor: pointer;
  margin: 4px 1px;
  border: 1px solid transparent;
  transition: border 0.3s ease;
  &:hover {
    border: 1px solid black;
    .delete-icon {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const CityCard: FC<Props> = ({ city }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const code = weatherData[city].current.condition.code;

  return (
    <Component sx={{ background: getBackgroundColor(code) }}>
      <CityCardDeleteIcon city={city} />
      <Title variant="h4">{city}</Title>
      <CityCardContent city={city} />
    </Component>
  );
};

export default CityCard;
