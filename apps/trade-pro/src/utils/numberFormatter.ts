export const numberFormatter = (number: number) => {
  const decimalPlaces = Number.isInteger(number) ? 0 : 2;

  const formatter = new Intl.NumberFormat('default', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  });

  return formatter.format(number);
};
