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
