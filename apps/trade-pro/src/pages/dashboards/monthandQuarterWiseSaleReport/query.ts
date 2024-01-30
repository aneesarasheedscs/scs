import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { QueryFunction, useQuery } from 'react-query';
import { TMonthandQuarterWiseSaleReport } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };
// Get Parent Categorey
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

//Get Class Group
export const useGetItemClassGroup = () => {
  return useQuery('item-class-group', getClassGroup, {
    cacheTime: userDetail?.expires_in,
  });
};
const getClassGroup: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InvSaleInvoice/AllComboBindAgainstSaleInvoice', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.Activity === 'ItemClassGroup');
  console.log(filteredData);
  return filteredData;
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
export const useGetMonthandQuarterWiseSaleReport = (enabled = true, params?: TMonthandQuarterWiseSaleReport) => {
  return useQuery(
    'month-quarter-wise-sale-report',
    () => {
      return requestManager.post('/api/Dashboard/OrgSalesAnalyticsComparisonMonthWiseQuarterWise', {
        CompanyIds: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,

        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        ...params,
      });
    },
    { enabled }
  );
};
