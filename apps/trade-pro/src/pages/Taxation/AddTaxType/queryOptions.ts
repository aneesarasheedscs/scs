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

export const useGetAddTaxTypeGetById = (Id: number | null) => {
  return useQuery(
    ['account-titlee', Id],
    () => {
      return requestManager.get('/api/TaxesTypes/GetByID', {
        params: {
          Id,
        },
      });
    },
    { enabled: !!Id }
  );
};
