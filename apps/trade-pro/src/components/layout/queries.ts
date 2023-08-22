import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

export const useGetMenu = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'sidebar-menu',
    () => {
      return requestManager.get('/api/UserRights/GetUserRightsForViewbyUserId', {
        params: { EntryUser: userDetail?.UserId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
