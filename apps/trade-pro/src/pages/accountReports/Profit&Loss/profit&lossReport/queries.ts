import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TProfitLossSearchCritaria } from './type';

const userDetail = storedUserDetail();

export const useGetProfitLossHistory = (otherparams?: TProfitLossSearchCritaria) => {
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
