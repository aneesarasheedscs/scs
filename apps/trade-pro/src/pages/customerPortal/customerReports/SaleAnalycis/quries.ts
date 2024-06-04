import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSaleAnalyticsCriteria, TpuchaseAnalyticsItemGroupCriteria } from './types';

const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();

export const useSeasonYearSchedule = () => {
  return useQuery(
    'seasonYear-Schedule',
    () => {
      return requestManager.get('api/SeasonYearSchedule/GetAll', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetSaleAnalyticsReport = (
  enabled = true,
  params?: TSaleAnalyticsCriteria,
  StartDate?: Date,
  EndDate?: Date
) => {
  const currentDate = dayjs(new Date());
  const startOfMonth = currentDate.startOf('month');

  const endOfMonth = currentDate.endOf('month');
  console.log(StartDate, 'startdate');
  return useQuery(
    'purchase-analytics',

    () => {
      return requestManager.post('api/InvSaleInvoice/SaleAnalyticsA_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        StartDate: StartDate,
        EndDate: EndDate,
        FromDate: startOfMonth,
        ToDate: endOfMonth,

        ...params,
      });
    },
    { enabled: !!StartDate && !!EndDate }
  );
};

export const useGetSaleInvoiceReportAB = (
  enabled = true,
  params?: TSaleAnalyticsCriteria,
  StartDate?: Date,
  EndDate?: Date,
  IpcIds?: number | null
) => {
  const currentDate = dayjs(new Date());
  const startOfMonth = currentDate.startOf('month');

  const endOfMonth = currentDate.endOf('month');
  console.log(StartDate, 'startdate');
  return useQuery(
    ['sale-invoice', IpcIds],

    () => {
      return requestManager.post('api/InvSaleInvoice/SaleAnalyticsAB_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        StartDate: StartDate,
        EndDate: EndDate,
        FromDate: startOfMonth,
        ToDate: endOfMonth,
        Ids: IpcIds, //parent category
        Activity: 'Product_Wise',

        ...params,
      });
    },
    { enabled: !!StartDate && !!EndDate }
  );
};
export const useGetPurchaseInvoiceReportAB = (
  enabled = true,
  params?: TSaleAnalyticsCriteria,
  StartDate?: Date,
  EndDate?: Date,
  IpcIds?: number | null,

  SortNo?: number | null
) => {
  const currentDate = dayjs(new Date());
  const startOfMonth = currentDate.startOf('month');

  const endOfMonth = currentDate.endOf('month');
  console.log(StartDate, 'startdate');
  return useQuery(
    ['purchase-invoice-party-wise', IpcIds, SortNo],

    () => {
      return requestManager.post('api/InvPurchaseInvoice/PurchaseAnalyticsAB_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        StartDate: StartDate,
        EndDate: EndDate,
        FromDate: startOfMonth,
        ToDate: endOfMonth,
        Ids: IpcIds, //parent category

        SortNo: SortNo,
        Activity: 'ProductAndPartyWise',
        ItemId: 0,
        ...params,
      });
    },
    { enabled: !!StartDate && !!EndDate }
  );
};

export const useGetItemGroup = (
  enabled = true,
  params?: TpuchaseAnalyticsItemGroupCriteria,
  StartDate?: Date,
  EndDate?: Date,
  SortNo?: Number,
  IpcId?: Number
) => {
  const currentDate = dayjs(new Date());
  const startOfMonth = currentDate.startOf('month');

  const endOfMonth = currentDate.endOf('month');
  console.log(StartDate, 'startdate');
  return useQuery(
    'purchase-analytics-item-group',

    () => {
      return requestManager.post('api/InvPurchaseInvoice/PurchaseAnalyticsAB_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        StartDate: StartDate,
        EndDate: EndDate,
        FromDate: startOfMonth,
        ToDate: endOfMonth,
        Ids: IpcId,
        Activity: 'Product_Wise',
        SortNo: SortNo,
        ItemId: 0,
        ...params,
      });
    },
    { enabled: !!StartDate && !!EndDate }
  );
};
export const useGetPADDY9C = (
  enabled = true,
  params?: TpuchaseAnalyticsItemGroupCriteria,
  StartDate?: Date,
  EndDate?: Date,
  SortNo?: Number,
  IpcId?: Number
) => {
  const currentDate = dayjs(new Date());
  const startOfMonth = currentDate.startOf('month');

  const endOfMonth = currentDate.endOf('month');
  console.log(StartDate, 'startdate');
  return useQuery(
    'purchase-analytics-paddy9c',

    () => {
      return requestManager.post('api/InvPurchaseInvoice/PurchaseAnalyticsAB_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        StartDate: StartDate,
        EndDate: EndDate,
        FromDate: startOfMonth,
        ToDate: endOfMonth,
        Ids: IpcId,
        Activity: 'ProductAndPartyWise',
        SortNo: SortNo,
        // ItemId: ItemId,
        ...params,
      });
    },
    { enabled: !!StartDate && !!EndDate }
  );
};
