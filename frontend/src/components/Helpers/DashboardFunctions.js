export const compareNames = (array, name) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(name)) {
      return true;
    }
  }
  return false;
};

export const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step,
  );
};
