import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TrialBalanceSearchCriteria } from './tyes';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetTrialBalanceReport = (enabled = true, params?: TrialBalanceSearchCriteria) => {
  return useQuery(
    'trial-balance',
    () => {
      return requestManager.post('/api/AccountsReports/TrialBalance', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        IsApproved: params?.ApprovedFilter == 'All' ? false : true,
        ...params,
      });
    },
    { enabled }
  );
};
