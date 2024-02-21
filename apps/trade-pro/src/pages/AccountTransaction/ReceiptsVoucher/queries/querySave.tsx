import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TSaveReceiptsVoucher } from '../form/types';
import { queryClient } from '@tradePro/configs/index';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Get ById
export const useGetBankReceiptVoucherById = (Id?: number | null | any) => {
  return useQuery(
    ['ReceiptsVoucher-getById', Id],
    () => {
      return getBankReceiptVoucherById(Id);
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
const getBankReceiptVoucherById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};
export const useGetBankReceiptVoucherDetailById = (Id?: number | null | any) => {
  return useQuery(
    ['ReceiptsVoucher-detail-getById', Id],
    () => {
      return getBankReceiptVoucherDetailById(Id);
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
const getBankReceiptVoucherDetailById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};

// save form

export const useAddReceiptsVoucher = (DocumentTypeId?: number | null, params?: TSaveReceiptsVoucher) => {
  return useMutation(
    'ReceiptsVoucher-add',
    (data: TSaveReceiptsVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 1,
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
          queryClient.invalidateQueries('ReceiptsVoucher-history');
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

export const useUpdateReceiptsVoucher = (
  Id?: number | null,
  DocumentTypeId?: number | null,
  params?: TSaveReceiptsVoucher
) => {
  console.log(Id);
  return useMutation(
    'ReceiptsVoucher-update',
    (data: TSaveReceiptsVoucher) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 1,
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
          queryClient.invalidateQueries('ReceiptsVoucher-history');
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
