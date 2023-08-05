import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

export const useGetSupplier = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'Supplier-Purchase',
    () => {
      return requestManager.get('api/SupplierCustomer/SupplierCustomerAgainstPurchaseOrder', {
        params: { 
          OrganizationId: userDetail?.OrganizationId, 
          CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};


