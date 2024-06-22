import { Box } from "@mui/material";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// components
import CitiesAutocomplete from "@components/UI/cities-autocomplete/cities-autocomplete";
import IconButtonStyled from "@components/common/buttons/icon-button";
// styles
import { FormFields, FormStyled } from "@styles/form-styled";
// store
import { getWeatherData } from "@store/weather/weather.store";

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  data: Record<string, any>;
  onClear: () => void;
}

const SearchCityForm: FC<Props> = memo(
  ({
    data,
    register,
    setValue,
    onSubmit,
    handleSubmit,
    onClear
  }): JSX.Element => {
    const weatherData = useSelector(getWeatherData());
    const isWeatherDataEmpty = !!Object.keys(weatherData).length;

    return (
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <FormFields>
          <CitiesAutocomplete
            register={register}
            setValue={setValue}
            name="selectedCity"
          />
          <Box sx={{ display: "flex" }}>
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
          </Box>
        </FormFields>
      </FormStyled>
    );
  }
);

export default SearchCityForm;
