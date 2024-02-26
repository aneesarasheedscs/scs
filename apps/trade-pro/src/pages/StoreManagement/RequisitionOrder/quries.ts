import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TRequisitionOrderHistory, TRequisitionOrder } from './types';
interface TLocation {
  CompName: string;
  CompReportingTitle: string;
  CompType: string;
  Id: number;
}
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
      return requestManager.get('/api/WsRmRequisitionPo/GenerateDocCode', {
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

export const useGetAvailableStock = (enabled = true, itemId?: number, params?: TRequisitionOrderHistory) => {
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

export const useGetItemName = () => {
  return useQuery('item_name', () => {
    return requestManager.get('/api/ItemPricingSchedule/GetPreviousPricesByItemId', {
      params: { ...params, BranchesId: 2, PriceTypeId: 6 },
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
type ResponseData = TLocation[];
export const useGetDestinationLoc = () => {
  return useQuery('destination_location', getDestination, {
    cacheTime: userDetail?.expires_in,
  });
};

const getDestination: QueryFunction<ResponseData> = async () => {
  const response = await requestManager.get('/api/Company/GetAlldt', {
    params: { OrgCompanyTypeId: 2 },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: TLocation) => item.CompType === 'HeadOffice');
  console.log(filteredData);
  return filteredData;
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
export const useGetRequisitionOrderByIdforDetail = (Id?: number | null) => {
  return useQuery(
    ['requisition-getById-detail', Id],
    () => {
      return getRequisitionOrderByIdforDetail(Id);
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

const getRequisitionOrderByIdforDetail = (Id?: number | null) => {
  return requestManager.get(`/api/WsRmRequisitionPo/GetByID`, { params: { Id } });
};

//Get  History
export const useRequisitionOrderHistory = (enabled = true, params?: TRequisitionOrderHistory) => {
  return useQuery(
    'requisition_order',
    () => {
      return requestManager.post('/api/WsRmRequisitionPo/FormHistory', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        DocumentTypeId: 105,
        CanViewAllRecord: true,
        NoOfRecords: 50,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    {
      enabled,
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
        }
      },
    }
  );
};

export const useAddRequisitionOrder = (DocumentTypeId?: number, params?: TRequisitionOrder) => {
  return useMutation(
    'add-requisition-order',
    (data: TRequisitionOrder) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        ApprovedUserId: userDetail?.UserId,
        ApprovedDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        HoApprovedUserId: userDetail?.UserId,
        HoApprovalDate: new Date().toISOString(),
        IsApproved: false,
        HoIsApproved: false,
        ...params,
      };
      return requestManager.post('/api/WsRmRequisitionPo/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Approved successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('requisition_order');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useUpdateRequisitionOrder = (Id?: number | null, DocumentTypeId?: number, params?: TRequisitionOrder) => {
  return useMutation(
    'update-requisition-order',
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
        IsApproved: false,
        HoIsApproved: false,
        ...params,
      };
      return requestManager.post('/api/WsRmRequisitionPo/Save', dataToSubmit);
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
          queryClient.invalidateQueries('requisition_order');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
