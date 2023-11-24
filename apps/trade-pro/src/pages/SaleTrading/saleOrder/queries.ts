import { useMutation, useQuery } from 'react-query';
import { TSaleOrder, TSaleOrderDetail } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedUserDetail();

export const useGetSaleOrder = (params?: TSaleOrder) => {
  return useQuery('sale-order-detail', () => {
    return requestManager.post('/api/SaleOrder/FormHistory', {
      DocumentTypeId: 81,
      OrganizationId: 2,
      CompanyId: 2,
      BranchesId: 2,
      FinancialYearId: 2,
      NoOfRecords: 50,
      CanViewAllRecord: 'true',
      EntryUser: 2,
      ...params,
    });
  });
};
//Get ById
export const useGetSaleOrderById = (Id?: number | null) => {
  return useQuery(
    ['sale-order-getById', Id],
    () => {
      return getSaleOrderById(Id);
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
const getSaleOrderById = (Id?: number | null) => {
  return requestManager.get('/api/SaleOrder/GetByID?Id=5072', { params: { Id } });
};
//Save Sale Order
export const useAddSaleOrder = (params?: TSaleOrderDetail) => {
  return useMutation(
    'sale-order-detail',
    (data: TSaleOrderDetail) => {
      return requestManager.post('/api/SaleOrder/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 81,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: 2,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        DeliveryStartDate: new Date().toISOString(),
        ActionTypeId: 1,
        OrderExpiryDate: new Date().toISOString(),

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sale-order-detail');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
export const useUpdateSaleOrder = (Id?: number | null, params?: TSaleOrderDetail) => {
  return useMutation(
    'sale-order-detail',
    (data: TSaleOrderDetail) => {
      return requestManager.post('/api/SaleOrder/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 81,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: 2,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        DeliveryStartDate: new Date().toISOString(),
        // ActionTypeId: 1,
        OrderExpiryDate: new Date().toISOString(),

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sale-order-detail');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
