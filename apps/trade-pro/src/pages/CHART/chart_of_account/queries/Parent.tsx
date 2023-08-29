import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';


export const useParent = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-parent',
    () => {
      return requestManager.get('api/ChartofAccount/ReadAllParentGroupAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: 2,
          LanguageId: 2},
      });
    },
  );
};

export const uselevel = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-level',
    () => {
      return requestManager.get('api/ChartofAccount/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          LanguageId: 2},
      });
    },
  );
};

export const usePl = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-Pl',
    () => {
      return requestManager.get('api/AccountNotes/GetAll_PL', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
         },
      });
    },
    // { cacheTime: userDetail?.expires_in }
  );
};

export const useBs = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-Bs',
    () => {
      return requestManager.get('api/AccountNotes/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: 2,
          LanguageId: 2},
      });
    },
    // { cacheTime: userDetail?.expires_in }
  );
};

export const useAccount_type = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-accountType',
    () => {
      return requestManager.get('api/AccountTypes/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
         },
      });
    },
  );
};
export const useAccount_group = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account_group',
    () => {
      return requestManager.get('api/CommonServices/AccountGroupOrDetail', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
         
          },
      });
    },
    // { cacheTime: userDetail?.expires_in }
  );
};


export const usecompany = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-company',
    () => {
      return requestManager.get('api/Company/GetAlldt?OrgCompanyTypeId=2&Id=0', {
        params: {
          OrgCompanyTypeId:2,
          Id:0
         },
      });
    },
  );
};

export const usehistoryTable = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-HistoryTable',
    () => {
      return requestManager.get('api/ChartofAccount/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },

  );
};

export const Parent_Account_Leave = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Chart-of-Account-parent_Account_Leave',
    () => {
      return requestManager.get('api/ChartofAccount/GenerateCodebyParentAccountCode?OrganizationId=2&CompanyId=2&FinancialYearId=2&AccountCode=15&SearchDetailAccount=0&SearchGroupAccount=0', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: userDetail?.FinancialYearId,
          AccountCode: userDetail?.AccountCode,
         
        },
      });
    },

  );
};



