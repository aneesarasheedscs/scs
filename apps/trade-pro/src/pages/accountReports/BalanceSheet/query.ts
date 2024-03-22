import { useQuery } from 'react-query';
import { TBalanceSheetSearchCritaria } from './types';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };
// Get Balance Sheet

export const useGetBalanceSheet2 = (paramss?: TBalanceSheetSearchCritaria) => {
  return useQuery(
    'balance-sheet2',
    () => {
      return requestManager.get('/api/AccountsReports/AccountsBalanceSheetStandardFormatII?FromDate=null', {
        params: { ...params, Status: true, ...paramss },
      });
    },
    { cacheTime: 5000 }
  );
};
