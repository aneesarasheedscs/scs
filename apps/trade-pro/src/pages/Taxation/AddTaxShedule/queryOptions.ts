import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { Id } from 'react-flags-select';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };
// add tax type
export const useGetTaxSheduleType = () => {
  return useQuery('AddTx-shedule', () => {
    return requestManager.get('/api/TaxesTypes/GetByOrganizationCompanyId', { params });
  });
};
export const useGetGLAccount = () => {
  return useQuery('GL-account', () => {
    return requestManager.get('/api/COAAllocation/GetAllList', { params });
  });
};

// add tax shedule

export const useGetAddTaxShedule = () => {
  return useQuery(
    'addTx-sheduleType',
    () => {
      return requestManager.get('/api/TaxesTypes/GetByOrganizationCompanyId', {
        params: { ...params, BranchesId, DocumentTypeId: 41, FinancialYearId: financialYear?.Id },
      });
    },
    { cacheTime: 5000 }
  );
};
// Item tax shedule
export const useGetItemTaxSheduleItamName = () => {
  return useQuery('itemTx-name', () => {
    return requestManager.get('/api/Item/GetByOrganizationCompanyId', { params });
  });
};
export const useGetItemTaxSheduleType = () => {
  return useQuery('ItemTax-type', () => {
    return requestManager.get('/api/TaxesTypes/GetForComboBind', { params });
  });
};

export const useGetDocumentNumber = () => {
  return useQuery('ItemTax-type', () => {
    return requestManager.get('/api/InvStockAdjustment/GenerateCode', { params });
  });
};
// get IsActive DatePicker API
export const useGetItemTaxSheduleIsActiveRadio = () => {
  return useQuery('IsActive-btn', () => {
    return requestManager.get('/api/ItemTaxSchedule/GetByID', { params });
  });
};
