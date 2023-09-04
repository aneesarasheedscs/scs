import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemType History
export const useGetItemUOMHistory = (enabled = true, params?: TItemUOMeHistory) => {
  return useQuery(
    'ItemUOMHistory',
    () => {
      return requestManager.get('/api/UOM/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//
export const useGetItemUOMById = (Id?: number | null) => {
  return useQuery(
    ['ItemUOMById', Id],
    () => {
      return getItemUOMById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getItemUOMById = (Id?: number | null) => {
  return requestManager.get('/api/UOM/GetByID', { params: { Id } });
};

export type TItemUOMeHistory = {
  Id: number;
  UOMCode: string;
  UOMDescription: string;
  UOMSymbol: string;
  Equivalent: number;
  UOMStatus: boolean;
  EntryDate: string;
  EntryUser: number;
  ModifyDate: string;
  ModifyUser: number;
  OrganizationId: number;
  CompanyId: number;
};
