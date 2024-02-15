import { QueryFunction, useMutation, useQuery, UseQueryResult } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { ReceivableReportTypeCriteria, TAddFollowUp } from './type';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
// import { AxiosResponse } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
// useGetParentCategories
//
export const useGetCityNamecategory = (enabled = true) => {
  return useQuery(
    'city-name',
    () => {
      return requestManager.get('/api/City/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};
// Account Types
export const useGetAccountTypeId = () => {
  return useQuery('account-type', getAccountId, {
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

//Account Title
// export const useGetAccountTitle = (AccountTypeId?: number | null) => {
//   return useQuery(['account-title', AccountTypeId], () => getAccountTitle(AccountTypeId), {
//     cacheTime: userDetail?.expires_in,
//     enabled: !!AccountTypeId,
//   });
// };
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

// export const useGetAccountTitle = (AccountTypeId?: number | null) => () => {
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
// useGetItemNameCategories
export const useGetCustomGroup = (enabled = true, params?: ReceivableReportTypeCriteria) => {
  return useQuery(
    'item-name',
    () => {
      return requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ...params,
        },
      });
    },
    { enabled }
  );
};

// useGetApprovedStatus
export const useGetApprovedStatus = (enabled = true) => {
  return useQuery(
    'approved-status',
    () => {
      return requestManager.get('/api/CommonServices/ApprovedStatus', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};


export const useAddFollowUp = (params?: TAddFollowUp) => {

  return useMutation(
    'follow-up-receivables',
    (data: TAddFollowUp) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0, //insert  (save)
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        CommentsDate: '2023-09-05',
        ChartOfAccountId: 21340,
        CommentsDetail: '',
        ...params,
      };
      return requestManager.post('/api/AccountsPayRecFollowUpHistory/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-follow-up');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'add-follow-up';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useGetAccountTitle = () => {
  return useQuery(
    'account-titlee',
    () => {
      return requestManager.get('/api/COAAllocation/AccountsComboFill?', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};