import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemCategory History
export const useGetItemCategoryHistory = (enabled = true, params?: TItemCategoryHistory) => {
  return useQuery(
    'getItemCategoryHistory',
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
