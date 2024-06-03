import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
const SupplierCustomerId: any = userDetail?.SupplierCustomerId;

export const useGetCustomerReportMenu = (enabled = true, parameters?: any) => {
  return useQuery(
    'customer-reports-menu',
    () => {
      return requestManager.get('/api/UserRights/getCustomerScreens', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          SupplierCustomerId: userDetail?.SupplierCustomerId,
          ScreenTypeId: 2,
          ...parameters,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
