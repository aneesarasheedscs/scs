import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TStockAdjustment, TStockAdjustmentHistory } from './types';

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
      return requestManager.get('/api/InvStockAdjustment/GenerateCode', {
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

//get uomByItemId
export const useGetUomByItemId = (ItemId?: number | null) => {
  return useQuery(
    ['uom', ItemId],
    () => {
      return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
    },
    { enabled: !!ItemId }
  );
};

//get accounttitle
export const useGetAccountTitle = (AdjustmentTypeId: number | undefined) => {
  console.log(AdjustmentTypeId);
  return useQuery(
    ['account_title', AdjustmentTypeId],
    () => {
      return requestManager.get('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        params: { ...params, AccountTypeIds: AdjustmentTypeId === 1 ? 10 : [11, 12, 13, 20, 21] },
      });
    },
    { enabled: !!AdjustmentTypeId }
  );
};

//get item Combo
export const useGetItemName = () => {
  return useQuery('item_name', () => {
    return requestManager.get('/api/Item/ItemsWithBaseUOM', {
      params: { ...params },
    });
  });
};

//get wherehouse combo
export const useGetWhereHouse = () => {
  return useQuery('where_house', () => {
    return requestManager.get('/api/InvWareHouse/GetActiveWareHouse', {
      params: { ...params },
    });
  });
};

//get entry type combo
export const useGetEntryType = () => {
  return useQuery('entry_type', () => {
    return requestManager.get('/api/CommonController/StaticColumnNames', {
      params: { Activity: 'StockAdjustmentType' },
    });
  });
};

//Get ById
export const useGetStockAdjustmentById = (Id?: number | null) => {
  return useQuery(
    ['stockAdjustment-getById', Id],
    () => {
      return getStockAdjustmentById(Id);
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
const getStockAdjustmentById = (Id?: number | null) => {
  return requestManager.get(`/api/InvStockAdjustment/GetByID`, { params: { Id } });
};

//get by id for detail
export const useGetStockByIdforDetail = (Id?: number | null) => {
  return useQuery(
    ['stockAdjustment-getById-detail', Id],
    () => {
      return getStockAdjustmentByIdforDetail(Id);
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

const getStockAdjustmentByIdforDetail = (Id?: number | null) => {
  return requestManager.get(`/api/InvStockAdjustment/GetByID`, { params: { Id } });
};

//Get  History
export const useStockAdjustmentHistory = (enabled = true, params?: TStockAdjustmentHistory) => {
  return useQuery(
    'stock_adjustment',
    () => {
      return requestManager.post('/api/InvStockAdjustment/FormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 70,
        CanViewAllRecord: true,
        // EntryUser: 2,
        NoOfRecords: 50,
        ...params,
      });
    },
    { enabled }
  );
};

export const useAddStockAdjustment = (DocumentTypeId?: number, params?: TStockAdjustment) => {
  return useMutation(
    'add-stock-adjustment',
    (data: TStockAdjustment) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EnteryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        ApprovedUserId: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EnteryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ApprovalUserId: userDetail?.UserId,
        ...params,
      };
      return requestManager.post('/api/InvStockAdjustment/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Save successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('stock_adjustment');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useUpdateStockAdjustment = (Id?: number | null, DocumentTypeId?: number, params?: TStockAdjustment) => {
  return useMutation(
    'update-stock-adjustment',
    (data: TStockAdjustment) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EnteryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        ApprovedUserId: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EnteryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ApprovalUserId: userDetail?.UserId,
        ...params,
      };
      return requestManager.post('/api/InvStockAdjustment/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Updated successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('stock_adjustment');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
