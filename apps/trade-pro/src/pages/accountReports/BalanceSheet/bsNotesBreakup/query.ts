import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useQuery } from 'react-query';
import { TBalanceSheetSearchCritaria } from '../types';

const userDetail = storedUserDetail();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];
const params = { CompanyId, OrganizationId };

export const useGetBalanceSheet2 = (paramss?: TBalanceSheetSearchCritaria) => {
  return useQuery(
    'balance-sheet',
    () => {
      return requestManager.get('/api/AccountsReports/AccountsBalanceSheetStandardFormatII', {
        params: { ...params, ...paramss },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetBalanceSheetAccountNote = () => {
  return useQuery(
    'account-notes',
    () => {
      return requestManager.get('/api/AccountNotes/GetAll', {});
    },
    { cacheTime: 5000 }
  );
};
export const useGetBalanceSheetPlNotes = () => {
  return useQuery(
    'pl-notes',
    () => {
      return requestManager.get('/api/AccountNotes/GetAll_PL', {});
    },
    { cacheTime: 5000 }
  );
};
