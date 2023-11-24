import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedUserDetail } from '@tradePro/utils/storageService';
import { SaleOrderRetailCriteria } from './type';
const userDetail = storedUserDetail();

export const useSalesReportTable = (enabled = true, params?: SaleOrderRetailCriteria) => {
  return useQuery(
    'saleOrder-table',
    () => {
      return requestManager.post('api/Inventory/SaleOrderRetailRegister', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 81,
        ...params,
      });
    },
    { enabled }
  );
};
