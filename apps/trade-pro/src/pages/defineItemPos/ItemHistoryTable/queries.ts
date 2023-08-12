import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TPurchaseOrderSearchCriteria } from '../type';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

export const useGetPurchaseOrder = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'purchase-order',
    () => {
      return requestManager.post('/api/InventoryReports/PurchaseOrderHistory', {
        DocumentTypeId: 41,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};
