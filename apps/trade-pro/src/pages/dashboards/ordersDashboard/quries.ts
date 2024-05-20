


import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { Tfilter } from '@tradePro/pages/accountReports/ActivitySummary/types';


const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };


export const useGetOrdersDashboard = () => {
  return useQuery(
    'ordersDashboard',
    () => {
      return requestManager.get('/api/PreBookingOrder/PreBookingOrder_Dashboard', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};


export const useGetPreBookingTablesData = (enabled = true, params?: Tfilter) => {
    return useQuery(
      'pre-booking-order',
      () => {
        return requestManager.post('/api/PreBookingOrder/OutstandingOrders_PreDashboard', {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FromDate: financialYear?.Start_Period,
          ToDate: financialYear?.End_Period,
          SupplierCustomerId:0,
   
  
          ...params,
        });
      },
      { enabled }
    );
  };
  