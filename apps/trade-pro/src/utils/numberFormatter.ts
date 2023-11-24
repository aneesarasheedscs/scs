import { isNil } from 'lodash';

export const numberFormatter = (number: number) => {
  if (isNil(number)) return '';

  const decimalPlaces = Number.isInteger(number) ? 0 : 2;

  const formatter = new Intl.NumberFormat('default', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  });

  const formattedNumber = formatter.format(number);

  return parseFloat(formattedNumber) < 0 ? `(${formattedNumber?.replace('-', '')})` : formattedNumber;
};
