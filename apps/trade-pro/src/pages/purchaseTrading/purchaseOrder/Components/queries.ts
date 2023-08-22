import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

export const useGetSupplierCombo = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'supplier-combo',
    () => {
      return requestManager.get('api/SupplierCustomer/GetforComboBinding', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
// Delivery Term
export const useGetDeliveryTerm = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'delivery-terms',
    () => {
      return requestManager.get('api/CommonServices/DeliveryTerm', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Payment Term
export const useGetPaymentTerm = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'payment-terms',
    () => {
      return requestManager.get('/api/InvDueTerms/GetByOrganizationCompanyId', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Items
export const useGetItem = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'Items',
    () => {
      return requestManager.get('/api/Item/ItemsWithBaseUOM', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Job lot

export const useJobLot = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'Job/Lot',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

//Base Uom
export const useGetUom = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'Uom-Against-ItemId',
    () => {
      return requestManager.get('/api/UOMSchedule/SearchByObject', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ItemId: 4,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
