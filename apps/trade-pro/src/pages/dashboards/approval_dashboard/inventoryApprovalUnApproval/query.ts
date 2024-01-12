import { queryClient } from '@tradePro/configs';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { Result, notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TRequisitionOrder, TRequisitionOrderforApprovalHistory } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetItemName = () => {
  return useQuery('item_name', () => {
    return requestManager.get('/api/ItemPricingSchedule/GetPreviousPricesByItemId', {
      params: { ...params, BranchesId: 2, PriceTypeId: 6 },
    });
  });
};
export const useRequisitionOrderforApprovelHistory = () => {
  return useQuery('requisition_order', () => {
    return requestManager.get('/api/WsRmRequisitionPo/FormHistoryForApproval', {
      params: { ...params, NoOfRecords: 50 },
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
export const useGetDestinationAndSourceLoc2 = () => {
  return useQuery('destination_source_location', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: { OrgCompanyTypeId: 2 },
    });
  });
};
export const useGetDestinationAndSourceLoc3 = () => {
  return useQuery(
    'destination_source_location',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: { OrgCompanyTypeId: 2 },
      });
    },
    // {
    //   onError: (error) => {
    //     // Handle the error and show a notification
    //     notification.error({
    //       message: 'Error',
    //       description: error?.response?.data?.Message || 'An error occurred.',
    //     });
    //   },
    // }
    {
      onError: (error: any) => {
        let errorMessage = 'An error occurred.';
        console.log(errorMessage);
        if (error.response && error.response.data && error.response.data.Message) {
          errorMessage = error.response.data.Message;
        }

        // Handle the error and show a notification
        notification.error({
          message: 'Error',
          description: errorMessage,
        });
      },
    }
  );
};

export const useGetDestinationAndSourceLoc = () => {
  return useQuery(
    'destination_source_location',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: { OrgCompanyTypeId: 2 },
      });
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        }
      },
    }
  );
};

export const useGetAvailableStock = (enabled = true, itemId?: number, params?: TRequisitionOrderforApprovalHistory) => {
  return useQuery(
    ['available_stocks', itemId],
    () => {
      return requestManager.post('/api/GetAvgRatesAndStockInHand/GetStockInHandFromStockEvaluation', {
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
//Get ById
export const useGetRequisitionOrderById = (Id?: number | null) => {
  return useQuery(
    ['requisition-getById', Id],
    () => {
      return getRequisitionOrderById(Id);
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
const getRequisitionOrderById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmRequisitionPo/GetByID`, { params: { Id } });
};
export const useGetRequisitionOrderDetailById = (Id?: number | null) => {
  return useQuery(
    ['requisition--detail-getById', Id],
    () => {
      return getRequisitionOrderDetailById(Id);
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
const getRequisitionOrderDetailById = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmRequisitionPo/GetByID`, { params: { Id } });
};

export const useApproveRequisitionOrder = (Id?: number | null, DocumentTypeId?: number, params?: TRequisitionOrder) => {
  return useMutation(
    'approve-requisition-order',
    (data: TRequisitionOrder) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        ApprovedUserId: userDetail?.UserId,
        HoApprovedUserId: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        HoApprovalDate: new Date().toISOString(),
        IsApproved: true,
        HoIsApproved: true,
        ...params,
      };
      return requestManager.post('/api/WsRmRequisitionPo/RequisitionApproval', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('requisition_order');
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
