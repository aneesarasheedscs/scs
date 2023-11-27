import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { Id } from 'react-flags-select';
import { TItemTaxShedule } from './type';

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
// Item tax shedule
export const useGetItemTaxSheduleItamName = () => {
  return useQuery('itemTx-name', () => {
    return requestManager.get('/api/Item/GetByOrganizationCompanyId', { params });
  });
};
export const useGetItemTaxSheduleType = () => {
  return useQuery('ItemTax-type', () => {
    return requestManager.get('/api/TaxesTypes/GetForComboBind', {
      params,
    });
  });
};

// get IsActive DatePicker API
export const useGetItemTaxSheduleGetById = (Id: number | null) => {
  return useQuery(
    ['getBy-Id', Id],
    () => {
      return requestManager.get('/api/ItemTaxSchedule/GetByID', {
        params: {
          Id,
        },
      });
    },
    { enabled: !!Id }
  );
};
