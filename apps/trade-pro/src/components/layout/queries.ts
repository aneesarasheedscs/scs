import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { loggedInUserDetailAtom } from '@tradePro/pages/login/atom';

export const useGetMenu = () => {
  const [userDetail] = useAtom(loggedInUserDetailAtom);
  return useQuery(
    'sidebar-menu',
    () => {
      requestManager.get('api/UserRights/GetUserRightsForViewbyUserId', {
        params: { EntryUser: 2, CompanyId: 2 },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
