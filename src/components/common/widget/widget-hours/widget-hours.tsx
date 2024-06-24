import { useRef } from "react";
import { useSelector } from "react-redux";
import { Paper, styled } from "@mui/material";
import useDraggableScroll from "use-draggable-scroll";
// components
import HourComponent from "./components/hour-component";
// store
import { getSelectedCity } from "@store/weather/selected-city.store";
import { getWeatherData } from "@store/weather/weather-data.store";
// utils
import { filterHoursArray } from "@utils/filter-hours-array";

const Component = styled(Paper)`
  width: 100%;
  height: 130px;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
  cursor: grab;
  overflow-x: auto;
`;

const WidgetHours = () => {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: "horizontal" });

  const weatherData = useSelector(getWeatherData());
  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];
  const hoursArray = selectedCity?.hour;

  let filteredByCurrentTime;
  if (hoursArray) {
    filteredByCurrentTime = filterHoursArray(hoursArray);
  }

  return (
    <Component ref={ref} onMouseDown={onMouseDown}>
      {hoursArray?.map((hour: Record<string, any>) => (
        <HourComponent hour={hour} key={hour.time_epoch} />
      ))}
    </Component>
  );
};

export default WidgetHours;
