import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TSavePaymentVoucher } from '../form/types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Get ById
export const useGetPaymentVoucherById = (Id?: number | null | any) => {
  return useQuery(
    ['PaymentVoucher-getById', Id],
    () => {
      return getBankPaymentVoucherById(Id);
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
const getBankPaymentVoucherById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};
export const useGetPaymentVoucherDetailById = (Id?: number | null | any) => {
  return useQuery(
    ['PaymentVoucher-detail-getById', Id],
    () => {
      return getBankPaymentVoucherDetailById(Id);
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
const getBankPaymentVoucherDetailById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};

// save form

export const useAddPaymentsVoucher = (DocumentTypeId?: number, params?: TSavePaymentVoucher) => {
  return useMutation(
    'Add-PaymentVoucher',
    (data: TSavePaymentVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        DocumentTypeId: DocumentTypeId,
        ...params,
      };

      return requestManager.post('/api/voucher/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          queryClient.invalidateQueries('PaymentVoucher-history');
          const msg = 'Record added successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdatePaymentsVoucher = (DocumentTypeId?: number, Id?: number | null, params?: TSavePaymentVoucher) => {
  console.log(Id);
  return useMutation(
    'Update-PaymentVoucher',
    (data: TSavePaymentVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        DocumentTypeId: DocumentTypeId,
        ...params,
      };
      return requestManager.post('/api/voucher/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          queryClient.invalidateQueries('PaymentVoucher-history');
          const msg = 'Record updated successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};