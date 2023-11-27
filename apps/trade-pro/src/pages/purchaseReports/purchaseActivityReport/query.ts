import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedUserDetail } from '@tradePro/utils/storageService';

import { AxiosResponse } from 'axios';
import { TSearchCritariaPurchaseActivity } from './types';

const userDetail = storedUserDetail();

export const usePurchaseInvoiceTable = (
  enabled = true,
  params?: TSearchCritariaPurchaseActivity,
  selection?: string
) => {
  return useQuery(
    'sdfsd',
    () => {
      let documentTypeId = 0;
      let paymentTermId = 0;

      if (selection === 'purchaseReturn') {
        documentTypeId = 60;
      } else if (selection === 'cashPurchase') {
        paymentTermId = 1;
      } else if (selection === 'creditPurchase') {
        paymentTermId = 2;
      } else if (selection === 'NetTotal') {
        paymentTermId = 0;
      }
      return requestManager.post('/api/InvPurchaseInvoice/PurchaseReportWithActivities', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: documentTypeId,
        PaymentTermId: paymentTermId,
        ReportType: 'Purchase By Detail',

        ...params,
      });
    },
    { enabled }
  );
};

export const useGetPurchaseInvoice = () => {
  return useQuery('Purchase_invoice', () => {
    return requestManager.get('/api/InvPurchaseInvoice/AllComboAgainstPurchaseInvoice', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 0,
        ActivityType: null,
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
