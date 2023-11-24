import { QueryFunction, useQuery, UseQueryResult } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { PayablesSearchCriteria } from './type';
import { AxiosResponse } from 'axios';
;


// import { storedUserDetail } from '@tradePro/utils/storageService';
const userDetail = storedUserDetail();


const financialYear = storedFinancialYear();

// Account Types
export const useGetAccountTypeId = () => {
  return useQuery('account-id', getAccountId, {
    cacheTime: userDetail?.expires_in,
  });
};
const getAccountId = async () => {
  const response = await requestManager.get('/api/AccountTypes/GetByOrganizationCompanyId', {
    params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.Id === 3 || item.Id === 22);
  console.log(filteredData);
  return filteredData;
};
// Account Title
export const useGetAccountTitle = (AccountTypeId?: number | null) => {
  return useQuery(['account-title', AccountTypeId], () => getAccountTitle(AccountTypeId), {
    cacheTime: userDetail?.expires_in,
    enabled: !!AccountTypeId,
  });
};
const getAccountTitle = async (AccountTypeId: any) => {
  const response = await requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
    params: {
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      FinancialYearId: financialYear?.Id,
      LanguageId: 0,
      Account_Level: 3,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: any) => item.AccountTypeId === AccountTypeId);
  console.log(filteredData);
  return filteredData;
};
// export const useGe tAccountTitle = (AccountTypeId?: number | null) => () => {
//   return useQuery(
//     ['account-title', AccountTypeId],
//     async () => {
//       const response = await requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
//         params: {
//           OrganizationId: userDetail?.OrganizationId,
//           CompanyId: userDetail?.CompanyId,
//           FinancialYearId: financialYear?.Id,
//           LanguageId: 0,
//           Account_Level: 3,
//         },
//       });
//       const rawData = response.data?.Data.Result || [];
//       const filteredData = rawData.filter((item: any) => item.AccountTypeId === AccountTypeId);
//       console.log(filteredData);
//       return filteredData;
//     },
//     {
//       enabled: !!AccountTypeId,
//     }
//   );
// };
export const PayableReportQueryHistory = (enabled = true, params?: PayablesSearchCriteria) => {
  return useQuery(
    'receivable-query',
    () => {
      return requestManager.post('api/AccountsReports/PayablesWithLastBillAndPaidAmount', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 81,
        ...params,
      });
    },
    { enabled }
  );
};