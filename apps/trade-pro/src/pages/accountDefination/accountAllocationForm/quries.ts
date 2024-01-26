import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TAddCOAAllocation } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetOpeningBalanceATitle = () => {
  return useQuery('accoun-titlee', () => {
    return requestManager.get(
      '/api/AccountsOpeningBalances/GetById?OrganizationId=2&CompanyId=2&FinancialYearId=2&Id=12',
      {
        params: {
          Id: 12,
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
        },
      }
    );
  });
};

export const useGetOpenBalanceHistory = () => {
  return useQuery('opening-balance-history', () => {
    return requestManager.get(
      '/api/AccountsOpeningBalances/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2&FinancialYearId=2',
      {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
        },
      }
    );
  });
};

export const useGetAccountAllocationComp = () => {
  return useQuery('account-allocation', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: {
        OrgCompanyTypeId: 2,
      },
    });
  });
};

export const useGetFinancialYear = (Id?: number | null) => () => {
  return useQuery(
    ['financial-year', Id],
    () => {
      return requestManager.get('/api/FinancialYear/GetFinancialYearlist', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: Id,
        },
      });
    },
    { enabled: !!Id }
  );
};

export const useGetFinancialYearOnLeave = (Id?: number | null) => {
  return useQuery(
    ['financial-year', Id],
    () => {
      return requestManager.get('/api/FinancialYear/GetFinancialYearlist', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: Id,
        },
      });
    },
    { enabled: !!Id }
  );
};

export const useGetPendingAccountForAllocation = (enabled = true, Id: number) => {
  return useQuery(
    ['UnAllocated_Accounts', Id],
    () => {
      return requestManager.get('/api/COAAllocation/GetAllocatedAndUnAllocatedAccounts', {
        params: {
          CompanyId: Id,
          OrganizationId: userDetail?.OrganizationId,
          ActionId: 1,
        },
      });
    },
    { enabled: !!Id }
  );
};

export const useGetAllocatedAccounts = (enabled = true, Id: number) => {
  return useQuery(
    ['Allocated_Accounts', Id],
    () => {
      return requestManager.get('/api/COAAllocation/GetAllocatedAndUnAllocatedAccounts', {
        params: {
          CompanyId: Id,
          OrganizationId: userDetail?.OrganizationId,
          ActionId: 2,
        },
      });
    },
    { enabled: !!Id }
  );
};

export const useAddAllocationAccounts = (params?: TAddCOAAllocation) => {
  return useMutation(
    'openingBalance',
    (data: TAddCOAAllocation) => {
      let dataToSubmit = {};

      dataToSubmit = {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        // ChartOfAccountId: 21754,
        IsActive: true,
        ...params,
      };
      return requestManager.post('/api/COAAllocation/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('openingBalance');
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

export const useUpdateAllocationAccounts = (
  Id?: number | null,
  ChartOfAccountId?: number,
  params?: TAddCOAAllocation
) => {
  console.log(Id);
  return useMutation(
    'openingBalance',
    (data: TAddCOAAllocation) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryUser: userDetail?.UserId,
        ChartOfAccountId: 21754,
        IsActive: true,
        ...params,
      };
      return requestManager.post('/api/COAAllocation/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
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
