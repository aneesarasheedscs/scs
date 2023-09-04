import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemType History
export const useGetItemTypeHistory = (enabled = true, params?: TItemTypeHistory) => {
  return useQuery(
    'ItemTypeHistory',
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
