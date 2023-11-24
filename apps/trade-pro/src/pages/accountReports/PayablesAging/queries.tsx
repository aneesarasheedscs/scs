import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { PayablesAgingSearchCriteria } from './type';

const userDetail = storedUserDetail();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
export const useGetPayableAgingRegister = (enabled = true, params?: PayablesAgingSearchCriteria) => {
  return useQuery(
    'PayablesAging_History',
    () => {
      return requestManager.post('/api/AccountsReports/PayableAging', {
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};
