import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TSearchCritariaSaleActivity } from './types';

const userDetail = storedUserDetail();

export const useSaleInvoiceTable = (enabled = true, params?: TSearchCritariaSaleActivity, selection?: string) => {
  return useQuery(
    'sdfsd',
    () => {
      let documentTypeId = 0;
      let paymentTermId = 0;

      if (selection === 'saleReturn') {
        documentTypeId = 98;
      } else if (selection === 'cashSale') {
        paymentTermId = 1;
      } else if (selection === 'creditSale') {
        paymentTermId = 2;
      } else if (selection === 'NetTotal') {
        paymentTermId = 0;
      }
      return requestManager.post('/api/InvSaleInvoice/SaleReportWithActivities', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: documentTypeId,
        PaymentTermId: paymentTermId,
        ReportType: 'Sales By Invoices',

        ...params,
      });
    },
    { enabled }
  );
};

export const useGetSaleInvoice = () => {
  return useQuery('sale_invoice', () => {
    return requestManager.get('/api/InvSaleInvoice/AllComboBindAgainstSaleInvoice', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 0,
      },
    });
  });
};

// export const useGetPurchaseInvoice = () => {
//   return useQuery('purchase-invoice', GetClassGroup, {
//     cacheTime: userDetail?.expires_in,
//   });
// };
// const GetClassGroup: QueryFunction<AxiosResponse<any, any>> = async () => {
//   const response = await requestManager.get('/api/InvPurchaseInvoice/AllComboAgainstPurchaseInvoice', {
//     params: {
//       OrganizationId: userDetail?.OrganizationId,
//       CompanyId: userDetail?.CompanyId,
//       DocumentTypeId: 0,
//       ActivityType: null,
//     },
//   });
//   const rawData = response.data?.Data.Result || [];
//   const filteredData = rawData.filter((item: any) => item.ActivityType === 'ItemClassGroup');
//   console.log(filteredData);
//   return filteredData;
// };

// ItemClassGroup

// export const WereHousePurchaseReport = () => {
//   return useQuery('ware-house', WareHouseCombo, {
//     cacheTime: userDetail?.expires_in,
//   });
// };
// const WareHouseCombo: QueryFunction<AxiosResponse<any, any>> = async () => {
//   const response = await requestManager.get('/api/InvPurchaseInvoice/AllComboAgainstPurchaseInvoice', {
//     params: {
//       OrganizationId: userDetail?.OrganizationId,
//       CompanyId: userDetail?.CompanyId,
//       DocumentTypeId: 0,
//       ActivityType: null,
//     },
//   });
//   const rawData = response.data?.Data.Result || [];
//   const filteredData = rawData.filter((item: any) => item.ActivityType === 'WareHouse');
//   console.log(filteredData);
//   return filteredData;
// };

export const useGetPuchaseReportActivities = () => {
  return useQuery('purhase-report-activities', () => {
    return requestManager.get('/api/CommonController/StaticColumnNames', {
      params: {
        Activity: 'ActivitiesForPurchaseReportWithGrossProfitLoss',
      },
    });
  });
};
