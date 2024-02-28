import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSaveContraVoucher } from '../form/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

//Get ById
export const useGetContraVoucherById = (Id?: string | null | any) => {
  return useQuery(
    ['contraVoucher-getById', Id],
    () => {
      return getContraVoucherById(Id);
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
const getContraVoucherById = (Id?: string | null) => {
  return requestManager.get(`/api/Voucher/GetByID`, { params: { Id } });
};
export const useGetContraVoucherDetailById = (Id?: string | null | any) => {
  return useQuery(
    ['contraVoucher-detail-getById', Id],
    () => {
      return getContraVoucherDetailById(Id);
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
const getContraVoucherDetailById = (Id?: string | null) => {
  return requestManager.get(`/api/Voucher/GetByID`, { params: { Id } });
};

// save form

export const useAddContraVoucher = (DocumentTypeId: number, params?: TSaveContraVoucher) => {
  return useMutation(
    'contraVoucher-add',
    (data: TSaveContraVoucher) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 3,
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
          queryClient.invalidateQueries('contraVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateContraVoucher = (Id?: number | null, DocumentTypeId?: number, params?: TSaveContraVoucher) => {
  return useMutation(
    'contraVoucher-update',
    (data: TSaveContraVoucher) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 3,
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
          queryClient.invalidateQueries('contraVoucher-history');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
