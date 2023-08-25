import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TPurchaseOrderSearchCriteria } from '../type';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Form History
export const useGetItemHistory = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'form-history',
    () => {
      return requestManager.post('/api/Item/FormHistory', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        EntryUser: financialYear?.EntryUser,
        CanViewAllRecord: true,
        ...params,
      });
    },
    { enabled }
  );
};
