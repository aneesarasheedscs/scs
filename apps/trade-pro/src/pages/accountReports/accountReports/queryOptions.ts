import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetCompany = () => {
  return useQuery('branches', () => {
    return requestManager.get('/api/Company/GetCompaniesAndBranches?OrganizationId=2', {
      params,
    });
  });
};

export const useGetSubBranch = () => {
  return useQuery('subBranch', () => {
    return requestManager.get('/api/Branches/GetAll?OrganizationId=2&CompanyId=2', { params });
  });
};

export const useGetAccountTitle = () => {
  return useQuery('accounttitle', () => {
    return requestManager.get(
      '/api/ChartofAccount/DetailAccount?OrganizationId=2&CompanyId=2&BranchesId=2&LanguageId=0',
      {
        params,
      }
    );
  });
};

export const useGetAccountDetail = (AccountId: number) => {
  return useQuery(['account_detail', AccountId], () => {
    return requestManager.get('/api/ChartofAccount/GetCoaDetailByAccountId', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: AccountId,
      },
    });
  });
};

export const useGetAccountBalance = (AccountId: number, FromDate: Date, ToDate: Date) => {
  const userDetail = storedUserDetail();
  return useQuery(['account_balance', AccountId, FromDate, ToDate], () => {
    return requestManager.get('/api/Voucher/GetAccountsBalancesOpeningCurrentAndClosing?', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        AccountId: AccountId,
        FromDate: FromDate,
        ToDate: ToDate,
      },
    });
  });
};

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
