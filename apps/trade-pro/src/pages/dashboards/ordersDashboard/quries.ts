import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TFilters } from './types';
import { AxiosError, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
const SupplierCustomerId: any = userDetail?.SupplierCustomerId;

export const useGetOrdersDashboardStatus = (enabled = true, parameters?: TFilters) => {
  return useQuery(
    'ordersDashboard',
    () => {
      return requestManager.get('/api/PreBookingOrder/PreBookingOrder_Dashboard', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          UserId: userDetail?.UserId,
          SupplierCustomerId: userDetail?.SupplierCustomerId,
          ...parameters,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetOrdersDashboardforDeliveryInTransit = (enabled = true, params?: TFilters) => {
  return useQuery(
    'delivery_In_transit',
    () => {
      return requestManager.post('/api/InvGdn/getGdnDataForMobileApp', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        UserId: userDetail?.UserId,
        SupplierCustomerId: userDetail?.SupplierCustomerId,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        ...params,
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetOrdersDashboardforSalesBill = (enabled = true, params?: TFilters) => {
  return useQuery(
    'sales_bill',
    () => {
      return requestManager.post('/api/InvSaleInvoice/getSaleDataForMobileApp', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        UserId: userDetail?.UserId,
        SupplierCustomerId: userDetail?.SupplierCustomerId,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        ...params,
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetOrdersDashboardDeliveryInTransitPdf = (Id?: number | null) => {
  return useQuery(
    ['delivery_In_transit_report', Id],
    () => {
      return requestManager.post('/api/InventoryHistoryReports/InvRptGdnRiceSlip_260', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: Id,
        CompanyName: userDetail?.CompanyName,
        CompanyAddress: userDetail?.CompanyAddress,
        ReportName: '260-InvRptGdnRiceSlip',
      });
    },
    {
      cacheTime: userDetail?.expires_in,
      enabled: !!Id,
    }
  );
};
export const useGetOrdersDashboardSalesBillPdf = (Id?: number | null) => {
  return useQuery(
    ['sales_bill_report', Id],
    () => {
      return requestManager.post('/api/InventoryPdfReports/InvSaleInvoiceCustomerBillReport301', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: Id,
        CompanyName: userDetail?.CompanyName,
        CompanyAddress: userDetail?.CompanyAddress,
        DocumentTypeId: 95,
        ReportName: '301-InvRepSaleBillCustomer',
      });
    },
    {
      cacheTime: userDetail?.expires_in,
      enabled: !!Id,
    }
  );
};
export const useGetOrdersDashboardDlvTransitConfirmStatus = (Id?: number | null) => {
  return useQuery(
    ['delivery_In_transit_confirm_status', Id],
    () => {
      return requestManager.get('/api/InvGdn/GdnStatusUpdate', {
        params: {
          Id: Id,
          CustomerRemarks: 'Delivery Received',
        },
      });
    },
    {
      enabled: !!Id,

      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Confirmed successfully!' || response?.data?.Data?.Result;
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('delivery_In_transit');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useGetOrdersDashboardSaleBillConfirmStatus = (Id?: number | null) => {
  return useQuery(
    ['sales_bill_confirm_status', Id],
    () => {
      return requestManager.get('/api/InvSaleInvoice/InvoiceStatusUpdate', {
        params: {
          Id: Id,
          CustomerRemarks: 'Delivery Received',
        },
      });
    },
    {
      enabled: !!Id,

      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Confirmed successfully!' || response?.data?.Data?.Result;
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('delivery_In_transit');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useGetOrdersDashboardforBookingDemand = (enabled = true, params?: TFilters | null) => {
  return useQuery(
    'orders-dashboard-detail',
    () => {
      return requestManager.post('/api/PreBookingOrder/PreBookingOrderDashboard_Detail', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        UserId: userDetail?.UserId,
        SupplierCustomerId: 0,
        ...params,
      });
    },
    { enabled }
  );
};
export const useGetPreBookingOutStandingOrdersDashboard = (enabled = true, params?: TFilters | null) => {
  return useQuery(
    'pre-booking-order',
    () => {
      return requestManager.post('/api/PreBookingOrder/OutstandingOrders_PreDashboard', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        UserId: userDetail?.UserId,

        SupplierCustomerId: 0,
        // parseInt(SupplierCustomerId) > userDetail.UserId ? userDetail?.SupplierCustomerId : userDetail?.UserId,
        // SupplierCustomerId: userDetail?.SupplierCustomerId > userDetail?.UserId ? userDetail?.SupplierCustomerId: userDetail?.UserId,
        // SupplierCustomerId: parseInt(userDetail?.SupplierCustomerId) > userDetail?.UserId ? userDetail?.SupplierCustomerId : userDetail?.UserId,

        ...params,
      });
    },
    { enabled }
  );
};
