import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { InventoryReport, TInventryReportSearchCriteria } from './table/types';
import { AxiosResponse } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetInventryReportTable = (enabled?: boolean, params?: TInventryReportSearchCriteria) => {
  return useQuery(
    'inventry-Transaction-Report-history',
    () => {
      return requestManager.post('/api/InventoryReports/InventoryTransactionReportRetail', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        ...params,
      });
    },
    { enabled }
  );
};

//   Select Fields Query

export const useGetInventryReportWareHouse = () => {
  return useQuery('InventryReportWareHouse-Select', GetInventryReportWareHouse, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetInventryReportWareHouse: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: InventoryReport) => item.ActivityType === 'Warehouse');
  // console.log(filteredData);
  return filteredData;
};

export const useGetInventryReportItems = () => {
  return useQuery('InventryReportItems-Select', GetInventryReportItems, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetInventryReportItems: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData2 = rawData.filter((item: InventoryReport) => item.ActivityType === 'Items');
  // console.log(filteredData);
  return filteredData2;
};

export const useGetInventryReportSupplierCustomer = () => {
  return useQuery('InventryReportSupplierCustomer-Select', GetInventryReportSupplierCustomer, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetInventryReportSupplierCustomer: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/InventoryReports/StockReportComboByOrganizationAndCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData3 = rawData.filter((item: InventoryReport) => item.ActivityType === 'Supplier_Customer');
  // console.log(filteredData);
  return filteredData3;
};

export const useGetInventryReportDocumentTypeCombo = () => {
  return useQuery(
    'InventryReport-Select',
    () => {
      return requestManager.get('/api/Voucher/DocumentTypeGetFromInventoryTransactions', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};
