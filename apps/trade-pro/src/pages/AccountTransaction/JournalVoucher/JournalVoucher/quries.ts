import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TJournalVoucherData, TJournalVoucherHistory } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDocumentNumber = () => {
  return useQuery(
    'document-numbers',
    () => {
      return requestManager.get('/api/Voucher/GenerateVoucherCodeByDocumentTypeId', {
        params: { ...params, BranchId: 2, DocumentTypeId: 5, FinancialYearId: financialYear?.Id },
      });
    },
    { cacheTime: 5000 }
  );
};
export const useGetVoucherNo = (DocumentTypeId: number) => {
  return useQuery(
    ['voucher-number', DocumentTypeId],
    () => {
      return requestManager.get('/api/Voucher/GenerateVoucherCodeByDocumentTypeId', {
        params: {
          ...params,
          DocumentTypeId: DocumentTypeId,
          BranchId: userDetail?.BranchesId,
          FinancialYearId: financialYear?.Id,
          CompanyId: userDetail?.CompanyId,
          OrganizationId: userDetail?.OrganizationId,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
export const useGetAccountsCombo = () => {
  return useQuery('credit-account', () => {
    return requestManager.get('/api/COAAllocation/AccountsComboFill', {
      params,
    });
  });
};
export const useGetAccountsBalances = (accountId: number) => {
  return useQuery(
    ['Accounts-Balances', accountId],
    () => {
      return requestManager.get('/api/Voucher/ReadBalanceBySelectedAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          RefAccountId: accountId,
          VoucherDate: new Date(),
        },
      });
    },
    { enabled: !!accountId }
  );
};
//history
export const useGetJournalVocherHistory = (enabled = true, params?: TJournalVoucherHistory) => {
  return useQuery(
    'journal_voucher',
    () => {
      return requestManager.post('/api/Voucher/VoucherFormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        Ids: '5',
        PostState: true,
        NoOfRecords: 50,
        ...params,
      });
    },
    { enabled }
  );
};
//Get ById
export const useGetJournalVoucherById = (Id?: number | null) => {
  return useQuery(
    ['contraVoucher-getById', Id],
    () => {
      return getJournaloucherById(Id);
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

const getJournaloucherById = (Id?: number | null) => {
  return requestManager.get(`/api/Voucher/GetByID`, { params: { Id } });
};
export const useAddJournalVoucher = (params?: TJournalVoucherData) => {
  return useMutation(
    'journal_voucher',
    (data: TJournalVoucherData) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 3,
        DocumentTypeId: 5,
        DocumentTypeSrNo: 0,
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
        queryClient.invalidateQueries('journal_voucher');
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
export const useUpdateJournalVoucher = (Id?: number | null, params?: TJournalVoucherData) => {
  return useMutation(
    'update_journal_voucher',
    (data: TJournalVoucherData) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 3,
        DocumentTypeId: 5,
        DocumentTypeSrNo: 0,
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
        queryClient.invalidateQueries('update_journal_voucher');
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
