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

const params = { OrganizationId, BranchesId };

export const useGetAccountTitle = (CompanyId?: number) => {
  return useQuery(['accounttitle', CompanyId], () => {
    return requestManager.get('/api/ChartofAccount/DetailAccount', {
      params: { CompanyId: CompanyId, ...params, LanguageId: 0 },
    });
  });
};

export const useGetAccountDetail = (enabled: boolean, CompanyId?: number, AccountId?: number) => {
  return useQuery(
    ['account_detail'],
    () => {
      return requestManager.get('/api/ChartofAccount/GetCoaDetailByAccountId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: CompanyId,
          Id: AccountId,
        },
      });
    },
    { enabled }
  );
};

export const useGetAccountBalance = (
  enabled?: boolean,
  CompanyId?: Number,
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
          CompanyId: CompanyId,
          AccountId: AccountId,
          FromDate: FromDate,
          ToDate: ToDate,
        },
      });
    },
    { enabled: enabled }
  );
};
