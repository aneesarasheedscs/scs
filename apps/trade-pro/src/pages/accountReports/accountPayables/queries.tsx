import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TAccountPayablesBetweenPeriodSearchCriteria, TAccountPayablesSearchCriteria } from './table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetAccountPayablesTable = (enabled = false, params?: TAccountPayablesSearchCriteria) => {
  return useQuery(
    'AccountPayables-history',
    () => {
      return requestManager.post('/api/AccountsReports/DueByDatePayables', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Ids: params?.SelectedIds.toString(),
        // AccountIds:
        //   params?.SelectedAccountIds !== undefined && params?.SelectedAccountIds !== null
        //     ? params?.SelectedAccountIds?.toString()
        //     : null,

        ...params,
      });
    },
    { enabled }
  );
};

export const useGetAccountPayablesBetweenPeriodTable = (enabled = false, params?: TAccountPayablesSearchCriteria) => {
  return useQuery(
    'AccountPayablesBetweenPeriod-history',
    () => {
      return requestManager.post('/api/AccountsReports/AccountsPayablesByDueDateBetweenPeriod', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        // Ids: params?.SelectedIds.toString(),
        LanguageId: 0,
        ...params,
      });
    },
    { enabled }
  );
};

// //   Select Fields Query

export const useGetSupplierCustomer = () => {
  return useQuery(
    'SupplierCustome-Select',
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
