import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';
import { TAllocateDiscCategoryToDiscTypeData } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Get FormHistory
export const useGetAllocateDiscCategoryToDiscTypeHistory = (enabled = true) => {
  return useQuery(
    'allocateDiscCategoryToDiscType_history',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/FormHistory', {
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
export const useGetDiscountCategoryCombo = (enabled = true) => {
  return useQuery(
    'discount_category',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountCategories', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          //   BranchesId: userDetail?.BranchesId,
          BranchesId: 2,
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
          //   BranchesId: userDetail?.BranchesId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Get ById
export const useGetAllocateDiscCategoryToDiscTypeById = (Id?: number | null) => {
  return useQuery(
    ['discCategory_to_discount_type_get_byId', Id],
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
  return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetByID', { params: { Id } });
};
//Save  Disc Category To Discount Type
export const useAddAllocateDiscCategoryToDiscType = (params?: TAllocateDiscCategoryToDiscTypeData) => {
  return useMutation(
    'add_allocate_disc_category_to_discount_type',
    (data: TAllocateDiscCategoryToDiscTypeData) => {
      return requestManager.post('/api/AllocateDiscCategoryToDiscType/Save', {
        ...data,
        Id: 0,
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
        queryClient.invalidateQueries('allocateDiscCategoryToDiscType_history');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdateAllocateDiscCategoryToDiscType = (
  Id?: number | null,
  params?: TAllocateDiscCategoryToDiscTypeData
) => {
  return useMutation(
    'update_allocate_disc_category_to_discount_type',

    (data?: TAllocateDiscCategoryToDiscTypeData) => {
      return requestManager.post('/api/AllocateDiscCategoryToDiscType/Save', {
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
        queryClient.invalidateQueries('allocateDiscCategoryToDiscType_history');
        const msg = 'Record Updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
