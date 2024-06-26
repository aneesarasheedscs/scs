import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

export const useGetCityName = (CompanyId?: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    ['city-name', CompanyId],
    () => {
      return requestManager.get('/api/City/GetByOrganizationCompanyId', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetGroupAccount = (AccountClassId?: number, CompanyId?: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(
    ['group-account', AccountClassId, CompanyId],
    () => {
      return requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: CompanyId,
          FinancialYearId: financialYear.Id,
          Account_Level: 3,
          LanguageId: 0,
          AccountTypeId: 3,
          AccountClassId: AccountClassId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetAccountTitle = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'account-title',
    () => {
      return requestManager.get('/api/COAAllocation/AccountsComboFill?', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
