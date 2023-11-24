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
    return requestManager.get('/api/SupplierCustomer/SupplierCustomerAgainstGrn', {
      params,
    });
  });
};

export const useGetItems = () => {
  return useQuery('items', () => {
    return requestManager.get('/api/Item/ItemsAgainstGrn', { params });
  });
};

export const useGetWarehouseName = () => {
  return useQuery('warehouse-name', () => {
    return requestManager.get('/api/InvWareHouse/GetWareHouseAgainstGRN', { params });
  });
};

export const useGetGRNJobLot = () => {
  return useQuery('job-lot', () => {
    return requestManager.get('/api/JobLot/JobLotAgainstGRN', { params });
  });
};
export const useGetGRNCityName = () => {
  return useQuery('city-name', () => {
    return requestManager.get('/api/City/CityAgainstGRN', { params });
  });
};

// export const useGetDocumentNumber = () => {
//   return useQuery(
//     'document-number',
//     () => {
//       return requestManager.get('/api/PurchaseOrder/GeneratePurchaseOrderCodeByDocId', {
//         params: { ...params, BranchesId, DocumentTypeId: 41, FinancialYearId: financialYear?.Id },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };

// export const useGetPaymentTerms = () => {
//   return useQuery('payment-term', () => {
//     return requestManager.get('/api/InvDueTerms/GetByOrganizationCompanyId', { params });
//   });
// };

// export const useGetDeliveryTerms = () => {
//   return useQuery('delivery-term', () => {
//     return requestManager.get('/api/CommonServices/DeliveryTerm', { params });
//   });
// };

// export const useGetSupplierCustomer = () => {
//   return useQuery('supplier-customer', () => {
//     return requestManager.get('/api/SupplierCustomer/GetforComboBinding', { params });
//   });
// };

// export const useGetItemsWithBaseUom = () => {
//   return useQuery('items-base-uom', () => {
//     return requestManager.get('/api/Item/ItemsWithBaseUOM', { params });
//   });
// };

// export const useGetJobLot = () => {
//   return useQuery('job-lot', () => {
//     return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params });
//   });
// };

// export const useGetUomByItemId = (ItemId?: number | null) => () => {
//   return useQuery(
//     ['uom', ItemId],
//     () => {
//       return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
//     },
//     { enabled: !!ItemId }
//   );
// };
