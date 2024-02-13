import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TSaveExpenseVoucher } from '../form/types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Get ById
export const useGetExpenseVoucherById = (Id?: number | null | any) => {
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
export const useGetExpenseVoucherDetail = (Id?: number | null | any) => {
  return useQuery(
    ['ExpenseVoucher-detail-getById', Id],
    () => {
      return getExpenseVoucherDetail(Id);
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
const getExpenseVoucherDetail = (Id?: number | null) => {
  return requestManager.get(`/api/Voucher/GetByID`, { params: { Id } });
};

// save form

export const useAddExpenseVoucher = (DocumentTypeId?: number, params?: TSaveExpenseVoucher) => {
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
        DocumentTypeId: DocumentTypeId,
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record added successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('ExpenseVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateExpenseVoucher = (Id?: number | null, DocumentTypeId?: number, params?: TSaveExpenseVoucher) => {
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
        DocumentTypeId: DocumentTypeId,
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record updated successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('ExpenseVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
