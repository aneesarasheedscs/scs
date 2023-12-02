import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { AccountReceivables, TAccountReceivablesSearchCriteria } from './table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetAccountReceivablesTable = (enabled = false, params?: TAccountReceivablesSearchCriteria) => {
  return useQuery(
    'AccountReceivables-history',
    () => {
      return requestManager.post('/api/AccountsReports/DueByDateReceivables', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Ids: params?.SelectedIds.toString(),
        AccountIds:
          params?.SelectedAccountIds !== undefined && params?.SelectedAccountIds !== null
            ? params?.SelectedAccountIds?.toString()
            : null,
        LanguageId: 0,
        ...params,
      });
    },
    { enabled }
  );
};

// //   Select Fields Query

export const useGetAccountReceivablesPartyGroup = () => {
  return useQuery(
    'AccountReceivables-PartyGroup-Select',
    () => {
      return requestManager.get('/api/CustomerGroup/GetByOrganizationCompanyId', {
        params: { ...params },
      });
    },
    {
      cacheTime: 5000,
    }
  );
};

export const useGetAccountReceivablesAccountTitle = () => {
  return useQuery('AccountReceivablesAccountTitle-Select', GetAccountReceivablesAccountTitle, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetAccountReceivablesAccountTitle: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
    params: {
      ...params,
      FinancialYearId: financialYear?.Id,
      LanguageId: 0,
      Account_Level: 3,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: AccountReceivables) => item.AccountClass == 2);
  return filteredData;
};
