import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TtrialBalanceSelectedSearchCriteria } from './type';

const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();

export const useGetAccountTitle = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'account-title',
    () => {
      return requestManager.get('/api/ChartofAccount/DetailAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          BranchesId: userDetail?.BranchesId,
          languageId: 0,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//====================
export const useGetCityName = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'city-name',
    () => {
      return requestManager.get('/api/City/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetLanguages = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Languages',
    () => {
      return requestManager.get('api/MultiLanguages/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetDateTypes = () => {
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

export const useGetTrialBalanceSelectedReport = (enabled = true, params?: TtrialBalanceSelectedSearchCriteria) => {
  return useQuery(
    'trial-balance',
    () => {
      return requestManager.post('/api/AccountsReports/SelectedTrialBalanceNew', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYear?.Id,
        ApprovedFilter: params?.IsApproved ? '' : 'All',
        ...params,
      });
    },
    { enabled }
  );
};
