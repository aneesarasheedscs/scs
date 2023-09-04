import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetParentAccount = () => {
  return useQuery('Chart-of-Account-Parent', () => {
    return requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        LanguageId: 2,
        FinancialYearId: 2,
      },
    });
  });
};
export const useGetChartAccountType = () => {
  return useQuery('Chart-of-AccountType', () => {
    return requestManager.get('/api/AccountTypes/GetByOrganizationCompanyId', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      },
    });
  });
};
export const useGetAccountGroup = () => {
  return useQuery('Account-Group', () => {
    return requestManager.get('/api/CommonServices/AccountGroupOrDetail', {
      params: {},
    });
  });
};
export const useGetPLNotesData = () => {
  return useQuery('PL-Notes', () => {
    return requestManager.get('/api/AccountNotes/GetAll_PL', {
      params: {},
    });
  });
};
export const useGetBSNotesData = () => {
  return useQuery('BS-Notes', () => {
    return requestManager.get('/api/AccountNotes/GetAll', {
      params: {},
    });
  });
};
export const useGetAccountCompanies = () => {
  return useQuery('Account-Allocation-Companies', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: {
        OrgCompanyTypeId: userDetail?.OrganizationId,
        Id: financialYear?.Id,
      },
    });
  });
};
