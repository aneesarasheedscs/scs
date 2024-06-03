import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSearchCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetSalesReportTable = (enabled = true, params?: TSearchCriteria) => {
  return useQuery(
    'sale-report-table',
    () => {
      return requestManager.post('api/SaleOrder/SaleOrderHistoryForCustomer', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        UserId: userDetail?.UserId,
        DocumentTypeId: 127,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        SupplierCustomerId: userDetail?.SupplierCustomerId,
        IsApproved: params ? (params?.ApprovedStatus === 1 ? true : false) : true,
        ApprovedFilter: params?.ApprovedStatus === 3 ? 'All' : '',
        ...params,
        Status: params?.Status === 'All' ? '' : params?.Status,
      });
    },
    { enabled }
  );
};

export const useGetItem = (enabled = true) => {
  return useQuery(
    'sale-report-item',
    () => {
      return requestManager.get('/api/SaleOrder/GetDataForDropDownFromSaleOrder', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Activity: 'Item',
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
