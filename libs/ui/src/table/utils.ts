import dayjs from 'dayjs';
import { forEach, isNil, map } from 'lodash';

export const numberFormatter = (number: number) => {
  if (isNil(number)) return '';

  const decimalPlaces = Number.isInteger(number) ? 0 : 2;

  const formatter = new Intl.NumberFormat('default', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  });

  return formatter.format(number);
};

export const formateDate = (date: string | Date) => {
  if (isNil(date)) return '';

  return dayjs(date).format('DD-MMM-YYYY');
};

export const formateDatesInData = (data: any[]) => {
  const formattedData = map(data, (obj) => {
    const formattedObj: any = {};
    forEach(obj, (value, key) => {
      if (key.match(/date/i)) {
        formattedObj[key] = formateDate(value);
      } else {
        formattedObj[key] = value;
      }
    });
    return formattedObj;
  });

  return formattedData;
};
