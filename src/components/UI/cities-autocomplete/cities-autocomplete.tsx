import * as React from "react";
import debounce from "lodash/debounce";
import { russiaCities } from "@data/cities-russia";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ICityType {
  region: string;
  city: string;
}

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
}

const CitiesAutocomplete: React.FC<Props> = ({
  register,
  setValue,
  name
}): JSX.Element => {
  const [value, setValueLocal] = React.useState<ICityType | null>(null);
  const [_, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<ICityType[]>([]);

  const uniqueCities = React.useMemo(() => {
    const seen = new Set();
    return russiaCities.filter((item) => {
      const key = `${item.city}-${item.region}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        if (query) {
          const filteredOptions = uniqueCities.filter((city) =>
            city.city.toLowerCase().includes(query.toLowerCase())
          );
          setOptions(filteredOptions);
        } else {
          setOptions([]);
        }
      }, 500),
    [uniqueCities]
  );

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Autocomplete
      id={name}
      sx={{ width: "100%" }}
      getOptionLabel={(option) => `${option.city}, ${option.region}`}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Город не найден"
      onChange={(_: any, newValue: ICityType | null) => {
        setValueLocal(newValue);
        setValue(name, newValue?.city || "");
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        debouncedSearch(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Выберите город"
          fullWidth
          {...register(name)}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={`${option.city}-${option.region}`}>
          <Grid container alignItems="center">
            <Grid item sx={{ display: "flex", width: 44 }}>
              <LocationOnIcon sx={{ color: "text.secondary" }} />
            </Grid>
            <Grid
              item
              sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
            >
              <Box component="span" sx={{ fontWeight: "regular" }}>
                {option.city}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {option.region}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
};

export default CitiesAutocomplete;
