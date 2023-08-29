import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemCategory History
export const useGetItemCategoryHistory = (enabled = true, params?: TItemCategoryHistory) => {
  return useQuery(
    'ItemCategoryHistory',
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
export const useGetItemCategoryById = (Id?: number | null) => {
  return useQuery(
    ['Item-Category-ById', Id],
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
const getItemCategoryById = (Id?: number | null) => {
  return requestManager.get('/api/ItemCategory/GetByID', { params: { Id } });
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
