import { Box, styled } from "@mui/material";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// components
import IconButtonStyled from "@components/common/buttons/icon-button";
// store
import { getWeatherData } from "@store/weather/weather-data.store";

interface Props {
  data: Record<string, string>;
  onClear: () => void;
}

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const ButtonsDesktop: FC<Props> = ({ data, onClear }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataEmpty = !!Object.keys(weatherData).length;

  return (
    <ButtonsContainer>
      <IconButtonStyled
        icon={AddCircleOutlineOutlinedIcon}
        fontSize="40px"
        type="submit"
        disabled={!data.selectedCity}
        tooltipTitle="Добавить выбранный город"
      />
      <IconButtonStyled
        icon={DeleteOutlineOutlinedIcon}
        fontSize="40px"
        disabled={!isWeatherDataEmpty}
        onClick={onClear}
        tooltipTitle="Удалить все города"
      />
    </ButtonsContainer>
  );
};

export default memo(ButtonsDesktop);
