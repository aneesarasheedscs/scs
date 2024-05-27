import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TChartOfAccountCriteria } from './type';

const userDetail = storedUserDetail();

// useGetCompanyName
export const useGetCompanyName = (enabled = true) => {
  return useQuery(
    'company-name',
    () => {
      return requestManager.get('/api/Company/GetAlldt', {
        params: {
          OrgCompanyTypeId: userDetail?.OrganizationId,
        },
      });
    },
    { enabled }
  );
};

// useGetCOAReport
export const useGetCOAReport = (enabled = true) => {
  return useQuery(
    'coa-title',
    () => {
      return requestManager.get('/api/COAAllocation/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};

// useGetLangauge
export const useGetLangauge = (enabled = true) => {
  return useQuery(
    'coa-lang',
    () => {
      return requestManager.get('/api/MultiLanguages/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};

export const useChartOfReporttableQuery = (enabled = true, params?: TChartOfAccountCriteria) => {
  return useQuery(
    'coa-tableQ',
    () => {
      return requestManager.get('api/ChartofAccount/AllChartofAccountForOtherLingo', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          IsApproved: true,
          ...params,
        },
      });
    },
    { enabled }
  );
};
