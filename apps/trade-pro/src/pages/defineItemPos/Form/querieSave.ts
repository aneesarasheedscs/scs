import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TPurchaseOrderSearchCriteria } from '../type';
import { queryClient } from '@tradePro/configs/index';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { TDefineItemDataOnAdd, TDefineItemDataonUpdate } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Item getbyId
export const useGetItemById = (Id?: number | null) => {
  return useQuery(
    ['Item', Id],
    () => {
      return getItemById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getItemById = (Id?: number | null) => {
  return requestManager.get('/api/Item/GetByID', { params: { Id } });
};
//Form Save api
export const useSaveItemCategory = (Id?: number | null) => {
  return useMutation(
    (data: TDefineItemDataOnAdd | TDefineItemDataOnAdd) => {
      console.log(data);
      return saveItemCategory(data, Id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('save-item');
        const msg = Id ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveItemCategory = (data: TDefineItemDataOnAdd | TDefineItemDataOnAdd, Id?: number | null) => {
  let dataToSubmit = {};
  if (isNumber(Id)) {
    dataToSubmit = {
      organizationId: userDetail?.OrganizationId,
      id: Id,
      companyId: userDetail?.CompanyId,
      branchesId: userDetail?.BranchesId,
      ...data,
    };
  } else {
    dataToSubmit = {
      id: 0,
      companyId: userDetail?.CompanyId,
      branchesId: userDetail?.BranchesId,
      ...data,
    };
  }
  return requestManager.post('/api/Item/Save', dataToSubmit);
};
