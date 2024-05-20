import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedUserDetail } from '@tradePro/utils/storageService';
import { SaleOrderRetailCriteria } from './type';
import { TSaleOrder } from '../type';
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



export const useGetSaleOrder = (enabled = true,params?: TSaleOrder) => {
  return useQuery('sale-order-detail', () => {
    return requestManager.post('/api/SaleOrder/FormHistory', {
      DocumentTypeId: 81,
      OrganizationId: 2,
      CompanyId: 2,
      BranchesId: 2,
      FinancialYearId: 2,
      NoOfRecords: 50,
      CanViewAllRecord: 'true',
      EntryUser: 2,
      ...params,
    });
  });
};