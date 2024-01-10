import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { isNumber } from 'lodash';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemType History
export const useGetItemTypeHistory = (enabled = true, params?: TItemTypeHistory) => {
  return useQuery(
    'Item-Type',
    () => {
      return requestManager.get('/api/ItemType/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Type: 0,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

//Item getbyId
export const useGetItemTypeById = (Id?: number) => {
  return useQuery(
    ['Item-Type', Id],
    () => {
      return getItemTypeById(Id);
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
const getItemTypeById = (Id?: number) => {
  return requestManager.get('/api/ItemType/GetByID', { params: { Id } });
};
export const useAddItemType = () => {
  return useMutation(
    'Item-Type',
    (data: TAddItemType) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        ModifyUser: userDetail?.UserName,
      };
      return requestManager.post('/api/ItemType/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-Type');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';

        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateItemType = (Id?: number) => {
  return useMutation(
    'Item-Type',
    (data: TAddItemTypeonUpdate) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      dataToSubmit = {
        ...data,
        Id: Id,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        ModifyUser: userDetail?.UserName,
      };

      return requestManager.post('/api/ItemType/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-Type');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';

        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export type TItemTypeHistory = {
  Id: number;
  TypeCode: string;
  TypeDescription: string;
  Type: number;
  EntryDate: Date;
  EntryUser: number;
  ModifyDate: Date;
  ModifyUser: number;
  PostDate: number | boolean;
  PostUser: number;
  PostState: boolean | string;
  OrganizationId: number;
  CompanyId: number;
  ItemCategoryId: number;
  LookupName: string | null;
};

export type TAddItemType = {
  PostState: number;
  Id: number;
  PostDate: string;
  Type: number;
  TypeCode: number;
  TypeDescription: string;
};
export type TAddItemTypeonUpdate = {
  PostState: number;
  Id: number;
  PostDate: string;
  Type: number;
  TypeCode: number;
  TypeDescription: string;
};
