import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { StockReport, TStockReportSearchCriteria } from './table/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetStockReportSimpleTable = (enabled = true, params?: TStockReportSearchCriteria) => {
  return useQuery(
    'StockReportSimple-history',
    () => {
      return requestManager.post('/api/InventoryReports/StockSummaryGeneralByWeightGetByActivity', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FromDate: new Date(),
        ToDate: new Date(),
        Activity: params?.Activity || 'ItemStockSummary',
        ...params,
      });
    },
    { enabled }
  );
};

// //   Select Fields Query

export const useGetStockReportParentCategory = () => {
  return useQuery('StockReportParentCategory-Select', GetStockReportParentCategory, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetStockReportParentCategory: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: StockReport) => item.ActivityType === 'ParentCategories');
  // console.log(filteredData);
  return filteredData;
};

export const useGetStockReportItemCategory = () => {
  return useQuery('StockReportItemCategory-Select', GetStockReportItemCategory, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetStockReportItemCategory: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: StockReport) => item.ActivityType === 'ItemCategories');
  // console.log(filteredData);
  return filteredData;
};

export const useGetStockReportItemTypes = () => {
  return useQuery('StockReportItemTypes-Select', GetStockReportItemTypes, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetStockReportItemTypes: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: StockReport) => item.ActivityType === 'ItemTypes');
  // console.log(filteredData);
  return filteredData;
};

export const useGetStockReportItemName = () => {
  return useQuery('StockReportItemName-Select', GetStockReportItemName, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetStockReportItemName: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: StockReport) => item.ActivityType === 'Items');
  // console.log(filteredData);
  return filteredData;
};

export const useGetStockReportWareHouse = () => {
  return useQuery('StockReportWareHouse-Select', GetStockReportWareHouse, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetStockReportWareHouse: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: StockReport) => item.ActivityType === 'Warehouse');
  // console.log(filteredData);
  return filteredData;
};
