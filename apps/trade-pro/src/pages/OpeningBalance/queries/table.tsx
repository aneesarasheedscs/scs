import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { useQuery } from 'react-query';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  //   userDetail?.FinancialYearId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];
const params = { CompanyId, OrganizationId };
export const useGetOpeningBalanceTable = () => {
  return useQuery(
    'Account_opening_balance',
    () => {
      return requestManager.get('/api/AccountsOpeningBalances/GetByOrganizationCompanyId', {
        params: {
          FinancialYearId: 2,
          OrganizationId: 2,
          CompanyId: 2,
          // ...params,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
// select fields
export const useGetOpeningBalance = () => {
  return useQuery(
    'Credit_Account',
    () => {
      return requestManager.get('/api/AccountsOpeningBalances/GetByOrganizationCompanyId', {
        params: { ...params, FinancialYearId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};
