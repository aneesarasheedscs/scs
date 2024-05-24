import { useMutation, useQuery } from 'react-query';
import { TBookingOrder, TSaleOrder, TSaleOrderDetail } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { SaleOrderRetailCriteria } from './table/type';
import { useDebounce } from 'react-use';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetSaleOrder = (enabled:true,params?: SaleOrderRetailCriteria) => {
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



export const useGetItemWithPackUom = (enabled = true, params?: any) => {
  return useQuery(
    'item-with-pack-uom',
    () => {
    return requestManager.get('/api/ItemPricingSchedule/ItemWithPriceRateRateUomAndPackUom', {
      params:{
        PriceTypeId:6,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      }
    });
  },
  { enabled }
);
};
export const useGetSupplierCustomer = (enabled = true, params?: any) => {
  return useQuery(
    'supplier-customer',
    () => {
    return requestManager.get('/api/SupplierCustomer/GetforComboBinding', {
      params:{
      
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      }
    });
  },
  { enabled }
);
};

// export const useGetSupplierCustomerGetVendors = (enabled=true) => {
//   return useQuery('supplier-customer-getvendors', () => {
//     return requestManager.post('/api/SupplierCustomer/GetVendorsAndCustomers', {
   
//       OrganizationId: userDetail?.OrganizationId,
//       CompanyId: userDetail?.CompanyId,
  
//       ...params,
//     });
//   });
// };



export const useGetBookingOrder = (enabled:true,params?: any) => {
  return useQuery('booking-order', () => {
    return requestManager.post('/api/PreBookingOrder/FormHistory', {
      DocumentTypeId: 129,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      EntryUser: userDetail?.UserId,
      FormDate: financialYear?.Start_Period,
      ToDate:financialYear?.End_Period,
      BranchesId: 2,
      FinancialYearId: 2,
      NoOfRecords: 50,
      CanViewAllRecord: 'true',
      SupplierCustomerId:0,
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
//Save Booking Order
export const useAddBookingOrder = (params?: TBookingOrder) => {
  return useMutation(
    'booking_order_add',
    (data: TBookingOrder) => {
      return requestManager.post('/api/PreBookingOrder/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 129,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: 2,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        DeliveryStartDate: new Date().toISOString(),
        OrderDueDate:new Date().toISOString(),
        OrderExpiryDate: new Date().toISOString(),

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('booking-order');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
export const useUpdateBookingOrder = (Id?: number | null, params?: TBookingOrder) => {
  return useMutation(
    'booking_order_update',
    (data: TBookingOrder) => {
      return requestManager.post('/api/PreBookingOrder/Save', {
        ...data,
         
        Id: 0,
        DocumentTypeId: 129,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: 2,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        DeliveryStartDate: new Date().toISOString(),
        OrderDueDate:new Date().toISOString(),
        OrderExpiryDate: new Date().toISOString(),

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('booking-order');
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


export const useGetPurchaseOrderStatus = (enabled = true, params?: any) => {
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