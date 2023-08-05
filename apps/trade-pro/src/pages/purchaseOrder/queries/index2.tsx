import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

//api for items
export const useGetItem = () => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  
     
    return useQuery(
      'Items',
      () => {
        return requestManager.get('api/Item/ItemsAgainstPurchaseOrder', {
          params: { 
            OrganizationId: userDetail?.OrganizationId, 
            CompanyId: userDetail?.CompanyId },
        });
      },
      { cacheTime: userDetail?.expires_in }
    );
  };
// api for status   
  export const useGetStatus = () => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  
     
    return useQuery(
      'Status',
      () => {
        return requestManager.get('api/CommonServices/OrderStatus', {
          params: { 
            OrganizationId: userDetail?.OrganizationId, 
            CompanyId: userDetail?.CompanyId },
        });
      },
      { cacheTime: userDetail?.expires_in }
    );
  };

// api for approved
export const useGetApproved = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

   
  return useQuery(
    'approved',
    () => {
      return requestManager.get('api/CommonServices/ApprovedStatus', {
        params: { 
          OrganizationId: userDetail?.OrganizationId, 
          CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};