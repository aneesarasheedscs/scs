import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSaveCashPaymentVoucher } from '../form/types';
import { isNumber } from 'lodash';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

//Get ById
export const useGetCashPaymentVoucherById = (Id?: number | null | any) => {
  return useQuery(
    ['CashPaymentVoucher-getById', Id],
    () => {
      return getCashPaymentVoucherById(Id);
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
const getCashPaymentVoucherById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};
export const useGetCashPaymentVoucherDetailById = (Id?: number | null | any) => {
  return useQuery(
    ['CashPaymentVoucher-Detail-getById', Id],
    () => {
      return getCashPaymentVoucherByDetailId(Id);
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
const getCashPaymentVoucherByDetailId = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};

// save form

export const useAddCashPaymentVoucher = (params?: TSaveCashPaymentVoucher) => {
  return useMutation(
    'AddCpvVoucher',
    (data: TSaveCashPaymentVoucher) => {
      let dataToSubmit = {};
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
        DocumentTypeId: 1,
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
          const msg = 'Record saved successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('CashPaymentVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateCashPaymentVoucher = (RecId?: number | null, params?: TSaveCashPaymentVoucher) => {
  return useMutation(
    'Update_CashPayment',
    (data: TSaveCashPaymentVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Type: 0,
        Id: isNumber(RecId) ? RecId : 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        DocumentTypeId: 1,
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
          const msg = 'Record Updated successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('CashPaymentVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
