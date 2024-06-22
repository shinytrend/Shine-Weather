import { Box } from "@mui/material";
import { FC, memo } from "react";
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

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  data: Record<string, any>;
  onClear: () => void;
  isWeatherDataEmpty?: boolean | undefined;
}

const SearchCityForm: FC<Props> = memo(
  ({
    data,
    register,
    setValue,
    onSubmit,
    handleSubmit,
    onClear,
    isWeatherDataEmpty
  }): JSX.Element => {
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
            />
            <IconButtonStyled
              icon={DeleteOutlineOutlinedIcon}
              fontSize="40px"
              disabled={!isWeatherDataEmpty}
              onClick={onClear}
            />
          </Box>
        </FormFields>
      </FormStyled>
    );
  }
);

export default SearchCityForm;
