import { useSelector } from "react-redux";
import { Card, styled } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import Loader from "@components/common/loader/loader";
import target from "@assets/map/target.png";
import { getSelectedCity } from "@store/weather/selected-city.store";
import {
  getWeatherData,
  getWeatherDataLoadingStatus
} from "@store/weather/weather-data.store";

const MapContainer = styled(Card)`
  width: 100%;
  height: 150px;
  flex: 5;
  display: flex;
  background: gray;
  border-radius: 4px;
`;

const ItemOnMap: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const isWeatherDataLoading = useSelector(getWeatherDataLoadingStatus());
  const city = useSelector(getSelectedCity());
  const selectedCity = weatherData[city];
  const [cityCenter, setCityCenter] = useState<[number, number]>([
    Number(`${selectedCity?.location?.lat}`),
    Number(`${selectedCity?.location?.lon}`)
  ]);

  useEffect(() => {
    if (selectedCity) {
      setCityCenter([
        Number(`${selectedCity.location.lat}`),
        Number(`${selectedCity.location.lon}`)
      ]);
    }
  }, [selectedCity]);

  // обработка ошибки "Warning: Unknown: Support for defaultProps
  // will be removed from function components in a future major release.
  // Use JavaScript default parameters instead."
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <MapContainer>
      {!isWeatherDataLoading ? (
        <Map
          style={{ width: "100%" }}
          state={{
            center: cityCenter,
            zoom: 8
          }}
          modules={[
            "geoObject.addon.hint",
            "control.ZoomControl",
            "control.SearchControl"
          ]}
          options={{
            suppressMapOpenBlock: true
          }}
        >
          <Placemark
            modules={["geoObject.addon.hint"]}
            options={{
              iconLayout: "default#image",
              iconImageHref: target,
              iconImageSize: [40, 40],
              iconImageOffset: [-20, -40]
            }}
            geometry={cityCenter}
          />
        </Map>
      ) : (
        <Loader />
      )}
    </MapContainer>
  );
};

export default memo(ItemOnMap);
