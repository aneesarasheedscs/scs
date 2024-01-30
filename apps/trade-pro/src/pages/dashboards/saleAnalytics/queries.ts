import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSalesDashboardCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetDateType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'date-type',
    () => {
      return requestManager.get('api/CommonServices/DateType', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetFromToDate = (enabled = true, params: TSalesDashboardCriteria) => {
  const financialYear = storedFinancialYear();
  const userDetail = storedUserDetail();

  return useQuery(
    'fromtodate',
    () => {
      return requestManager.get('/api/Dashboard/AccountDashboard?', {
        params: {
          // OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          ActivityId: 1,
          ...params,
        },
      });
    },

    { enabled }
  );
};

export const useGetMasterBranchByUserId = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'master-branch',
    () => {
      return requestManager.get('/api/Company/GetCompaniesByUserId?OrganizationId=2&UserId=2', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const usePostSalesAnalyticsDashboard = (
  enabled = true,
  params?: TSalesDashboardCriteria //types
) => {
  return useQuery(
    'sale-analytics',
    () => {
      return requestManager.post('/api/Dashboard/OrgSalesAnalyticsDashboard', {
        CompanyIds: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        // BranchIds: userDetail?.BranchesId,
        // FromDate: financialYear?.Start_Period,
        // ToDate: financialYear?.End_Period,
        ...params,
      });
    },
    { enabled }
  );
};
