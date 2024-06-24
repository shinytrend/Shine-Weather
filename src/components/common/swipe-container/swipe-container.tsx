import { FC, useState } from "react";
import { toast } from "react-toastify";
import { Paper, Box, styled } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// store
import {
  deleteCityFromWeatherData,
  getWeatherData
} from "@store/weather/weather-data.store";
import {
  getSelectedCity,
  selectCity
} from "@store/weather/selected-city.store";
// utils
import { getBackgroundColor } from "@utils/get-background-card-color";

interface Props {
  city: string;
  children: React.ReactNode;
}

const Container = styled(Box)`
  position: relative;
  width: 100%;
`;

const Component = styled(Paper)`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0px 1px;
  border: 1px solid transparent;
  transition: border 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 1px solid black;
  }
`;

const Content = styled(Box)`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteIconOverlay = styled(Box)<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: IndianRed;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  transition: width 0.3s ease;
`;

const DeleteIconStyled = styled(DeleteOutlineOutlinedIcon)`
  color: white;
  width: 40px;
  height: 40px;
`;

const SwipeContainer: FC<Props> = ({ city, children }) => {
  const dispatch = useDispatch();
  const [isSwiped, setIsSwiped] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const storageCity = useSelector(getSelectedCity());

  const weatherData = useSelector(getWeatherData());
  const weatherDataKeys = Object.keys(weatherData);
  const code = weatherData[city].current.condition.code;

  const handlers = useSwipeable({
    onSwipedRight: () => slide(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const handleClick = () => {
    if (city) {
      dispatch<any>(selectCity(city));
      toast.success(`Город ${city} успешно выбран`);
    }
  };

  const handleDeleteCard = (city: string) => {
    if (city) {
      dispatch<any>(deleteCityFromWeatherData(city))
        .then(() => {
          toast.success(`Город ${city} успешно удален`);
          if (!weatherDataKeys.length) {
            return null;
          }
          dispatch<any>(selectCity(weatherDataKeys[0]));
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        });
    }
  };

  const slide = () => {
    console.log("swipe right");
    setIsSwiped(true);
    setShowDeleteIcon(true);
    setTimeout(() => {
      handleDeleteCard(city);
      dispatch({ type: "stopSliding" });
      setIsSwiped(false);
      setShowDeleteIcon(false);
    }, 300);
  };

  return (
    <Container>
      <DeleteIconOverlay visible={showDeleteIcon}>
        <DeleteIconStyled />
      </DeleteIconOverlay>
      <Component
        {...handlers}
        sx={{
          background: getBackgroundColor(code),
          border: storageCity === city ? "3px dotted red" : "",
          boxShadow:
            storageCity === city ? "0 0 5px 2px rgba(255, 0, 0, 0.5)" : "none",
          transform: isSwiped ? "translateX(50px)" : "translateX(0)",
          "&:hover": {
            border: storageCity === city ? "3px dotted red" : "1px solid black"
          }
        }}
        onClick={handleClick}
      >
        <Content>{children}</Content>
      </Component>
    </Container>
  );
};

export default SwipeContainer;
