import dayjs from 'dayjs';
import { isNil } from 'lodash';

export const formateDate = (date: string | Date) => {
  if (isNil(date)) return '';

  return dayjs(date).format('DD-MMM-YYYY');
};
