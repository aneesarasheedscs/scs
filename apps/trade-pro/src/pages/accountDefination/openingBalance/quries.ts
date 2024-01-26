import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TaddOpeningBalance, TopeningBalanceHistory } from './types';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@scs/configs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetByIdOpeningBalnce = (enabled = true, Id?: number | null) => {
  return useQuery(
    ['account-titlee', Id],
    () => {
      return requestManager.get('/api/AccountsOpeningBalances/GetById', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          Id,
        },
      });
    },
    { enabled: !!Id }
  );
};

export const useGetOpenBalanceHistory = (enabled = true) => {
  return useQuery(
    'openingBalance',
    () => {
      
      return requestManager.get('/api/AccountsOpeningBalances/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
        },
      });
    },
    { enabled }
  );
};

export const useAddOpeningBalance = (params?: TaddOpeningBalance) => {
  return useMutation(
    'openingBalanceSave',
    
    (data: TaddOpeningBalance) => {
      let dataToSubmit = {};
      // const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        PostUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserName,
        PostState: false,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/AccountsOpeningBalances/Save', dataToSubmit);
    },
    {
      onSuccess: () => {

        queryClient.invalidateQueries('openingBalance');
        const msg = 'Record Save successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateOpeningBalance = (Id?: number | null, ChartOfAccountId?: number, params?: TaddOpeningBalance) => {
  console.log(Id);
  return useMutation(
    'openingBalanceUpdate',
    (data: TaddOpeningBalance) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        PostUser: userDetail?.UserId,
        ModifyUser: userDetail?.UserName,
        PostState: false,
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        ...params,
      };
      return requestManager.post('/api/AccountsOpeningBalances/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        console.log('Update mutation succeeded');
        queryClient.invalidateQueries('openingBalance');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
