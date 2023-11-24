import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { queryClient } from '@tradePro/configs/index';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TDefineItemDataOnSave } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Item getbyId
export const useGetItemById = (Id?: number | null) => {
  return useQuery(
    ['Pos-Item', Id],
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
export const useSaveItemCategory = () => {
  return useMutation(
    (data: TDefineItemDataOnSave) => {
      console.log(data);
      return saveItemCategory(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Pos-Item');
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

const saveItemCategory = (data: TDefineItemDataOnSave) => {
  let dataToSubmit = {};

  dataToSubmit = {
    ...data,
    Id: 0,
    OrganizationId: userDetail?.OrganizationId,
    CompanyId: userDetail?.CompanyId,
    BranchesId: userDetail?.BranchesId,
    EntryDate: new Date().toISOString(),
    EntryUser: userDetail?.UserId,
    PostDate: '2023-05-23T13:07:28.953',
    PostUser: 0,
    ModifyDate: new Date().toISOString(),
    ModifyUser: userDetail?.UserName,
    PackQty: 40,
    ReorderLevel: 1,
    MaxStockLevel: 1,
    MinStockLevel: 1,
    ItemAllocationlist: [
      {
        IsActive: true,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    ],
    AttachmentsList: null,
  };
  return requestManager.post('/api/Item/Save', dataToSubmit);
};
export const useUpdateItemCategory = (Id?: number) => {
  return useMutation(
    (data: TDefineItemDataOnSave) => {
      return updatedItemCategory(data, Id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Pos-Item');
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
const updatedItemCategory = (data: TDefineItemDataOnSave, Id?: number | null) => {
  let dataToSubmit = {};
  dataToSubmit = {
    ...data,
    Id: Id,
    OrganizationId: userDetail?.OrganizationId,
    CompanyId: userDetail?.CompanyId,
    BranchesId: userDetail?.BranchesId,
    EntryDate: new Date().toISOString(),
    EntryUser: userDetail?.UserId,
    PostDate: '2023-05-23T13:07:28.953',
    PostUser: 0,
    ModifyDate: new Date().toISOString(),
    ModifyUser: userDetail?.UserName,
    PackQty: 40,
    ReorderLevel: 1,
    MaxStockLevel: 1,
    MinStockLevel: 1,
    ItemAllocationlist: [
      {
        IsActive: true,
        BranchesId: userDetail?.BranchesId,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      },
    ],
    AttachmentsList: null,
  };

  return requestManager.post('/api/Item/Save', dataToSubmit);
};
