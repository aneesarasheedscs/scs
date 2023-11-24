import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TSaveExpenseVoucher } from '../form/types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Get ById
export const useGetExpenseVoucherById = (Id?: number | null) => {
  return useQuery(
    ['ExpenseVoucher-getById', Id],
    () => {
      return getExpenseVoucherById(Id);
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
const getExpenseVoucherById = (Id?: number | null) => {
  return requestManager.get(`/api/Voucher/GetByID`, { params: { Id } });
};

// save form

export const useAddExpenseVoucher = (params?: TSaveExpenseVoucher) => {
  return useMutation(
    'ExpenseVoucher-history',
    (data: TSaveExpenseVoucher) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ExpenseVoucher-history');
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

export const useUpdateExpenseVoucher = (Id?: number | null, params?: TSaveExpenseVoucher) => {
  console.log(Id);
  return useMutation(
    'ExpenseVoucher-history',
    (data: TSaveExpenseVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ExpenseVoucher-history');
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
