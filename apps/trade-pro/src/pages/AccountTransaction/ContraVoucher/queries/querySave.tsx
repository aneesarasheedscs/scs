import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
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

// save form

export const useAddContraVoucher = (params?: TSaveContraVoucher) => {
  return useMutation(
    'contraVoucher-history',
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
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contraVoucher-history');
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

export const useUpdateContraVoucher = (Id?: string | null, params?: TSaveContraVoucher) => {
  return useMutation(
    'contraVoucher-history',
    (data: TSaveContraVoucher) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        RefAccountId: 21284,
        RefDocNoId: 21284,
        VoucherCode: 104,
        ChequeNo: '0',
        AgainstAccountId: 21493,
        DocumentTypeId: 10,
        VoucherAmount: 5000,
        ...params,
      };
      return requestManager.post('/api/Voucher/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contraVoucher-history');
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
