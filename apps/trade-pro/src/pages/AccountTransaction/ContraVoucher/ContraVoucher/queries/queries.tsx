import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { AccountData } from '../form/types';
import { TContraHistory, TContraVoucherHistory, TSearchCriteria } from '../table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };
export const useGetAccountTitle = (enabled = true) => {
  return useQuery(
    'account-title-Contra',
    () => {
      return requestManager.post('/api/AccountsReports/LedgerByJobLotDropDownAndLists', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeIds: '10',
        // BranchesId: userDetail?.BranchesId,
        // FinancialYearId: financialYear?.Id,
      });
    },
    { enabled }
  );
};
export const useGetContraVoucherTable = (enabled = true, params?: TSearchCriteria) => {
  return useQuery(
    'contraVoucher-history',
    () => {
      return requestManager.post('/api/Voucher/VoucherFormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        Ids: '10',
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

// export const useGetVoucherNo = () => {
//   return useQuery(
//     'voucher-number',
//     () => {
//       return requestManager.get('/api/Voucher/GenerateVoucherCodeByDocumentTypeId', {
//         params: { ...params, DocumentTypeId: 10, BranchId: userDetail?.BranchesId, FinancialYearId: financialYear?.Id },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
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
export const useGetAccountsBalances = (accountId: number | null) => {
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

// Fetch credit and debit Account Logic

export const useGetContraCreditAccountSelect = () => {
  return useQuery('credit-accounts', GetContraCreditAccountSelect, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetContraCreditAccountSelect: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAll', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result;
  const filteredData = rawData.filter((item: AccountData) => item.AccountTypeId === 2 || item.AccountTypeId === 15);

  return filteredData;
};

//   Select Fields Query

export const useGetContraProjectSelect = () => {
  return useQuery(
    'ContraProject-Select',
    () => {
      return requestManager.get('/api/Projects/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetContraChequeNoSelect = (bankId: any) => {
  return useQuery(
    ['ContraChequeNo-Select', bankId],
    () => {
      return requestManager.get('/api/CheqBookHeader/OutstandingCheqNo', {
        params: { ...params, AccountId: bankId },
      });
    },
    { enabled: !!bankId }
  );
};

export const useGetContraJobLotSelect = () => {
  return useQuery(
    'ContraJobLot-Select',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', {
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
