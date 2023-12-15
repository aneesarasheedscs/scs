import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TStockTransferNotesHistory, TStockTransferNotes } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDocumentNumber = (DocumentTypeId?: number) => {
  return useQuery(
    'document-number',
    () => {
      return requestManager.get('/api/WsRmStockTransferNotes/GenerateDocCode', {
        params: {
          ...params,
          BranchesId: userDetail?.BranchesId,
          DocumentTypeId: DocumentTypeId,
          FinancialYearId: financialYear?.Id,
        },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetAverageRateforCGS = (
  enabled = true,
  itemId?: number,
  WarehouseId?: number,
  params?: TStockTransferNotesHistory
) => {
  return useQuery(
    ['average_rate_for_cgs', itemId],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/AvgRateOnlyForCGS', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date(),
        ItemId: itemId,
        WarehouseId: WarehouseId,
        ...params,
      });
    },
    { enabled: !!itemId }
  );
};
export const useGetAverageRateByFiFo = (
  enabled = true,
  itemId?: number,
  wareHouseId?: number,
  itemQty?: number,
  netWeight?: number,
  itemUomId?: number,
  equivalentRate?: number,
  params?: TStockTransferNotesHistory
) => {
  return useQuery(
    ['average_rate_for_fifo', itemId],
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
    { enabled: !!itemId }
  );
};
export const useGetAvailableStock = (
  enabled = true,
  itemId?: number,
  WarehouseId?: number,
  params?: TStockTransferNotesHistory
) => {
  return useQuery(
    ['available_stocks', itemId],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockInHandFromStockEvaluation', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocDate: new Date(),
        ItemId: itemId,
        WarehouseId: WarehouseId,
        ...params,
      });
    },
    { enabled: !!itemId }
  );
};

export const useGetCompanyFeatures = () => {
  return useQuery('company_features', () => {
    return requestManager.get('/api/CompanyFeatures/GetERPFeaturesByCompanyId', {
      params: { ...params },
    });
  });
};
export const useGetOtherItemsInExpense = () => {
  return useQuery('other_items_in_expense', () => {
    return requestManager.get('/api/InventoryItemsOther/GetAll', {
      params: { ...params },
    });
  });
};
export const useGetItemName = () => {
  return useQuery('item_name', () => {
    return requestManager.get('/api/ItemPricingSchedule/GetPreviousPricesByItemId', {
      params: { ...params, BranchesId: 2, PriceTypeId: 6 },
    });
  });
};
export const useGetWareHouse = () => {
  return useQuery('warehouse_in_grid', () => {
    return requestManager.get('/api/InvWareHouse/GetActiveWareHouse', {
      params: { ...params },
    });
  });
};
export const useGetRequestStatus = () => {
  return useQuery('request_status', () => {
    return requestManager.get('/api/CommonController/StaticColumnNames', {
      params: { Activity: 'WsrmRequisitonStatusList' },
    });
  });
};
export const useGetDestinationAndSourceLoc = () => {
  return useQuery('destination_source_location', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: { OrgCompanyTypeId: 2 },
    });
  });
};

export const useGetDestinationLoc = () => {
  return useQuery('destination_location', getDestination, {
    cacheTime: userDetail?.expires_in,
  });
};
const getDestination: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/Company/GetAlldt', {
    params: { OrgCompanyTypeId: 2 },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.CompType === 'HeadOffice');
  console.log(filteredData);
  return filteredData;
};
//Get ById

export const useGetStockTransferNotesById = (Id?: number | null) => {
  return useQuery(
    ['stock_transfer-getById', Id],
    () => {
      return getStockTransferNotesById(Id);
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
const getStockTransferNotesById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmStockTransferNotes/GetByID`, { params: { Id } });
};
export const useGetStockTransferByIdforDetail = (Id?: number | null) => {
  return useQuery(
    ['stock_transfer-getById-detail', Id],
    () => {
      return getStockTransferByIdforDetail(Id);
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
const getStockTransferByIdforDetail = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmStockTransferNotes/GetByID`, { params: { Id } });
};

//Get  History
export const useStockTransferNotesHistory = (enabled = true, params?: TStockTransferNotesHistory) => {
  return useQuery(
    'stock_transfer_notes',
    () => {
      return requestManager.post('/api/WsRmStockTransferNotes/FormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 107,
        CanViewAllRecord: true,
        NoOfRecords: 50,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    { enabled }
  );
};
export const useGetApprovalROLoad = () => {
  return useQuery('requisition_order_load', () => {
    return requestManager.get('/api/WsRmStockTransferNotes/GetLoaderDataForWsRmStockTransferNotes', {
      params: { ...params, BranchesId: userDetail?.BranchesId, PriceTypeId: 6 },
    });
  });
};
export const useAddStockTransferNotes = (DocumentTypeId?: number, params?: TStockTransferNotes) => {
  return useMutation(
    'add-stock-transfer_notes',
    (data: TStockTransferNotes) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        DocumentTypeId: DocumentTypeId,
        DocDate: new Date(),
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: financialYear?.EntryDate,
        EntryUserId: financialYear?.EntryUser,
        ModifyDate: financialYear?.ModifyDate,
        ModifyUserId: financialYear?.ModifyUser,
        ApprovedDate: new Date(),
        ApprovedUserId: userDetail?.UserId,
        ...params,
      };
      return requestManager.post('/api/WsRmStockTransferNotes/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('stock_transfer_notes');
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Approved successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useUpdateStockTransferNotes = (
  Id?: number | null,
  DocumentTypeId?: number,
  params?: TStockTransferNotes
) => {
  return useMutation(
    'update-stock_transfer_notes',
    (data: TStockTransferNotes) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        DocumentTypeId: DocumentTypeId,
        DocDate: new Date(),
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: financialYear?.EntryDate,
        EntryUserId: financialYear?.EntryUser,
        ModifyDate: financialYear?.ModifyDate,
        ModifyUserId: financialYear?.ModifyUser,
        ApprovedDate: new Date(),
        ApprovedUserId: userDetail?.UserId,
        ...params,
      };
      return requestManager.post('/api/WsRmStockTransferNotes/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('stock_transfer_notes');
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Updated successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
