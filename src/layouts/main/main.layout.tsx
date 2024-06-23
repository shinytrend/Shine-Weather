import { FC, memo } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// store
import {
  clearWeatherData,
  createNewCity,
  getCreateCityLoadingStatus,
  getWeatherDataLoadingStatus
} from "@store/weather/weather.store";
// components
import DateAndTime from "./components/date-and-time";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import CityCards from "./components/city-cards/city-cards";
// styles
import { ContainerStyled } from "@styles/container-styled";
// forms
import SearchCityForm from "@forms/search-city-form/search-city.form";
// hooks
import useRemoveItem from "@hooks/item/use-remove-item";

const MainLayoutInitialState = {
  selectedCity: ""
};

const MainLayout: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());
  const isCreateCityLoading = useSelector(getCreateCityLoadingStatus());

  const { register, watch, setValue, handleSubmit, reset } = useForm({
    defaultValues: MainLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();
  const selectedCity = watch("selectedCity");

  const {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  } = useRemoveItem({
    onRemove: clearWeatherData(),
    successMessage: "Города успешно удалены!"
  });

  const onSubmit = () => {
    if (selectedCity) {
      dispatch<any>(createNewCity(selectedCity))
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

  return (
    <ContainerStyled>
      <SearchCityForm
        data={data}
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        onClear={handleOpenConfirm}
        handleSubmit={handleSubmit}
      />
      <DateAndTime margin="0 0 20px 0" />
      <CityCards />

      <DialogConfirm
        question="Вы уверены, что хотите удалить все выбранные города?"
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccessClick={() => handleRemoveItem()}
      />
      <LoaderFullWindow
        color="green"
        size={75}
        isLoading={isCreateCityLoading || isWeatherDataLoading}
      />
    </ContainerStyled>
  );
};

export default memo(MainLayout);
