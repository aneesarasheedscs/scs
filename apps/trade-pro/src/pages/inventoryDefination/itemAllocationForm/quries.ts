import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TItemAllocationList } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
// const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

export const useGetItemAllocationComp = () => {
  return useQuery('account-allocation', () => {
    return requestManager.get('/api/Company/GetAlldt', {
      params: {
        OrgCompanyTypeId: userDetail?.OrganizationId,
      },
    });
  });
};

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
      onSuccess: () => {
        queryClient.invalidateQueries('item_allocation');
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

export const useGetDeAllocationItems = (enabled = true, Id: number, companyId?: number) => {
  return useQuery(
    ['item-unallocated', Id],
    () => {
      return requestManager.get('/api/COAAllocation/DeAllocateAccounts', {
        params: {
          CompanyId: companyId,
          ItemsIds: Id,
        },
      });
    },
    { enabled: !!Id }
  );
};
