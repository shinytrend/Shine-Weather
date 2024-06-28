import { FC, memo } from "react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import configFile from "@config/config.json";
import { useMediaQuery } from "@mui/material";
// components
import CitiesAutocomplete from "@components/UI/cities-autocomplete/cities-autocomplete";
import ButtonsMobile from "./components/buttons-mobile";
import ButtonsDesktop from "./components/buttons-desktop";
// styles
import { FormFields, FormStyled } from "@styles/form-styled";
// hooks
import useWindowWidth from "@hooks/window/use-window-width";

interface Props {
  register: UseFormRegister<Record<string, string>>;
  setValue: UseFormSetValue<Record<string, string>>;
  handleSubmit: UseFormHandleSubmit<Record<string, string>>;
  onSubmit: (data: Record<string, string>) => void;
  data: Record<string, string>;
  onClear: () => void;
}

const MOBILE_WIDTH = configFile.mobile_width;

const SearchCityForm: FC<Props> = ({
  data,
  register,
  setValue,
  onSubmit,
  handleSubmit,
  onClear
}): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallScreen = screenWidth <= 700;

  return (
    <FormStyled
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: isMobileScreen ? "0 6px" : "0 22px"
      }}
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
