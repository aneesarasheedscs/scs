import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { SaleOrderRetailCriteria } from './type';
import { table } from 'console';

const userDetail = storedUserDetail();

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
// useGetItemDescription
export const useGetItemDescription = (enabled = true) => {
  return useQuery(
    'item-description',
    () => {
      return requestManager.get('api/ItemType/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
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
