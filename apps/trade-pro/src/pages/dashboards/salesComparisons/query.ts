import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { QueryFunction, useQuery } from 'react-query';
import { TSearchCriteriaSalesComparison } from './types';
import { AxiosResponse } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

//Get Item Type
// export const useGetItemType = () => {
//   return useQuery(
//     'item-type',
//     () => {
//       return requestManager.get('/api/InvSaleInvoice/GetDataFromInventoryStocksEvaluationsForSales', {
//         params: { ...params, ReportType: 'Sale', Activity: 'GetItemType' },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
//Get Parent Category
// export const useGetParentCategory = () => {
//   return useQuery(
//     'parent-category',
//     () => {
//       return requestManager.get('/api/InvSaleInvoice/GetDataFromInventoryStocksEvaluationsForSales', {
//         params: { ...params, ReportType: 'Sale', Activity: 'GetParentCategory' },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
export const useGetParentCategory = () => {
  return useQuery('parent-category', getParentCategory, {
    cacheTime: userDetail?.expires_in,
  });
};
const getParentCategory: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InvSaleInvoice/AllComboBindAgainstSaleInvoice', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.Activity === 'ItemParentCategory');
  console.log(filteredData);
  return filteredData;
};
export const useGetItemType = () => {
  return useQuery('item-type', getItemType, {
    cacheTime: userDetail?.expires_in,
  });
};
const getItemType: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InvSaleInvoice/AllComboBindAgainstSaleInvoice', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.Activity === 'ItemType');
  console.log(filteredData);
  return filteredData;
};

//Get Companies
export const useGetCompanies = () => {
  return useQuery(
    'companies',
    () => {
      return requestManager.post('/api/Company/GetAlldt', {
        OrgCompanyTypeId: userDetail?.OrganizationId,
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
      return requestManager.post('/api/Inventory/SaleComparisionsCustomerItemCityandPack_Wise', {
        CompanyId: userDetail?.CompanyId,
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
