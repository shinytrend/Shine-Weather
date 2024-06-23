import { FC, memo } from "react";
import { useSelector } from "react-redux";
// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// components
import ButtonStyled from "@components/common/buttons/button-styled";
// store
import { getWeatherData } from "@store/weather/weather.store";
// hooks
import { Box, styled } from "@mui/material";

interface Props {
  data: Record<string, any>;
  onClear: () => void;
}

const ButtonsContainer = styled(Box)`
  display: flex;
`;

const ButtonsMobile: FC<Props> = ({ data, onClear }): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataEmpty = !!Object.keys(weatherData).length;

  return (
    <ButtonsContainer sx={{ width: "100%", gap: "4px" }}>
      <ButtonStyled
        title="Добавить город"
        icon={<AddCircleOutlineOutlinedIcon />}
        disabled={!data.selectedCity}
        type="submit"
      />
      <ButtonStyled
        title="Очистить список"
        icon={<DeleteOutlineOutlinedIcon />}
        color="error"
        disabled={!isWeatherDataEmpty}
        onClick={onClear}
      />
    </ButtonsContainer>
  );
};

export default memo(ButtonsMobile);
