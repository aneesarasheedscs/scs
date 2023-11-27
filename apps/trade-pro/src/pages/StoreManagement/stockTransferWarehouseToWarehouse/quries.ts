import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TStockTransferHistory, TJournalVoucherData, TJournalVoucherHistory, TStockTransfer } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDocumentNumber = () => {
  return useQuery(
    'document-number',
    () => {
      return requestManager.get('/api/WsRmWareHouseToWareHouseStocTransferHeader/GenerateDocumentNumber', {
        params: {
          ...params,
          BranchesId: userDetail?.BranchesId,
          DocumentTypeId: 238,
          FinancialYearId: financialYear?.Id,
        },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetAvailableStock = (
  enabled = true,
  itemId?: number,
  wareHouseId?: number,
  params?: TStockTransferHistory
) => {
  return useQuery(
    ['available_stocks', itemId, wareHouseId],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockInHandFromStockEvaluation', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date(),
        ItemId: itemId,
        WarehouseId: wareHouseId,
        ...params,
      });
    },
    { enabled: !!itemId && !!wareHouseId }
  );
};
export const useGetAverageRatesAndStock = (itemId?: number) => {
  return useQuery(
    ['average_rate_stock', itemId],
    () => {
      return requestManager.get('/api/GetAvgRatesAndStockInHand/GetLastPurchaseRateByItemId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ItemId: itemId,
        },
      });
    },
    { enabled: !!itemId }
  );
};
export const useGetAverageStockRateforOnlyCGS = (itemId?: number, params?: TStockTransferHistory) => {
  return useQuery(
    ['average_rates_stock_for_CGS', itemId],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/AvgRateOnlyForCGS', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date(),
        ItemId: itemId,
        ...params,
      });
    },
    { enabled: !!itemId }
  );
};
export const useGetStockByFifoMethod = (
  itemId?: number,
  wareHouseId?: number,
  itemQty?: number,
  netWeight?: number,
  itemUomId?: number,
  equivalentRate?: number,
  params?: TStockTransferHistory
) => {
  return useQuery(
    ['average_rates_stock_byFifo', itemId, wareHouseId, itemQty, netWeight, itemUomId, equivalentRate],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockByFifoMethod', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date(),
        ItemId: itemId,
        WarehouseId: wareHouseId,
        ItemQty: itemQty,
        stockUOM: itemUomId, // PackUomId
        NetWeight: netWeight,
        RateEqvailent: equivalentRate, // PackUom

        ...params,
      });
    },
    { enabled: !!itemId && !!wareHouseId && !!itemQty && !!itemUomId && !!netWeight && !!equivalentRate }
  );
};

export const useGetCompanyFeatures = () => {
  return useQuery('company_feature', () => {
    return requestManager.get('/api/CompanyFeatures/GetERPFeaturesByCompanyId', {
      params,
    });
  });
};
export const useGetWareHouse = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('warehouse', () => {
    return requestManager.get('/api/InvWareHouse/GetActiveWareHouse', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      },
    });
  });
};
export const useGetItemName = () => {
  return useQuery('item_name', () => {
    return requestManager.get('/api/Item/ReadAllItems', {
      params,
    });
  });
};
export const useGetUomByItemId = (ItemId?: number | null) => () => {
  return useQuery(
    ['uom', ItemId],
    () => {
      return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
    },
    { enabled: !!ItemId }
  );
};

//Get ById
export const useGetStockTransferById = (Id?: number | null) => {
  return useQuery(
    ['stockTransfer-getById', Id],
    () => {
      return getStockTransferById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: !!Id,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const getStockTransferById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmWareHouseToWareHouseStocTransferHeader/GetByID`, { params: { Id } });
};
//Get Stock History
export const useGetStockTransferHistory = (enabled = true, params?: TStockTransferHistory) => {
  return useQuery(
    'stock-transfer',
    () => {
      return requestManager.post('/api/WsRmWareHouseToWareHouseStocTransferHeader/FormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: 2,
        DocumentTypeId: 238,
        CanViewAllRecord: true,
        NoOfRecords: 50,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    { enabled }
  );
};
export const useAddStocktransfer = (params?: TStockTransfer) => {
  return useMutation(
    'add-stock-transfer',
    (data: TStockTransfer) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        DocumentTypeId: 238,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        ApprovedUser: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/WsRmWareHouseToWareHouseStocTransferHeader/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stock-transfer');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useUpdateStocktransfer = (Id?: number | null, params?: TStockTransfer) => {
  return useMutation(
    'update-stock-transfer',
    (data: TStockTransfer, Id?: number) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        DocumentTypeId: 238,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserId,
        ApprovedUser: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/WsRmWareHouseToWareHouseStocTransferHeader/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stock-transfer');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
