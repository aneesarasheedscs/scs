import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosResponse } from 'axios';
import { QueryFunction, useQuery } from 'react-query';
import { TStockReportsSearchCriteria } from './types';

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
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'ParentCategories');
  console.log(filteredData);
  return filteredData;
};
//Get Item Type
export const useGetItemType = () => {
  return useQuery('item-type', getItemType, {
    cacheTime: userDetail?.expires_in,
  });
};
const getItemType: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'ItemTypes');
  console.log(filteredData);
  return filteredData;
};
//Get Item Name
export const useGetItemName = () => {
  return useQuery('item-name', getItemName, {
    cacheTime: userDetail?.expires_in,
  });
};
const getItemName: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'Items');
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
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'ItemClassGroup');
  console.log(filteredData);
  return filteredData;
};
//Get Item Category
export const useGetItemCategory = () => {
  return useQuery('item-category', getItemCategory, {
    cacheTime: userDetail?.expires_in,
  });
};
const getItemCategory: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'ItemCategories');
  console.log(filteredData);
  return filteredData;
};
//Get Warehouse
export const useGetWarehouse = () => {
  return useQuery('ware-house', getWareHouse, {
    cacheTime: userDetail?.expires_in,
  });
};
const getWareHouse: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/InventoryStockEvalautionDetailDropDownAndLists', {
    params,
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.ActivityType === 'Warehouse');
  console.log(filteredData);
  return filteredData;
};
//Get Stock Account
export const useGetStockAccount = () => {
  return useQuery(
    'stock-account',
    () => {
      return requestManager.get('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        params: { ...params, AccountTypeIds: 4 },
      });
    },
    { cacheTime: 5000 }
  );
};
//History
export const useGetStockReportHistory = (enabled = true, params?: TStockReportsSearchCriteria) => {
  return useQuery(
    'stock-report-history',
    () => {
      return requestManager.post('/api/InventoryReports/StockReportWithValuesRetail', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        FromDate: new Date(),
        ToDate: new Date(),
        ...params,
      });
    },
    { enabled }
  );
};
