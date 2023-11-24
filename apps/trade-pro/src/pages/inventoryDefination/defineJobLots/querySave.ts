import { isNumber } from 'lodash';
import { queryClient } from '@tradePro/configs/index';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { TDefineJobLotOnAdd } from './types';

// save form

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

export const useSaveJobLotsType = (Id?: number | null) => {
  return useMutation(
    (data: TDefineJobLotOnAdd) => {
      console.log(data);
      return saveJobLotsType(data, Id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('joblots-history');
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

const saveJobLotsType = (data?: TDefineJobLotOnAdd, Id?: number | null, params?: TDefineJobLotOnAdd) => {
  let dataToSubmit = {};
  if (isNumber(Id)) {
    dataToSubmit = {
      ...data,
      Id: Id,
      IsApproved: false,
      PostState: false,
      EntryDate: '2024-09-04T00:00:00',
      EntryUser: 2,
      ModifyDate: '2024-09-04T00:00:00',
      ModifyUser: 2,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      JobTypeId: 20, // Purchase
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      Id: 0,
      IsApproved: false,
      PostState: false,
      EntryDate: '2024-09-04T00:00:00',
      EntryUser: 2,
      ModifyDate: '2024-09-04T00:00:00',
      ModifyUser: 2,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      JobTypeId: 20, // Purchase
      ...params,
    };
  }
  return requestManager.post('/api/JobLot/Save', dataToSubmit);
};
