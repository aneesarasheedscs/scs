import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TPurchaseOrderSearchCriteria } from '../type';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//Form History
export const itemSave = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'save',
    () => {
      return requestManager.post('/api/Item/Save', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,

        ...params,
      });
    },
    { enabled }
  );
};
