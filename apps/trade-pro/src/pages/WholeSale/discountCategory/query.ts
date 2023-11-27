import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { TDiscountCategoryData } from './types';
import { queryClient } from '@tradePro/configs';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

export const useGetDiscountCategoryHistory = (enabled = true) => {
  return useQuery(
    'discount_category',
    () => {
      return requestManager.get('/api/DiscountCategory/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          // BranchesId: userDetail?.BranchesId,
          BranchesId: 2,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Get ById
export const useGetDiscountCategoryById = (Id?: number | null) => {
  return useQuery(
    ['discount_category_get_byId', Id],
    () => {
      return getDiscountCategoryById(Id);
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
const getDiscountCategoryById = (Id?: number | null) => {
  return requestManager.get('/api/DiscountCategory/GetByID', { params: { Id } });
};
//Save Discount Category
export const useAddDiscountCategory = (params?: TDiscountCategoryData) => {
  return useMutation(
    'add_discount_category',
    (data: TDiscountCategoryData) => {
      return requestManager.post('/api/DiscountCategory/Save', {
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
        queryClient.invalidateQueries('discount_category');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdateDiscountCategory = (Id?: number | null, params?: TDiscountCategoryData) => {
  return useMutation(
    'update_discount_category',

    (data?: TDiscountCategoryData) => {
      return requestManager.post('/api/DiscountCategory/Save', {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
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
        queryClient.invalidateQueries('discount_category');
        const msg = 'Record Updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
