import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TCompanyData, TFifoAvgRate, TWareHouseAndItemOnChange } from '../form/types';
import { TStockTransferNoteDirectHistory } from '../table/types';
import { AxiosResponse } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetStockTransferNoteDirectTable = (enabled = true, params?: TStockTransferNoteDirectHistory) => {
  return useQuery(
    'StockTransferNoteDirect-history',
    () => {
      return requestManager.post('/api/WsRmStockTransferNotes/FormHistory', {
        DocumentTypeId: 174,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        CanViewAllRecord: true,
        NoOfRecords: 50,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    { enabled }
  );
};

// Voucher No

export const useGetVoucherNo = () => {
  return useQuery(
    'voucher-number',
    () => {
      return requestManager.get('/api/WsRmStockTransferNotes/GenerateDocCode', {
        params: { ...params, DocumentTypeId: 174, BranchesId: 2, FinancialYearId: 2, CompanyId: 2, OrganizationId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

// //   Select Fields Query

export const useGetSourceSelect = () => {
  return useQuery('Source-Select', GetSourceSelect, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetSourceSelect: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/Company/GetAlldt', {
    params: { ...params, OrgCompanyTypeId: userDetail?.OrganizationId },
  });
  const rawData = response.data?.Data.Result;
  const source = rawData.filter((item: any) => item.Id == userDetail?.CompanyId);
  return source;
};

export const useGetDestinationLocationSelect = () => {
  return useQuery(
    'DestinationLocation-Select',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: { ...params, OrgCompanyTypeId: userDetail?.OrganizationId },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetRequestStatusSelect = () => {
  return useQuery(
    'RequestStatus-Select',
    () => {
      return requestManager.get('/api/CommonController/StaticColumnNames', {
        params: { ...params, Activity: 'WsrmRequisitonStatusList' },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetWareHouseSelect = () => {
  return useQuery(
    'WareHouse-Select',
    () => {
      return requestManager.get('/api/InvWareHouse/GetActiveWareHouse', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetItemNameSelect = () => {
  return useQuery(
    'ItemName-Select',
    () => {
      return requestManager.get('/api/Item/ItemsWithBaseUOMFromEvaluation', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetOtherItemsNameSelect = () => {
  return useQuery(
    'OtherItemsName-Select',
    () => {
      return requestManager.get('/api/InventoryItemsOther/GetAll', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetWareHouseAndItemOnChange = (
  enabled = true,
  ItemId?: number,
  WarehouseId?: number,
  stockUOM?: number,
  params?: TWareHouseAndItemOnChange
) => {
  return useQuery(
    ['WareHouseAndItem-OnChange', WarehouseId, ItemId, stockUOM],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockInHandFromStockEvaluation', {
        ...params,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date().toISOString(),
        ItemId: ItemId,
        WarehouseId: WarehouseId,
        stockUOM: stockUOM,
      });
    },
    { enabled: !!ItemId }
  );
};

export const useGetCompanyFeaturesCheck = () => {
  return useQuery('CompanyFeaturesCheck ', GetCompanyFeaturesCheck, {
    cacheTime: userDetail?.expires_in,
  });
};
const GetCompanyFeaturesCheck: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/CompanyFeatures/GetERPFeaturesByCompanyId', {
    params: {
      ...params,
    },
  });
  const rawData = response.data?.Data.Result;
  const feature = rawData.filter((item: TCompanyData) => item.Id === 5);
  return feature;
};

export const useGetFifoAvgRate = (
  enabled: false,
  ItemId?: number,
  WarehouseId?: number,
  stockUOM?: number,
  RateEqvailent?: number,
  itemQty?: number,
  NetWeight?: number,
  params?: TFifoAvgRate
) => {
  return useQuery(
    ['GetFifoAvgRate', ItemId, WarehouseId, RateEqvailent, stockUOM, itemQty, NetWeight],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockByFifoMethod', {
        ...params,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date().toISOString(),
        ItemId: ItemId,
        WarehouseId: WarehouseId,
        stockUOM: stockUOM,
        ItemQty: itemQty,
        NetWeight: NetWeight,
        RateEqvailent: RateEqvailent,
        ...params,
      });
    },
    { enabled: !!ItemId && !!WarehouseId && !!stockUOM && !!itemQty && !!NetWeight && !!RateEqvailent }
  );
};
