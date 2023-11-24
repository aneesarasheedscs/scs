import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TGRNDetailTable, TGRNLoadOrderSearchCriteria, TGRNSearchCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGRNPurchaseOrderLoadTable = (enabled = false, params?: TGRNLoadOrderSearchCriteria) => {
  return useQuery(
    'GRN-Load-table',
    () => {
      return requestManager.post('/api/PurchaseOrder/LoadPurchaseOrderRetail', {
        DocumentTypeId: 41,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        FinancialYearId: financialYear?.Id,
        ...params,
      });
    },
    { enabled }
  );
};
export const useGRNDetailTable = (enabled = true, params?: TGRNSearchCriteria) => {
  return useQuery(
    'GRN-History-table',
    () => {
      return requestManager.post('/api/InvGrn/GetHistoryRecord', {
        DocumentTypeId: 46,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        FinancialYearId: financialYear?.Id,
        BranchesId: userDetail?.BranchesId,
        EntryUser: financialYear?.EntryUser,
        NoOfRecords: 50,
        CanViewAllRecord: true,
        ...params,
      });
    },
    { enabled }
  );
};
