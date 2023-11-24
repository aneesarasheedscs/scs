import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemType History
export const useGetItemUOMHistory = (enabled = true) => {
  return useQuery(
    'Item-UOM',
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
export const useGetItemUOMById = (Id?: number) => {
  return useQuery(
    ['Item-UOM', Id],
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
const getItemUOMById = (Id?: number) => {
  return requestManager.get('/api/UOM/GetByID', { params: { Id } });
};

export const useGetUOMAdd = () => {
  return useMutation(
    'Item-UOM',
    (data: TBaseUOM) => {
      return requestManager.get('/api/UOM/GetByID', {
        params: {
          ...data,
          Id: 1,
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          EntryDate: new Date().toISOString(),
          ModifyDate: new Date().toISOString(),
          ModifyUser: userDetail?.UserName,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('uom-save');

        notification.success({
          description: 'UOM added successfully!',
          message: 'Success',
        });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useGetUOMUpdate = (Id?: number) => {
  return useMutation(
    'Item-UOM',
    (data: TBaseUOMonUpdate) => {
      return requestManager.get('/api/UOM/GetByID', {
        params: {
          ...data,
          Id: Id,
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          EntryDate: new Date().toISOString(),
          ModifyDate: new Date().toISOString(),
          ModifyUser: userDetail?.UserName,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('uom-save');

        notification.success({
          description: 'UOM Updated successfully!',
          message: 'Success',
        });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
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
export type TBaseUOM = {
  UOMStatus: boolean;
  EntryDate: string;
  ModifyDate: string;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  ModifyUser: number;
  OrganizationId: number;
  UOMCode: string;
  UOMDescription: string;
  UOMSymbol: string;
  Equivalent: number;
};
export type TBaseUOMonUpdate = {
  UOMStatus: boolean;
  EntryDate: string;
  ModifyDate: string;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  ModifyUser: number;
  OrganizationId: number;
  UOMCode: string;
  UOMDescription: string;
  UOMSymbol: string;
  Equivalent: number;
};
