import { useQuery } from 'react-query';
import { TPurchaseOrderSearchCriteria } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();

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
