import { useMutation, useQuery } from 'react-query';
import { TSaleOrder, TSaleOrderDetail } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

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
export const useAddSaleOrder = (params?: TSaleOrder) => {
  return useMutation(
    'sale-order-detail',
    (data: TSaleOrder) => {
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
export const useUpdateSaleOrder = (Id?: number | null, params?: TSaleOrder) => {
  return useMutation(
    'sale-order-detail',
    (data: TSaleOrder) => {
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

export const useGetPriceSchedule = (ItemIds?: number | null, enabled = true, params?: TSaleOrderDetail) => {
  return useQuery(
    ['item', ItemIds],
    () => {
      return requestManager.post('/api/InvSaleInvoice/GetLastPriceScheduleByItemIdAndDate', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        PriceTypeId: 6,
        ItemIds: ItemIds,
        EffectedDate: dayjs(new Date().toISOString()),

        ...params,
      });
    },
    { enabled }
  );
};

export const useGetDiscountRate = (
  // enabled = true,
  // params?: TSaleOrderDetail,
  SupplierCustomerId?: number | null
  // ItemIds?: number | null
) => {
  return useQuery(
    ['discount-rate', SupplierCustomerId],
    () => {
      return requestManager.post('/api/InvSaleInvoice/GetDiscountByCustomerItemAndEffectiveDate', {
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        SupplierCustomerId,
        // ItemIds,
        EffectedDate: new Date().toISOString(),

        // obj.OrganizationId = UserAccount.OrganizationId;
        //             obj.CompanyId = UserAccount.CompanyId;
        //             obj.BranchesId = UserAccount.BranchesId;
        //             obj.SupplierCustomerId = Conversion.ToInt(combsuppname.Value);
        //             obj.ItemId = Conversion.ToInt(combitem.Value);
        //             obj.EffectedDate = Conversion.ToDateTime(DocDate.Value);

        // ...params,
      });
    },
    { enabled: !!SupplierCustomerId }
  );
};

// export const useGetUomByItemId = (ItemId?: number | null) => () => {
//   return useQuery(
//     ['uom', ItemId],
//     () => {
//       return requestManager.get('/api/UOMSchedule/SearchByObject', { params: { ...params, ItemId } });
//     },
//     { enabled: !!ItemId }
//   );
// };
export const useGetBranch = (CompanyId: number | null) => () => {
  return useQuery(
    ['branch', CompanyId],
    () => {
      return requestManager.get('/api/UserAccountAllocation/GetBranchesByUserId', {
        params: { CompanyId, UserAccountId: userDetail?.UserId },
      });
    },
    { enabled: !!CompanyId }
  );
};
