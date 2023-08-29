import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { queryClient } from '@tradePro/configs/index';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Item getbyId
export const useGetItemTypeById = (Id?: number | null) => {
  return useQuery(
    ['Item-Type-ById', Id],
    () => {
      return getItemTypeById(Id);
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
const getItemTypeById = (Id?: number | null) => {
  return requestManager.get('/api/ItemType/GetByID', { params: { Id } });
};
//Form Save api
export const useSaveItemType = (Id?: number | null) => {
  return useMutation(
    (data: TItemTypeData | TItemTypeDataonUpdate) => {
      console.log(data);
      return saveItemType(data, Id);
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

const saveItemType = (data: TItemTypeData | TItemTypeDataonUpdate, Id?: number | null) => {
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
  return requestManager.post('/api/ItemType/GetByID', dataToSubmit);
};
