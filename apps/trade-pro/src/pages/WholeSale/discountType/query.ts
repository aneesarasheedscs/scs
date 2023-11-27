import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { TDiscountTypeData } from './types';
import { queryClient } from '@tradePro/configs';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

export const useGetDiscountTypeHistory = (enabled = true) => {
  return useQuery(
    'discount_type',
    () => {
      return requestManager.get('/api/DiscountType/FormHistory', {
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
//Get ById
export const useGetDiscountTypeById = (Id?: number | null) => {
  return useQuery(
    ['discount_type_get_byId', Id],
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
  return requestManager.get('/api/DiscountType/GetByID', { params: { Id } });
};
//Save Discount Type
export const useAddDiscountType = (params?: TDiscountTypeData) => {
  return useMutation(
    'add_discount_type',
    (data: TDiscountTypeData) => {
      return requestManager.post('/api/DiscountType/Save', {
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
        queryClient.invalidateQueries('discount_type');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdateDiscountType = (Id?: number | null, params?: TDiscountTypeData) => {
  return useMutation(
    'update_discount_type',

    (data?: TDiscountTypeData) => {
      return requestManager.post('/api/DiscountType/Save', {
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
        queryClient.invalidateQueries('discount_type');
        const msg = 'Record Updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
