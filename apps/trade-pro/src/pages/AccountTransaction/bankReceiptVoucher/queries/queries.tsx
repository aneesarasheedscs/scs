import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TBankHistory } from '../table/types';
import { AxiosResponse } from 'axios';
import { AccountData } from '../form/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetBankReceiptVoucherTable = (enabled = true, params?: TBankHistory) => {
  return useQuery(
    'bankReceiptVoucher-history',
    () => {
      return requestManager.post('/api/Voucher/VoucherFormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        Ids: '4',
        PostState: true,
        NoOfRecords: 50,
        ...params,
      });
    },
    { enabled }
  );
};

// Voucher No

export const useGetVoucherNo = () => {
  return useQuery(
    'voucher-number',
    () => {
      return requestManager.get('/api/Voucher/GenerateVoucherCodeByDocumentTypeId', {
        params: { ...params, DocumentTypeId: 2, BranchId: 2, FinancialYearId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetAccountsBalance = (accountId: number) => {
  return useQuery(
    ['Accounts-Balance', accountId],
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

// Fetch debit Account Logic

export const useGetDebitAccountSelect = () => {
  return useQuery(
    'debit-accounts',
    () => {
      return requestManager.get('/api/COAAllocation/GetDetailAccountByDocumentTypeId', {
        params: { ...params, DocumentTypeId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

// Fetch credit Account Logic

export const useGetCreditAccountSelect = () => {
  return useQuery(
    'credit-accounts',
    () => {
      return requestManager.get('/api/COAAllocation/GetAll', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetConfigration = (configDescription: any) => {
  return useQuery(
    ['configurations', configDescription],
    () => {
      return requestManager.get('/api/ConfigrationsAllocation/GetConfigurationByOrgCompandConfigDescription', {
        params: { ...params, ConfigDescription: configDescription },
      });
    },
    { cacheTime: 5000 }
  );
};

//   Select Fields Query

export const useGetBankReceiptCompanySelect = () => {
  return useQuery(
    'BankReceiptCompany-Select',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: { ...params, OrgCompanyTypeId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetBankReceiptBranchSelect = () => {
  return useQuery(
    'BankReceiptBranch-Select',
    () => {
      return requestManager.get('/api/Branches/GetAll', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetBankReceiptProjectSelect = () => {
  return useQuery(
    'BankReceiptProject-Select',
    () => {
      return requestManager.get('/api/Projects/GetByOrganizationCompanyId', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetBankReceiptTaxType = () => {
  return useQuery(
    'BankReceipt-Tax',
    () => {
      return requestManager.get('/api/TaxesTypes/GetForComboBind', { params: { ...params, Type: 1 } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetWHTAgainstAcSelect = () => {
  return useQuery('WHTAgainst-Ac', GetWHTAgainstAcSelect, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetWHTAgainstAcSelect: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAll', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: AccountData) => ![2, 11, 15].includes(item.AccountTypeId));

  return filteredData;
};

export const useGetChequeNoSelect = (bankId: any) => {
  return useQuery(
    ['ChequeNo-Select', bankId],
    () => {
      return requestManager.get('/api/CheqBookHeader/OutstandingCheqNo', {
        params: { ...params, AccountId: bankId },
      });
    },
    { enabled: !!bankId }
  );
};

export const useGetBankReceiptJobLotSelect = () => {
  return useQuery(
    'BankReceiptJobLot-Select',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetTaxSchedule = () => {
  return useQuery(
    'TaxSchedule',
    () => {
      return requestManager.get('/api/TaxScheduleMain/GetTaxSchedule', {
        params: { ...params, EffectedDate: '2023-09-12', TaxNameId: 11 },
      });
    },
    { cacheTime: 5000 }
  );
};
