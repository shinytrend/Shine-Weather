import { FC } from "react";
import { Paper, Typography, styled } from "@mui/material";
// components
import CityCardContent from "./components/city-card-content";
import CityCardDeleteIcon from "./components/city-card-delete-icon";

interface Props {
  city: string;
}

const Title = styled(Typography)`
  text-align: center;
`;

const Component = styled(Paper)`
  width: 318px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent; /* Начальные стили для границы */
  transition: border 0.3s ease; /* Плавный переход для границы */
  &:hover {
    border: 1px solid black; /* Изменение границы при наведении */
    .delete-icon {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const CityCard: FC<Props> = ({ city }): JSX.Element => {
  return (
    <Component>
      <CityCardDeleteIcon city={city} />
      <Title variant="h4">{city}</Title>
      <CityCardContent city={city} />
    </Component>
  );
};

export default CityCard;
