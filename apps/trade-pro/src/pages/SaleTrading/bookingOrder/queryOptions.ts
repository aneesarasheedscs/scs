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

// export const useGetDocNumberBookingOrder = () => {
//   return useQuery(
//     'doc-number-booking-order',
//     () => {
//       return requestManager.get(
//         '/api/PreBookingOrder/GenerateDocNo',
//         {
//           params: {
//             ...params,
//             OrganizationId,
//             CompanyId,
//             DocumentTypeId: 129,
//             FinancialYearId: financialYear?.Id,
//           },
//         }
//       );
//     },
//     { cacheTime: 5000 }
//   );
// };

export const useGetDocNumberBookingOrder = (enabled = true, params?: any) => {
  return useQuery(
    'doc-number-booking-order',
    () => {
      return requestManager.post('/api/PreBookingOrder/GenerateDocNo', {
        ...params,
                    OrganizationId,
                    CompanyId,
                    DocumentTypeId: 129,
                    FinancialYearId: financialYear?.Id,
      });
    },
    { enabled }
  );
};
export const useGetSubPartyAccount = (ParentsSupCustId: number | null) => () => {
  return useQuery(
    ['sub-party-account', ParentsSupCustId],

    () => {
      return requestManager.get('/api/SupplierCustomer/GetSubPartiesByParentId', {
        params: {
          ...params,
          ParentsSupCustId,
        },
      });
    },
    { enabled: !!ParentsSupCustId }
  );
};
export const useGetShiptToAddress = (SupplierId: number | null) => () => {
  return useQuery(
    ['Ship-to-address', SupplierId],
    () => {
      return requestManager.get('/api/SupplierCustomerShipToAddress/GetDataBySupplierId', {
        params: {
          ...params,
          SupplierId,
        },
      });
    },
    { enabled: !!SupplierId }
  );
};

export const useGetBranch = (CompanyId: number | null) => () => {
  return useQuery(
    ['branch', CompanyId],
    () => {
      return requestManager.get('/api/UserAccountAllocation/GetBranchesByUserId', {
        params: { CompanyId, UserAccountId: userDetail?.UserId },
      });
    },
    { enabled: !!CompanyId }
  );
};

export const useGetDeliveryTerms = () => {
  return useQuery('delivery-term', () => {
    return requestManager.get('/api/CommonServices/DeliveryTerm', { params });
  });
};

export const useGetCustomerNameSalesManAgent = () => {
  return useQuery('customer-name', () => {
    return requestManager.get('/api/SupplierCustomer/GetforComboBinding', {
      params,
    });
  });
};
export const useGetItemsWithBaseUom = () => {
  return useQuery('items-base-uom', () => {
    return requestManager.get('/api/Item/ItemsWithBaseUOM', { params });
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
