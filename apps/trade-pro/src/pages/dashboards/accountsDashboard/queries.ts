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

export const useGetAccountDashboardData = (enabled = true, ActivityId: number, params: TAccountDashboardCriteria) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(
    ['accounts-dashboard', ActivityId],
    () => {
      return requestManager.post('/api/Dashboard/AccountDashboard', {
        OrganizationId: parseInt(userDetail?.OrganizationId),
        FinancialYearId: parseInt(financialYear?.Id),
        DashboardObjectName: 'ExectiveAccountsDashboard',
        ActivityId: ActivityId,
        CompanyIds: userDetail?.IsHeadOffice
          ? params.CompanyIds !== undefined && params.CompanyIds !== null
            ? params.CompanyIds?.toString()
            : ''
          : userDetail?.CompanyId.toString(),
        FromDate: new Date(),
        ToDate: new Date(),
        ReqType: params.ReqType !== undefined && params.ReqType !== null ? params.ReqType : '',
      });
    },
    { enabled }
  );
};

export const useGetCompanies = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Companies',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: { OrgCompanyTypeId: userDetail?.OrganizationId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
