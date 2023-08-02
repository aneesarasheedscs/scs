import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';

export const useGetPurchaseOrder = () => {
  return useQuery('purchase-order', () => {
    return requestManager.post('/api/PurchaseOrder/GetByOrganizationCompanyId', {
      OrganizationId: 2,
      CompanyId: 2,
    });
  });
};
