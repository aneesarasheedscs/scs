import dayjs from 'dayjs';

export const formateDate = (date: string | Date) => {
  return dayjs(date).format('DD-MMM-YYYY');
};
