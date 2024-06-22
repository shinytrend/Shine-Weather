export const getStorageCities = () => {
  const storedCities = localStorage.getItem("selected-cities");
  return storedCities ? JSON.parse(storedCities) : [];
};
