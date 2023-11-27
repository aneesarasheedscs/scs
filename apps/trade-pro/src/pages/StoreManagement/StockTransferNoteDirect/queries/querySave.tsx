import { queryClient } from '@tradePro/configs/index';
import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { DocumentInfo } from '../form/types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

//Get ById
export const useGetStockTransferNoteDirectById = (Id?: number | null) => {
  return useQuery(
    ['StockTransferNoteDirect-getById', Id],
    () => {
      return getStockTransferNoteDirectById(Id);
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

const getStockTransferNoteDirectById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmStockTransferNotes/GetByID`, { params: { Id } });
};

// save form

export const useAddStockTransferNoteDirect = (params?: DocumentInfo) => {
  return useMutation(
    'StockTransferNoteDirect-history',
    (data: DocumentInfo) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 179,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ApprovedDate: new Date().toISOString(),
        ApprovedUserId: userDetail?.UserId,
        // IsApproved: false,
        // SourceLocationId:2,
        // DestinationLocationId: userDetail?.CompanyId,
        // ,"DocNo":1
        // ,"DocDate": "2023-10-31"
        // ,"SourceLocationId":2
        // ,"DestinationLocationId":3
        // ,"ReqStatus":3
        // ,"RemarksHeader":""
        ...params,
      };
      return requestManager.post('/api/WsRmStockTransferNotes/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('StockTransferNoteDirect-history');
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

export const useUpdateStockTransferNoteDirect = (Id?: number | null, params?: DocumentInfo) => {
  return useMutation(
    'StockTransferNoteDirect-history',
    (data: DocumentInfo) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 179,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        ApprovedDate: new Date().toISOString(),
        ApprovedUserId: userDetail?.UserId,
        // ,"DocNo":1
        // ,"DocDate": "2023-10-31"
        // ,"SourceLocationId":2
        // ,"DestinationLocationId":3
        // ,"ReqStatus":3
        // ,"RemarksHeader":""
        ...params,
      };
      return requestManager.post('/api/WsRmStockTransferNotes/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('StockTransferNoteDirect-history');
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
