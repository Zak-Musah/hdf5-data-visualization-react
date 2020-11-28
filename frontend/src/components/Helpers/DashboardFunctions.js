export const compareNames = (array, name) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0].includes(name)) {
      return true;
    }
  }
  return false;
};
