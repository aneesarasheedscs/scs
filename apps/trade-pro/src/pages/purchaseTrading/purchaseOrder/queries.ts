import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';

export const useGetPurchaseOrder = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('purchase-order', 
  () => {
    return requestManager.post("api/InventoryReports/PurchaseOrderHistory",  {
        OrganizationId : userDetail?.OrganizationId, 
        CompanyId: userDetail?.CompanyId, 
        DocumentTypeId: 41,
       
    });
  },
  { cacheTime: userDetail?.expires_in }
  );
};
