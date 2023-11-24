import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TPurchaseOrderDetailEntry, TPurchaseOrderEntry, TPurchaseOrderSearchCriteria } from './type';
import { notification } from 'antd';
import { AxiosError } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetPurchaseOrder = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'purchase-order',
    () => {
      return requestManager.post('/api/InventoryReports/PurchaseOrderHistory', {
        DocumentTypeId: 41,
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
export const useGetPurchaseOrderStatus = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'purchase-order-status',
    () => {
      return requestManager.post('/api/PurchaseOrder/GetPurchaseOrderStatus', {
        DocumentTypeId: 41,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};
//Get ById
export const useGetPurchaseOrderById = (Id?: number | null) => {
  return useQuery(
    ['purchase-order-getById', Id],
    () => {
      return getPurchaseOrderById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getPurchaseOrderById = (Id?: number | null) => {
  return requestManager.get('/api/PurchaseOrder/GetByID', { params: { Id } });
};
//Save Purchase Order
export const useAddPurchaseOrder = (params?: TPurchaseOrderEntry) => {
  return useMutation(
    'purchase-order',
    (data: TPurchaseOrderEntry) => {
      return requestManager.post('/api/PurchaseOrder/Save', {
        ...data,
        Id: 0,

        DocumentTypeId: 41,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        OrderExpiryDate: new Date().toISOString(),
        OrderStatus: 'Open',

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('purchase-order');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdatePurchaseOrder = (Id?: number | null, params?: TPurchaseOrderEntry) => {
  return useMutation(
    'purchase-order',
    (data: TPurchaseOrderEntry) => {
      return requestManager.post('/api/PurchaseOrder/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 41,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        OrderExpiryDate: new Date().toISOString(),
        OrderStatus: 'Open',
        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('purchase-order');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
