import { FC, memo } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// store
import {
  clearWeatherData,
  getWeatherData,
  updateWeatherData
} from "@store/weather/weather.store";
// components
import DateAndTime from "./components/date-and-time";
import CityCard from "@components/UI/city-card/city-card";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import EmptySelectTitle from "./components/empty-select-title";
// styles
import { ContainerStyled } from "@styles/container-styled";
// forms
import SearchCityForm from "@forms/search-city.form";
// hooks
import useRemoveItem from "@hooks/item/use-remove-item";

const MainLayoutInitialState = {
  selectedCity: ""
};

const MainLayout: FC = memo(() => {
  const dispatch = useDispatch();
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataEmpty = !!Object.keys(weatherData).length;
  console.log("weatherData", weatherData);

  const { register, watch, setValue, handleSubmit, reset } = useForm({
    defaultValues: MainLayoutInitialState,
    mode: "onChange"
  });
  const data = watch();
  console.log("data", data);

  const selectedCity = watch("selectedCity");

  const onSubmit = () => {
    if (selectedCity) {
      dispatch<any>(updateWeatherData(selectedCity))
        .then(() => {
          toast.success("Город успешно добавлен!");
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        })
        .finally(() => {
          reset(MainLayoutInitialState);
        });
    }
  };

  const {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  } = useRemoveItem({
    onRemove: clearWeatherData(),
    successMessage: "Города успешно удалены, хранилище очищено!"
  });

  return (
    <ContainerStyled>
      <SearchCityForm
        data={data}
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        onClear={handleOpenConfirm}
        handleSubmit={handleSubmit}
        isWeatherDataEmpty={isWeatherDataEmpty}
      />
      <DateAndTime margin="0 0 20px 0" />
      {isWeatherDataEmpty ? (
        <Box sx={{ display: "flex", gap: "12px" }}>
          {Object.keys(weatherData)?.map((city) => {
            return <CityCard city={city} key={city} />;
          })}
        </Box>
      ) : (
        <EmptySelectTitle />
      )}
      <DialogConfirm
        question="Вы уверены, что хотите удалить все выбранные города и очистить хранилище?"
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccessClick={() => handleRemoveItem()}
      />
    </ContainerStyled>
  );
});

export default MainLayout;
