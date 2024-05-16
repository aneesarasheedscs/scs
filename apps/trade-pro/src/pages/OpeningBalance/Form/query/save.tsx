import { queryClient } from '@tradePro/configs';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { TAccountOpeningBalance, TAccountOpeningBalanceList } from '../types';

export const useSaveAccountOpeningBalance = (params?: TAccountOpeningBalance) => {
  return useMutation(
    (data: TAccountOpeningBalance) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      const financialYear = storedFinancialYear();
      dataToSubmit = {
        ...data,

        Id: 12,
        ChartOfAccountId: 21331,
        ChartOfAccountTitle: 'AHMAD UMAIR - FSD',
        FinancialYearId: 2,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: 2,
        ModifyUser: 2,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        PostState: false,
        PostUser: 2,
        YearObCredit: 1000,
        YearObDebit: 0,
        ...params,
      };
      return requestManager.post('/api/AccountsOpeningBalances/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('accountopeningbalance');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
// List Query

export const useSaveAllAccountOpeningBalance = (params?: TAccountOpeningBalanceList) => {
  return useMutation(
    (data: TAccountOpeningBalanceList) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      const financialYear = storedFinancialYear();
      dataToSubmit = {
        ...data,

        Id: 12,
        ChartOfAccountId: 21331,
        ChartOfAccountTitle: 'AHMAD UMAIR - FSD',
        FinancialYearId: 2,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: 2,
        ModifyUser: 2,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        PostState: false,
        PostUser: 2,
        YearObCredit: 1000,
        YearObDebit: 0,
        ...params,
      };
      return requestManager.post('/api/AccountsOpeningBalances/SaveAllRecord', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('openingbalancelist');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

// import { queryClient } from '@tradePro/configs';
// import { requestManager } from '@tradePro/configs/requestManager';
// import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
// import { notification } from 'antd';
// import { AxiosError } from 'axios';
// import { useMutation } from 'react-query';

// export const useSaveAccountOpeningBalance = (Id?: number | null, params?: TAccountOpeningBalance) => {
//   return useMutation(
//     (data: TAccountOpeningBalance) => {
//       console.log(data);
//       return saveOpeningBalance(data);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('save-profile');
//         const msg = Id ? 'Record updated successfully!' : 'Record added successfully!';
//         notification.success({ description: '', message: msg });
//       },
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };
// const saveOpeningBalance = (data: TAccountOpeningBalance, params?: TAccountOpeningBalance | undefined) => {
//   const userDetail = storedUserDetail();
//   const financialYear = storedFinancialYear();

//   return requestManager.post('/api/AccountsOpeningBalances/SaveAllRecord', {
//     ...data,

//     Id: 12,
//     ChartOfAccountId: 21331,
//     ChartOfAccountTitle: 'AHMAD UMAIR - FSD',
//     FinancialYearId: 2,
//     OrganizationId: userDetail?.OrganizationId,
//     CompanyId: userDetail?.CompanyId,
//     EntryUser: 2,
//     ModifyUser: 2,
//     EntryDate: new Date().toISOString(),
//     ModifyDate: new Date().toISOString(),
//     PostDate: new Date().toISOString(),
//     PostState: false,
//     PostUser: 2,
//     YearObCredit: 1000,
//     YearObDebit: 0,
//     ...params,
//   });
// };
