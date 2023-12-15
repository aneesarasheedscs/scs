import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TStockReceivedNoteHistory, TStockReceivedNotes } from './types';

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
      return requestManager.get('/api/WsRmStockReceivedNotes/GenerateDocCode', {
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
  params?: TStockReceivedNoteHistory
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
  params?: TStockReceivedNoteHistory
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
  params?: TStockReceivedNoteHistory
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

export const useGetStockReceivedNotesById = (Id?: number | null) => {
  return useQuery(
    ['stock-received-getById', Id],
    () => {
      return getStockReceivedNotesById(Id);
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
const getStockReceivedNotesById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmStockReceivedNotes/GetByID`, { params: { Id } });
};
export const useGetStockReceivedNoteByIdforDetail = (Id?: number | null) => {
  return useQuery(
    ['stock_received-getById-detail', Id],
    () => {
      return getStockReceivedNoteByIdforDetail(Id);
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
const getStockReceivedNoteByIdforDetail = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmStockReceivedNotes/GetByID`, { params: { Id } });
};

//Get  History
export const useStockReceivedNotesHistory = (enabled = true, params?: TStockReceivedNoteHistory) => {
  return useQuery(
    'stock_received_notes',
    () => {
      return requestManager.post('/api/WsRmStockReceivedNotes/FormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 108,
        CanViewAllRecord: true,
        NoOfRecords: 50,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    { enabled }
  );
};
export const useGetDispatchedSTNLoad = () => {
  return useQuery('stock_transfer_notes_load', () => {
    const documentTypeIdsArray = [107, 174];
    return requestManager.get('/api/WsRmStockReceivedNotes/GetLoaderDataForWsRmStockReceivedNotes', {
      params: { ...params, BranchesId: userDetail?.BranchesId, DocumentTypeIds: documentTypeIdsArray.join(',') },
    });
  });
};

export const useAddStockReceivedNotes = (DocumentTypeId?: number, params?: TStockReceivedNotes) => {
  return useMutation(
    'add-stock-received_notes',
    (data: TStockReceivedNotes) => {
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
      return requestManager.post('/api/WsRmStockReceivedNotes/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('stock_received_notes');
        // const msg = 'Record added successfully!';
        // notification.success({ description: '', message: msg });
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
export const useUpdateStockReceivedNotes = (
  Id?: number | null,
  DocumentTypeId?: number,
  params?: TStockReceivedNotes
) => {
  return useMutation(
    'update-stock_received_notes',
    (data: TStockReceivedNotes) => {
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
      return requestManager.post('/api/WsRmStockReceivedNotes/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('stock_received_notes');
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
