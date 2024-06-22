export const getFirstWordBeforeComma = (str: string) => {
  let commaIndex = str.indexOf(",");

  if (commaIndex !== -1) {
    return str.substring(0, commaIndex).split(" ")[0];
  } else {
    return str.split(" ")[0];
  }
};
