import { TFinancialYear, TUserDetail } from '@tradePro/globalTypes';

export const storedUserDetail = (): TUserDetail | null => {
  const storedData = localStorage.getItem('loggedInUserDetail'); // Replace 'yourLocalStorageKey' with the actual key you used

  if (storedData) {
    const userDetail: TUserDetail = JSON.parse(storedData);
    return userDetail;
  }

  return null;
};

export const storedFinancialYear = (): TFinancialYear | null => {
  const storedData = localStorage.getItem('financialYear'); // Replace 'yourLocalStorageKey' with the actual key you used

  if (storedData) {
    const financialYearDetail: TFinancialYear = JSON.parse(storedData);
    return financialYearDetail;
  }

  return null;
};
