import { FC, memo } from "react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
// icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
}

const SearchCityForm: FC<Props> = memo(
  ({ register, setValue, onSubmit, handleSubmit }): JSX.Element => {
    return (
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <FormFields>
          <CitiesAutocomplete
            register={register}
            setValue={setValue}
            name="selectedCity"
          />
          <IconButtonStyled
            icon={SearchOutlinedIcon}
            fontSize="40px"
            type="submit"
          />
        </FormFields>
      </FormStyled>
    );
  }
);

export default SearchCityForm;
