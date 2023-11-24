import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TGRNSearchCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGRNDetailTableHistory = (enabled = false, params?: TGRNSearchCriteria) => {
  return useQuery(
    'GRN-historyTable',
    () => {
      return requestManager.post('/api/Inventory/GrnRetailRegister', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};
