import { isNumber } from 'lodash';
import { queryClient } from '@tradePro/configs/index';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { TDefineWareHouseOnAdd } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

export const useSaveWareHouseType = (Id?: number | null) => {
  return useMutation(
    (data: TDefineWareHouseOnAdd) => {
      console.log(data);
      return saveWareHouseType(data, Id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouse-history');
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

const saveWareHouseType = (data?: TDefineWareHouseOnAdd, Id?: number | null, params?: TDefineWareHouseOnAdd) => {
  let dataToSubmit = {};
  if (isNumber(Id)) {
    dataToSubmit = {
      ...data,
      Id: Id,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      EntryUser: 2,
      IsActive: true,
      EntryDate: '2023-09-04T13:17:00',
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      Id: 0,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      EntryUser: 2,
      IsActive: true,
      EntryDate: '2023-09-04T13:17:00',
      ...params,
    };
  }
  return requestManager.post('/api/InvWareHouse/Save', dataToSubmit);
};
