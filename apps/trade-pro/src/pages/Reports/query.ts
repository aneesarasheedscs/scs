import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { queryClient } from '@tradePro/configs';
import { TAddtoFavoriteScreens } from './types';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();

export const useGetMenu = () => {
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
export const useGetFavouiteScreens = () => {
  return useQuery(
    'favorite-screens',
    () => {
      return requestManager.get('/api/FavoriteScreens/ReadByUserId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          UserId: userDetail?.UserId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetDeleteFavouiteScreens = (enabled = false, ScreenName?: any) => {
  return useQuery(
    ['delete-favorite-screens', ScreenName],
    () => {
      return requestManager.get('/api/FavoriteScreens/DeleteByScreenNameAndUserId', {
        params: {
          ScreenName: ScreenName,
          UserId: userDetail?.UserId,
        },
      });
    },
    {
      cacheTime: userDetail?.expires_in,
      enabled: !!ScreenName,
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('favorite-screens');
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Report UnFavorite Successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useAddFavoriteScreens = (params?: TAddtoFavoriteScreens) => {
  return useMutation(
    'add-favorite-screens',
    (data: TAddtoFavoriteScreens) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        UserId: userDetail?.UserId,
        ...params,
      };
      return requestManager.post('/api/FavoriteScreens/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('favorite-screens');
        // queryClient.invalidateQueries('sidebar-menu');
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Report Added to Favorite Screens!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
