import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TAddCOAAllocation, TAddCOAAllocationList } from './types';

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
export const useGetDeAllocationAccounts = (enabled?: false, AccountIds?: number | null | any) => {
  return useQuery(['accounts-deallocation', AccountIds], () => {
    return requestManager.get(
      '/api/COAAllocation/DeAllocateAccounts',
      {
        params: {
          
          CompanyId: userDetail?.CompanyId,
          AccountIds: AccountIds
        },
        
      }
       
    );
  },   { enabled: false,
    onSuccess: (response: AxiosResponse) => {
      queryClient.invalidateQueries('Allocated_Accounts');
      queryClient.invalidateQueries('UnAllocated_Accounts');
      if (response?.data && response?.data?.Status === false) {
        notification.error({
          message: 'Error',
          description: response?.data?.Message || 'An error occurred.',
        });
      } else if (response?.data && response?.data?.Status === true) {
        const msg = 'Record UnAllocated successfully!';
        notification.success({ description: '', message: msg });
      }
    },
    onError: (error: AxiosError) => {
      const msg = error.response?.data || 'Something went wrong';
      notification.error({ description: '', message: msg as string });
    
  }
  });
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

export const useGetUnAllocationAccounts = (enabled = true, Id: number) => {
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




export const useAddAllocationAccounts = (enable?: true, companyId?: number) => {
  return useMutation(
    'add_account_allocation',
    (data: TAddCOAAllocationList[]) => {
      let dataToSubmit = {};

      dataToSubmit = {
        COAAllocationlist: [
          ...data.map((item) => ({
            ...item,
            IsActive: true,
            OrganizationId: userDetail?.OrganizationId,
            BranchId: financialYear?.Id,
            CompanyId: companyId,
            EntryUserId: userDetail?.UserId,
            GLPageNo: '',
          })),
        ],
        // ...params,
      };
      return requestManager.post('/api/COAAllocation/Save', dataToSubmit);
    },
    {      
        onSuccess: (response: AxiosResponse) => {
          queryClient.invalidateQueries('Allocated_Accounts');
          queryClient.invalidateQueries('UnAllocated_Accounts');
          if (response?.data && response?.data?.Status === false) {
            notification.error({
              message: 'Error',
              description: response?.data?.Message || 'An error occurred.',
            });
          } else if (response?.data && response?.data?.Status === true) {
            const msg = 'Record Allocated successfully!';
            notification.success({ description: '', message: msg });
          }
        },
        onError: (error: AxiosError) => {
          const msg = error.response?.data || 'Something went wrong';
          notification.error({ description: '', message: msg as string });
      }
    }
  );
};

export const useGetDeAllocationAccountss = (enable?: false, companyId?: number, ) => {
  return useMutation(
    ['deAllocate-account-unallocated'],
    (data: TAddCOAAllocationList[] ) => {
      let dataToSubmit = {};

      dataToSubmit = {
        COAAllocationlist: [
          ...data.map((item) => ({
            ...item,
            IsActive: false,
            OrganizationId: userDetail?.OrganizationId,
            BranchId: financialYear?.Id,
            CompanyId: companyId,
            EntryUserId: userDetail?.UserId,
            // ChartofAccountId:ChartofAccountId
            // ...data.map((id)=>{id.ChartofAccountId})
            // GLPageNo: '',
          })),
        ],
        // ...params,
      };
      return requestManager.post('/api/COAAllocation/Save', dataToSubmit);
    },
    {
        onSuccess: (response: AxiosResponse) => {
          queryClient.invalidateQueries('Allocated_Accounts');
          queryClient.invalidateQueries('UnAllocated_Accounts');
          if (response?.data && response?.data?.Status === false) {
            notification.error({
              message: 'Error',
              description: response?.data?.Message || 'An error occurred.',
            });
          } else if (response?.data && response?.data?.Status === true) {
            const msg = 'Record UnAllocated successfully!';
            notification.success({ description: '', message: msg });
          }
        },
        onError: (error: AxiosError) => {
          const msg = error.response?.data || 'Something went wrong';
          notification.error({ description: '', message: msg as string });
      }
    }
  );
};


export const useGetDeAllocationAccountsss = (enabled = false, Id?: number, CompanyId?: number) => {
  return useQuery(
    ['account-unallocated', Id],
    () => {
      return requestManager.get('/api/COAAllocation/DeAllocateAccounts', {
        params: {
          CompanyId: CompanyId,
          AccountIds: Id,
        },
      });
    },
    {
      enabled: false,

      onSuccess: () => {
        queryClient.invalidateQueries('Allocated_Accounts');
        queryClient.invalidateQueries('UnAllocated_Accounts');
        const msg = 'Record DeAllocated successfully!';

        notification.success({ description: '', message: msg });
      },

      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
