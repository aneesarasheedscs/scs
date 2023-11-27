import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';
import { TAllocateBrandItemToDiscTypeData } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Get FormHistory
export const useGetAllocateBrandItemToDiscTypeHistory = (enabled = true) => {
  return useQuery(
    'allocateBrandItemToDiscType_history',
    () => {
      return requestManager.get('/api/AllocateBrandItemToDiscType/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          BranchesId: userDetail?.BranchesId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Item Combo
export const useGetItemCombo = (enabled = true) => {
  return useQuery(
    'brand_item',
    () => {
      return requestManager.get('/api/Item/ReadAllItemsForBrands', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetDiscountTypeCombo = (enabled = true) => {
  return useQuery(
    'discount_types',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountTypes', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          BranchesId: 2,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Get ById
export const useGetAllocateBrandItemToDiscountTypeById = (Id?: number | null) => {
  return useQuery(
    ['brandItem_discount_type_get_byId', Id],
    () => {
      return getDiscountTypeById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: !!Id,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getDiscountTypeById = (Id?: number | null) => {
  return requestManager.get('/api/AllocateBrandItemToDiscType/GetByID', { params: { Id } });
};
//Save Brand Item To Discount Type
export const useAddAllocateBrandItemToDiscountType = (params?: TAllocateBrandItemToDiscTypeData) => {
  return useMutation(
    'add_allocate_brandItem_to_discount_type',
    (data: TAllocateBrandItemToDiscTypeData) => {
      return requestManager.post('/api/AllocateBrandItemToDiscType/Save', {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.ModifyUserId,
        ModifyDate: new Date().toISOString(),
        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allocateBrandItemToDiscType_history');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdateAllocateBrandItemToDiscountType = (
  Id?: number | null,
  params?: TAllocateBrandItemToDiscTypeData
) => {
  return useMutation(
    'update_allocate_brandItem_to_discount_type',

    (data?: TAllocateBrandItemToDiscTypeData) => {
      return requestManager.post('/api/AllocateBrandItemToDiscType/Save', {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.ModifyUserId,
        ModifyDate: new Date().toISOString(),
        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allocateBrandItemToDiscType_history');
        const msg = 'Record Updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
