import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TAccountDashboardCriteria } from './types';

export const useGetDateType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'DateTypes',
    () => {
      return requestManager.get('api/CommonServices/DateType', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetAccountDashboardData = (enabled = false, params: TAccountDashboardCriteria) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(
    'accounts-dashboard',
    () => {
      return requestManager.get('/api/Dashboard/AccountDashboard?', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
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
