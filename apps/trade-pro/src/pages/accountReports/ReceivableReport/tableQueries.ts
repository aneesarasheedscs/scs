import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedUserDetail } from '@tradePro/utils/storageService';
import { ReceivableReportTypeCriteria } from './type';
const userDetail = storedUserDetail();

export const ReceivableReportQueryHistory = (enabled = true, params?: ReceivableReportTypeCriteria) => {
  return useQuery(
    'receivable-query',
    () => {
      return requestManager.post('/api/AccountsReports/Receivable', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 81,
        ...params,
      });
    },
    { enabled }
  );
};
