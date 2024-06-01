import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';

export const useGetMenu = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'sidebar-menu',
    () => {
      return requestManager.post('/api/UserRights/GetViewRightsByUserId', {
        EntryUser: userDetail?.UserId,
        CompanyId: userDetail?.CompanyId,
      });
    },
    {
      cacheTime: userDetail?.expires_in,
      onError: (error: AxiosError) => {
        console.error('Error occurred:', error);
        notification.error({ description: '', message: error?.message });
      },
    }
  );
};
