import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TrialBalanceSearchCriteria, TtrialBalanceSelectedSearchCriteria } from './type';

const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();
//Trial Balance combo
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

export const useGetCustomGroup = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'custom-group',
    () => {
      return requestManager.get('/api/AcLookUpsController/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetDocumentType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'document-type',
    () => {
      return requestManager.get('api/Voucher/GetDocumentTypesFromVouchers', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
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

// export const useGetTrialBalanceReport = (enabled = true, params?: TrialBalanceSearchCriteria) => {
//   return useQuery(
//     'trial-balance',
//     () => {
//       return requestManager.post('/api/AccountsReports/TrialBalance', {
//         OrganizationId: userDetail?.OrganizationId,
//         CompanyId: userDetail?.CompanyId,
//         FinancialYearId: FinancialYear?.Id,
//         IsApproved: params?.ApprovedFilter == 'All' ? false : true,
//         ...params,
//       });
//     },
//     { enabled }
//   );
// };



export const useGetTrialAllLevelReport = (params?:TrialBalanceSearchCriteria) => {
  return useQuery(
    'tiral-all-level',
    () => {
      return requestManager.get('/api/AccountsReports/HararicalTrialBalance', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          AccountLevel: 2,
          // FormDate:FinancialYear?.Start_Period,
          // ToDate:FinancialYear?.End_Period,
          ...params
          
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};