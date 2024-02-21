import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosError, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { AccountData, TBillsReceivable } from './types';
import { queryClient } from '@scs/configs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetBillsPayablesAccountsVoucherTable = (enabled = true, params?: any) => {
  return useQuery(
    'bills-receivable-history',
    () => {
      return requestManager.post('/api/Voucher/VoucherFormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        Ids: '7',
        PostState: true,
        // NoOfRecords: 50,
        ...params,
      });
    },
    { enabled }
  );
};
// Get ById
export const useGetBillsReceivableVoucherById = (Id?: number | null | any) => {
  return useQuery(
    ['Bills-Receivable-getById', Id],
    () => {
      return getBillsPayableVoucherById(Id);
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
const getBillsPayableVoucherById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};
export const useGetBillsReceivableAccountsDetailById = (Id?: number | null | any) => {
  return useQuery(
    ['bills-receivable-accounts-detail-getById', Id],
    () => {
      return getBillsReceivableAccountsDetailById(Id);
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
const getBillsReceivableAccountsDetailById = (Id?: number | null) => {
  return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
};
// Get Voucher No
export const useGetVoucherNo = (DocumentTypeId: number) => {
  return useQuery(
    ['voucher-number', DocumentTypeId],
    () => {
      return requestManager.get('/api/Voucher/GenerateVoucherCodeByDocumentTypeId', {
        params: {
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

// Get Project
export const useGetBPAProjectSelect = () => {
  return useQuery(
    'BRA_Project',
    () => {
      return requestManager.get('/api/Projects/GetByOrganizationCompanyId', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};
//Get Account Select
export const useGetCreditAccountSelect = () => {
  return useQuery('credit-accounts-for-BillsPayable', GetCreditAccountSelect, {
    cacheTime: userDetail?.expires_in,
  });
};

const GetCreditAccountSelect: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAll', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: AccountData) => ![2, 15].includes(item.AccountTypeId));

  return filteredData;
};
//Get JobLot Select
export const useGetBPAJobLotSelect = () => {
  return useQuery(
    'JobLot-for-bills-receivable',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};
//Get Accounts Balances
export const useGetAccountsBalance = (accountId: number) => {
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
//Get TaxSchedule
export const useGetTaxSchedule = (DocDate?: Date, TaxNameId?: number) => {
  return useQuery(
    'TaxSchedule',
    () => {
      return requestManager.get('/api/TaxScheduleMain/GetTaxSchedule', {
        params: { ...params, EffectedDate: DocDate, TaxNameId: TaxNameId },
      });
    },
    { enabled: !!DocDate && !!TaxNameId, cacheTime: 5000 }
  );
};

export const useAddBillsReceivablesVoucher = (DocumentTypeId?: number, params?: TBillsReceivable) => {
  return useMutation(
    'add-bills-receivable',
    (data: TBillsReceivable) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: 0,
        Type: 'JournalDebit',
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
          queryClient.invalidateQueries('bills-receivable-history');
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

export const useUpdateBillsReceivablesVoucher = (
  DocumentTypeId?: number,
  Id?: number | null,
  params?: TBillsReceivable
) => {
  console.log(Id);
  return useMutation(
    'update-bills-receivable',
    (data: TBillsReceivable) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        Type: 'JournalDebit',
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
          queryClient.invalidateQueries('bills-receivable-history');
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
