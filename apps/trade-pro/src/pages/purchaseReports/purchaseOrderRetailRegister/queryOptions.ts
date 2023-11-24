import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { useQuery } from 'react-query';

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

export const useGetDocumentNumber = () => {
  return useQuery(
    'document-number',
    () => {
      return requestManager.get('/api/PurchaseOrder/GeneratePurchaseOrderCodeByDocId', {
        params: { ...params, BranchesId, DocumentTypeId: 41, FinancialYearId: financialYear?.Id },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetPaymentTerms = () => {
  return useQuery('payment-term', () => {
    return requestManager.get('/api/InvDueTerms/GetByOrganizationCompanyId', { params });
  });
};

export const useGetDeliveryTerms = () => {
  return useQuery('delivery-term', () => {
    return requestManager.get('/api/CommonServices/DeliveryTerm', { params });
  });
};

export const useGetSupplierCustomer = () => {
  return useQuery('supplier-customer', () => {
    return requestManager.get('/api/SupplierCustomer/GetforComboBinding', { params });
  });
};

export const useGetItemsWithBaseUom = () => {
  return useQuery('items-base-uom', () => {
    return requestManager.get('/api/Item/ItemsWithBaseUOM', { params });
  });
};

export const useGetJobLot = () => {
  return useQuery('job-lot', () => {
    return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', { params });
  });
};

export const useGetUomByItemId = (ItemId?: number | null) => () => {
  return useQuery(
    ['uom', ItemId],
    () => {
      return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
    },
    { enabled: !!ItemId }
  );
};
