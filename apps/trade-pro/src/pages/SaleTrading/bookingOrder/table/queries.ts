import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { SaleOrderRetailCriteria } from './type';
import { useQuery } from 'react-query';


const userDetail = storedUserDetail();

export const useGetBookingOrderStatus = (enabled = true, params?: any) => {
  return useQuery(
    'pre-booking-order-status',
    () => {
      return requestManager.post('/api/PreBookingOrder/PreBookingOrderDashboard_Detail', {
        SupplierCustomerId:0,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};


// useGetParentCategories
// params will pass tmorow
export const useGetParentCategories = (enabled = true) => {
  return useQuery(
    'parent-category',
    () => {
      return requestManager.get('api/ItemCategory/InventoryParentCategories', {});
    },
    { enabled }
  );
};
// useGetItemCategory
export const useGetItemCategory = (enabled = true) => {
  return useQuery(
    'item-category',
    () => {
      return requestManager.get('api/ItemCategory/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};
// useGetItemType
export const useGetItemDescription = (enabled = true) => {
  return useQuery(
    'item-description',
    () => {
      return requestManager.get('api/ItemType/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Type:15,
        },
      });
    },
    { enabled }
  );
};

// useGetItemNameCategories
export const useGetItemNameCategories = (enabled = true) => {
  return useQuery(
    'item-name',
    () => {
      return requestManager.get('api/Item/ItemsAgainstSaleOrder', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};
// useGetCustomerName
export const useGetCustomerName = (enabled = true) => {
  return useQuery(
    'customer-name',
    () => {
      return requestManager.get('api/SupplierCustomer/SupplierCustomerAgainstSaleOrder', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};
// useGetApprovedStatus
export const useGetApprovedStatus = (enabled = true) => {
  return useQuery(
    'approved-status',
    () => {
      return requestManager.get('api/CommonServices/ApprovedStatus', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};

// useGetOrderStatus
export const useGetOrderStatus = (enabled = true) => {
  return useQuery(
    'get-status',
    () => {
      return requestManager.get('api/CommonServices/OrderStatus', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};



export const useSalesReportTable = (enabled = true, params?: SaleOrderRetailCriteria) => {
  return useQuery(
    'saleOrder-table',
    () => {
      return requestManager.post('api/Inventory/SaleOrderRetailRegister', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 81,
        ...params,
      });
    },
    { enabled }
  );
};
