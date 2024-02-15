import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { ReceivableReportTypeCriteria } from './type';
const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const FinancialYearId =storedFinancialYear
export const ReceivableReportQueryHistory = (enabled = true, params?: ReceivableReportTypeCriteria) => {
  return useQuery(
    'receivable-query',
    () => {
      return requestManager.post('/api/AccountsReports/Receivable', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        // financialYear:userDetail?.Id,
        DocumentTypeIds: 81,
        ...params,
      });
    },
    { enabled }
  );
};
