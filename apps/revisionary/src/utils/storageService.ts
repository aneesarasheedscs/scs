import { TAppUserData } from '@revisionary/globalTypes';
import { isNil } from 'lodash';

export const storedUserDetail = (): TAppUserData | null => {
  const storedData = localStorage.getItem('userDetail'); // Replace 'yourLocalStorageKey' with the actual key you used

  if (!isNil(storedData)) {
    const userDetail: TAppUserData = JSON.parse(storedData);
    return userDetail;
  }

  return null;
};

// export const storedFinancialYear = (): TFinancialYear | null => {
//   const storedData = localStorage.getItem('financialYear'); // Replace 'yourLocalStorageKey' with the actual key you used

//   if (!isNil(storedData)) {
//     const financialYearDetail: TFinancialYear = JSON.parse(storedData);
//     return financialYearDetail;
//   }

//   return null;
// };
