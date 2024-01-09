import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';
// import {   } from '../../queryOptions';
import { isNumber } from 'lodash';
import { storedUserDetail } from '@tradePro/utils/storageService';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Item-Category History
export const useGetItemCategoryHistory = (enabled = true, params?: TItemCategoryHistory) => {
  return useQuery(
    'Item-Category',
    () => {
      return requestManager.get('/api/ItemCategory/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Item getbyId
export const useGetItemCategoryById = (Id?: number) => {
  return useQuery(
    ['Item-Category-GetById', Id],
    () => {
      return getItemCategoryById(Id);
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
const getItemCategoryById = (Id?: number) => {
  return requestManager.get('/api/ItemCategory/GetByID', { params: { Id } });
};

export const useAddItemCategory = () => {
  return useMutation(
    'Item-Category',
    (data: TAddItemCategory) => {
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
      return requestManager.post('/api/ItemCategory/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-Category');
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

export const useUpdateItemCategory = (Id?: number, params?: TAddItemCategory) => {
  console.log(Id);

  return useMutation(
    'Item-Category',
    (data: TAddItemCategoryonUpdate) => {
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

      return requestManager.post('/api/ItemCategory/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-Category');
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

export type TItemCategoryHistory = {
  Id: number;
  CategoryCode: string;
  CategoryDescription: string;
  SerialFrom: number;
  SerialTo: number;
  InventoryParentCategoriesId: number;
  CategoryStatus: string;
  InvParentCateDescription: string;
  RevenueAccountId: number;
  InventoryAccountId: number;
  CGSAccountId: number;
  CGSAccountTitle: string;
  RevenueAccountTitle: string;
  InventoryAccountTitle: string;
  ClassGroupName: string;
};

export type TAddItemCategory = {
  CategoryStatus: boolean;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  CGSAccountId: number;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  InventoryAccountId: number;
  ModifyUser: number;
  OrganizationId: number;
  RevenueAccountId: number;
  SerialFrom: number;
  SerialTo: number;
  InventoryParentCategoriesId: number;
  accumulatedDepreciationAcId: number;
  DepreciationExpenseAcId: number;
  CapitalWipAcId: number;
  ItemClassGroupId: number;
  CategoryCode: string;
  CategoryDescription: string;
};
export type TAddItemCategoryonUpdate = {
  CategoryStatus: boolean;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  CGSAccountId: number;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  InventoryAccountId: number;
  ModifyUser: number;
  OrganizationId: number;
  RevenueAccountId: number;
  SerialFrom: number;
  SerialTo: number;
  InventoryParentCategoriesId: number;
  accumulatedDepreciationAcId: number;
  DepreciationExpenseAcId: number;
  CapitalWipAcId: number;
  ItemClassGroupId: number;
  CategoryCode: string;
  CategoryDescription: string;
};
