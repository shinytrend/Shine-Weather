import { FC, memo } from "react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
// components
import CitiesAutocomplete from "@components/UI/cities-autocomplete/cities-autocomplete";
import ButtonsMobile from "./components/buttons-mobile";
import ButtonsDesktop from "./components/buttons-desktop";
// styles
import { FormFields, FormStyled } from "@styles/form-styled";
// hooks
import useWindowWidth from "@hooks/window/use-window-width";

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  data: Record<string, any>;
  onClear: () => void;
}

const SearchCityForm: FC<Props> = ({
  data,
  register,
  setValue,
  onSubmit,
  handleSubmit,
  onClear
}): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isSmallScreen = screenWidth <= 700;

  return (
    <FormStyled
      onSubmit={handleSubmit(onSubmit)}
      sx={{ padding: isSmallScreen ? "0" : "0 22px" }}
    >
      <FormFields sx={{ flexDirection: isSmallScreen ? "column" : "row" }}>
        <CitiesAutocomplete
          register={register}
          setValue={setValue}
          name="selectedCity"
        />
        {isSmallScreen ? (
          <ButtonsMobile data={data} onClear={onClear} />
        ) : (
          <ButtonsDesktop data={data} onClear={onClear} />
        )}
      </FormFields>
    </FormStyled>
  );
};

export default memo(SearchCityForm);
