import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosError, AxiosResponse } from 'axios';
import { TFilters } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
const SupplierCustomerId: any = userDetail?.SupplierCustomerId;

export const useGetCustomerReportMenu = (enabled = true) => {
  return useQuery(
    'customer-reports-menu',
    () => {
      return requestManager.get('/api/UserRights/getCustomerScreens', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          SupplierCustomerId: userDetail?.SupplierCustomerId,
          ScreenTypeId: 2,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetItem = (enabled = true) => {
  return useQuery(
    'booking-status-item',
    () => {
      return requestManager.get('/api/PreBookingOrder/GetDataForDropDownFromPreBookingOrder', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          DocumentTypeIds: 129,
          Activity: 'Item',
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetBookingReport = (enabled = true, params?: TFilters | null) => {
  return useQuery(
    'booking-detail',
    () => {
      return requestManager.post('/api/PreBookingOrder/PreBookingOrderDashboard_Detail', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        UserId: userDetail?.UserId,
        SupplierCustomerId: userDetail?.SupplierCustomerId,
        ...params,
      });
    },
    { enabled }
  );
};
