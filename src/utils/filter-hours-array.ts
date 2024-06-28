import { IHour } from "@interfaces/weather-data-interface";

export const filterHoursArray = (hoursArray: IHour[]) => {
  const currentDate = new Date();
  const currentHour = currentDate?.getHours();

  const currentHourString = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )} ${String(currentHour).padStart(2, "0")}:`;

  const filteredArray = hoursArray?.filter((hour: IHour) => {
    return hour.time >= currentHourString;
  });

  return filteredArray;
};
