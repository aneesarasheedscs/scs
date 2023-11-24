import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { AccountData } from '../form/types';
import { TContraHistory, TContraVoucherHistory } from '../table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetContraVoucherTable = (enabled = true, params?: TContraHistory) => {
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
        params: { ...params, DocumentTypeId: 10, BranchId: 2, FinancialYearId: 2, CompanyId: 2, OrganizationId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
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
  const filteredData = rawData.filter((item: AccountData) => item.AccountTypeId === 2);
  const filteredData2 = rawData.filter((item: AccountData) => item.AccountTypeId === 15);
  return filteredData && filteredData2;
};

//   Select Fields Query

export const useGetContraCompanySelect = () => {
  return useQuery(
    'ContraCompany-Select',
    () => {
      return requestManager.get('/api/Company/GetAlldt?OrgCompanyTypeId=2', {
        params: { ...params, OrgCompanyTypeId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetContraBranchSelect = () => {
  return useQuery(
    'ContraBranch-Select',
    () => {
      return requestManager.get('/api/Branches/GetAll?OrganizationId=2&CompanyId=2', { params: { ...params } });
    },
    { cacheTime: 5000 }
  );
};

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