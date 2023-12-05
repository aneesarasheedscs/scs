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

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetAccountTitle = () => {
  return useQuery('accounttitle', () => {
    return requestManager.get('/api/ChartofAccount/DetailAccount', {
      params: { ...params, LanguageId: 0 },
    });
  });
};

export const useGetAccountDetail = (enabled: boolean, AccountId?: number) => {
  return useQuery(
    ['account_detail'],
    () => {
      return requestManager.get('/api/ChartofAccount/GetCoaDetailByAccountId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Id: AccountId,
        },
      });
    },
    { enabled }
  );
};

export const useGetAccountBalance = (
  enabled?: boolean,
  AccountId?: number,
  FromDate?: string | Date,
  ToDate?: string | Date
) => {
  const userDetail = storedUserDetail();
  return useQuery(
    ['account_balance'],
    () => {
      return requestManager.get('/api/Voucher/GetAccountsBalancesOpeningCurrentAndClosing', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          AccountId: AccountId,
          FromDate: FromDate,
          ToDate: ToDate,
        },
      });
    },
    { enabled: enabled }
  );
};
