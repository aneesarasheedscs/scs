import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

export const useGetPurchaseOrder = () => {
  return useQuery('purchase-order', () => {
    return requestManager.post('/api/InventoryReports/PurchaseOrderHistory', {
      DocumentTypeId: 41,
      CompanyId: userDetail?.CompanyId,
      OrganizationId: userDetail?.OrganizationId,
    });
  });
};

export const useGetSuppliers = () => {
  return useQuery('suppliers', () => {
    return requestManager.get('/api/SupplierCustomer/SupplierCustomerAgainstPurchaseOrder', {
      params: {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    });
  });
};

export const useGetItems = () => {
  return useQuery('items', () => {
    return requestManager.get('/api/Item/ItemsAgainstPurchaseOrder', {
      params: {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    });
  });
};

export const useGetOrderStatus = () => {
  return useQuery('order-status', () => {
    return requestManager.get('/api/CommonServices/OrderStatus', {
      params: {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    });
  });
};

export const useGetApprovedStatus = () => {
  return useQuery('approved-status', () => {
    return requestManager.get('/api/CommonServices/ApprovedStatus', {
      params: {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    });
  });
};
