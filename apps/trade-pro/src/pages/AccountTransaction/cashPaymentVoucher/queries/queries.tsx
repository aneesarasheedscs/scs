import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { AccountData } from '../form/types';
import { TCashHistory, TSearchCriteria } from '../table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };
export const useGetAccountTitle = (enabled = true, params?: TCashHistory) => {
  return useQuery(
    'account-title-CPV',
    () => {
      return requestManager.post('/api/AccountsReports/LedgerByJobLotDropDownAndLists', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeIds: '1',
        // BranchesId: userDetail?.BranchesId,
        // FinancialYearId: financialYear?.Id,

        ...params,
      });
    },
    { enabled }
  );
};
export const useGetCashPaymentVoucherTable = (enabled = true, params?: TSearchCriteria) => {
  return useQuery(
    'CashPaymentVoucher-history',
    () => {
      return requestManager.post('/api/Voucher/VoucherFormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        Ids: '1',
        PostState: true,
        // NoOfRecords: 50,
        EntryDateTo: params?.DateType === 2 && params?.ToDate !== undefined ? params?.ToDate : '',
        EntryDateFrom: params?.DateType === 2 && params?.FromDate !== undefined ? params?.FromDate : '',
        ModifyDateTo: params?.DateType === 3 && params?.ToDate !== undefined ? params?.ToDate : '',
        ModifyDateFrom: params?.DateType === 3 && params?.FromDate !== undefined ? params?.FromDate : '',
        ApprovedDateTo: params?.DateType === 4 && params?.ToDate !== undefined ? params?.ToDate : '',
        ApprovedDateFrom: params?.DateType === 4 && params?.FromDate !== undefined ? params?.FromDate : '',
        ...params,
        FromDate:
          params?.FromDate === undefined ? financialYear?.Start_Period : params?.DateType === 1 ? params?.FromDate : '',
        ToDate: params?.ToDate === undefined ? financialYear?.End_Period : params?.DateType === 1 ? params?.ToDate : '',
        IsApproved:
          params?.ApprovedStatus === 'Approved' ? true : params?.ApprovedStatus === 'Not Approved' ? false : '',
        ApprovedFilter: params?.ApprovedStatus === 'All' ? 'All' : '',
      });
    },
    { enabled }
  );
};

// Voucher No

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

export const useGetAccountsBalance = (accountId: number | null) => {
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
// Fetch credit Account Logic

export const useGetCreditAccountSelect = () => {
  return useQuery(
    'credit-accounts-for-CPV',
    () => {
      return requestManager.get('/api/COAAllocation/GetDetailAccountByDocumentTypeId', {
        params: { ...params, DocumentTypeId: '1' },
      });
    },
    { cacheTime: 5000 }
  );
};

// Fetch debit Account Logic

export const useGetDebitAccountSelect = () => {
  return useQuery(
    'debit-accounts-for-CPV',
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

export const useGetCashPaymentCompanySelect = () => {
  return useQuery('CashPaymentCompany-Select', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: { ...params, OrgCompanyTypeId: 2 },
    });
  });
};

export const useGetCashPaymentBranchSelect = () => {
  return useQuery(
    'CashPaymentBranch-Select',
    () => {
      return requestManager.get('/api/Branches/GetAll', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCashPaymentProjectSelect = () => {
  return useQuery(
    'CashPaymentProject-Select',
    () => {
      return requestManager.get('/api/Projects/GetByOrganizationCompanyId', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCashPaymentTaxType = () => {
  return useQuery(
    'TaxTypes',
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

export const useGetCashPaymentJobLotSelect = () => {
  return useQuery(
    'CashPaymentJobLot-Select',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetTaxSchedule = (DocDate?: Date, TaxNameId?: number) => {
  return useQuery(
    'TaxSchedule',
    () => {
      return requestManager.get('/api/TaxScheduleMain/GetTaxSchedule', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          EffectedDate: DocDate,
          TaxNameId: TaxNameId,
        },
      });
    },
    { enabled: !!DocDate && !!TaxNameId, cacheTime: 5000 }
  );
};
