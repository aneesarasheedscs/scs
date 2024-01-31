import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TItemAllocationList } from './types';

const userDetail = storedUserDetail();


export const useGetItemAllocationComp = () => {
  return useQuery('account-allocation', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: {
        OrgCompanyTypeId: userDetail?.OrganizationId,
      },
    });
  });
};
//pending history 1st table
export const useGetPendingItemsForAllocation = (enabled = true, Id?: number) => {
  return useQuery(
    ['item-allocated', Id],
    () => {
      return requestManager.get('/api/ItemAllocation/GetAllocatedAndUnAllocatedItems', {
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

//2nd history
export const useGetUnAllocatedItems = (enabled = true, Id: number) => {
  return useQuery(
    ['item_allocation', Id],
    () => {
      return requestManager.get('/api/ItemAllocation/GetAllocatedAndUnAllocatedItems', {
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

//save
export const useAddAllocationItems = (enable?: true, companyId?: number) => {
  return useMutation(
    'add_item_allocation',
    (data: TItemAllocationList[]) => {
      let dataToSubmit = {};

      dataToSubmit = {
        ItemAllocationlist: [
          ...data.map((item) => ({
            ...item,
            IsActive: true,
            CompanyId: companyId,
            BranchId: 2,
          })),
        ],
        // ...params,
      };
      return requestManager.post('/api/ItemAllocation/Save', dataToSubmit);
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('item-allocated');
        queryClient.invalidateQueries('item_allocation');
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


export const useGetDeAllocationAccounts = (enabled?: false,  ItemsIds?: number | null | any) => {
  return useQuery(['item-unallocated',  ItemsIds], () => {
    return requestManager.get(
      '/api/ItemAllocation/DeAllocateItems',
      {
        params: {
          OrganizationId:userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ItemsIds:  ItemsIds,
        },  
      }   
    );
  },   { enabled: false,
    onSuccess: (response: AxiosResponse) => {
      queryClient.invalidateQueries('item-allocated');
      queryClient.invalidateQueries('item_allocation');
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