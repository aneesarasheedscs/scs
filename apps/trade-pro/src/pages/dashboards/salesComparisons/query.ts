import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { useQuery } from 'react-query';
import { TSearchCriteriaSalesComparison } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

//Get Item Type
export const useGetItemType = () => {
  return useQuery(
    'item-type',
    () => {
      return requestManager.get('/api/InvSaleInvoice/GetDataFromInventoryStocksEvaluationsForSales', {
        params: { ...params, ReportType: 'Sale', Activity: 'GetItemType' },
      });
    },
    { cacheTime: 5000 }
  );
};
//Get Parent Category
export const useGetParentCategory = () => {
  return useQuery(
    'parent-category',
    () => {
      return requestManager.get('/api/InvSaleInvoice/GetDataFromInventoryStocksEvaluationsForSales', {
        params: { ...params, ReportType: 'Sale', Activity: 'GetParentCategory' },
      });
    },
    { cacheTime: 5000 }
  );
};
//Get Companies
export const useGetCompanies = () => {
  return useQuery(
    'companies',
    () => {
      return requestManager.get('/api/Company/GetCompaniesByUserId', {
        params: { OrganizationId: userDetail?.OrganizationId, UserId: userDetail?.UserId },
      });
    },
    { cacheTime: 5000 }
  );
};
//History
export const useGetSalesComparisonReport = (enabled = true, params?: TSearchCriteriaSalesComparison) => {
  return useQuery(
    'sales-comparison-report',
    () => {
      return requestManager.post('/api/Dashboard/OrgSalesAnalyticsSaleComparisionsCustomerItemCityandPack_Wise', {
        CompanyIds: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        NoOfRecords: 10,
        ApprovedFilter: 'Top',
        ...params,
      });
    },
    { enabled }
  );
};
