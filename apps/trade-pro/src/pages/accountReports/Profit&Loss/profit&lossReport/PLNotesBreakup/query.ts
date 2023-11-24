import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useQuery } from 'react-query';
import { TProfitLossSearchCritaria } from '../type';

// const userDetail = storedUserDetail();

// const [BranchesId, CompanyId, OrganizationId] = [
//   userDetail?.BranchesId,
//   userDetail?.CompanyId,
//   userDetail?.OrganizationId,
// ];
// const params = { CompanyId, OrganizationId };

// export const useGetBalanceSheet2 = (paramss?: TProfitLossSearchCritaria) => {
//   return useQuery(
//     'balance-sheet',
//     () => {
//       return requestManager.get('/api/AccountsReports/AccountsBalanceSheetStandardFormatII', {
//         params: { ...params, ...paramss },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
// const userDetail = storedUserDetail();

export const useGetProfitLossBreakup = (otherparams?: TProfitLossSearchCritaria) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'profit-loss',
    () => {
      return requestManager.get('/api/AccountsReports/ProftLoss', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ...otherparams,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetProfitLossAccountNote = () => {
  return useQuery(
    'account-notes-PL',
    () => {
      return requestManager.get('api/AccountNotes/GetAll_PL ', {});
    },
    { cacheTime: 5000 }
  );
};
