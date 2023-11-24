import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetSuppliers = () => {
  return useQuery('suppliers', () => {
    return requestManager.get('/api/SupplierCustomer/SupplierCustomerAgainstPurchaseOrder', {
      params,
    });
  });
};

export const useGetItems = () => {
  return useQuery('items', () => {
    return requestManager.get('/api/Item/ItemsAgainstPurchaseOrder', { params });
  });
};

export const useGetOrderStatus = () => {
  return useQuery('order-status', () => {
    return requestManager.get('/api/CommonServices/OrderStatus', { params });
  });
};

export const useGetApprovedStatus = () => {
  return useQuery('approved-status', () => {
    return requestManager.get('/api/CommonServices/ApprovedStatus', { params });
  });
};

export const useGetDocNumberSaleOrder = () => {
  return useQuery(
    'doc-number-sale-order',
    () => {
      return requestManager.get(
        '/api/SaleOrder/GenerateSaleOrderCodeByDocId?OrganizationId=2&CompanyId=2&DocumentTypeId=81&FinancialYearId=2&BranchesId=2',
        {
          params: {
            ...params,
            BranchesId,
            OrganizationId,
            CompanyId,
            DocumentTypeId: 81,
            FinancialYearId: financialYear?.Id,
          },
        }
      );
    },
    { cacheTime: 5000 }
  );
};

export const useGetSubPartyAccount = () => {
  return useQuery('sub-party-account', () => {
    return requestManager.get(
      '/api/SupplierCustomer/GetSubPartiesByParentId?OrganizationId=2&CompanyId=2&ParentsSupCustId=0',
      {
        params: {
          ...params,
          ParentsSupCustId: 0,
        },
      }
    );
  });
};
export const useGetShiptToAddress = () => {
  return useQuery('ship-to-address', () => {
    return requestManager.get('/api/SupplierCustomer/GetforComboBinding?OrganizationId=2&CompanyId=2', {
      params: {
        ...params,
        OrganizationId,
        CompanyId,
      },
    });
  });
};

export const useGetDeliveryTerms = () => {
  return useQuery('delivery-term', () => {
    return requestManager.get('/api/CommonServices/DeliveryTerm', { params });
  });
};

export const useGetCustomerName = () => {
  return useQuery('customer-name', () => {
    return requestManager.get(
      '/api/SupplierCustomer/GetSubPartiesByParentId?OrganizationId=2&CompanyId=2&ParentsSupCustId=0',
      { params }
    );
  });
};

// export const useGetItemsWithBaseUom = () => {
//   return useQuery('items-base-uom', () => {
//     return requestManager.get('/api/Item/ItemsWithBaseUOM', { params });
//   });
// };

export const useGetJobLot = () => {
  return useQuery('job-lot', () => {
    return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params });
  });
};

export const useGetUomByItemId = (ItemId?: number | null) => () => {
  return useQuery(['uom', ItemId], () => {
    return requestManager.get('/api/UOMSchedule/SearchByObject', {
      params: { ...params, ItemId },
    });
  });
};
// export const useGetUomByItemId = (ItemId?: number | null) => () => {
//   return useQuery(
//     ['uom', ItemId],
//     () => {
//       return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
//     },
//     { enabled: !!ItemId }
//   );
// };
