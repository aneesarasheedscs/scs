import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { isNumber } from 'lodash';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemSchedule UOM History
export const useGetItemScheduleUOMHistory = (enabled = true, params?: TItemScheduleUOMHistory) => {
  return useQuery(
    'Item-Schedule-UOM',
    () => {
      return requestManager.get('/api/UOMSchedule/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetUOMScheduleById = (Id?: number | null) => {
  return useQuery(
    ['Item-Schedule-UOM', Id],
    () => {
      return getUOMScheduleById(Id);
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
const getUOMScheduleById = (Id?: number | null) => {
  return requestManager.get('/api/UOMSchedule/GetByID', { params: { Id } });
};

export const useAddScheduleUOM = () => {
  return useMutation(
    'Item-Schedule-UOM',
    (data: TAddScheduleUOM | TAddScheduleUOMonUpdate) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        ModifyUser: userDetail?.UserName,
      };
      return requestManager.post('/api/UOMSchedule/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schdule uom');
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

export const useUpdateScheduleUOM = (Id?: number) => {
  return useMutation(
    'Item-Schedule-UOM',
    (data: TAddScheduleUOMonUpdate) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      dataToSubmit = {
        ...data,
        Id: Id,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        ModifyUser: userDetail?.UserName,
      };

      return requestManager.post('/api/UOMSchedule/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schdule uom');
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
export type TItemScheduleUOMHistory = {
  Id: number;

  ItemId: number;
  ScheduleUnitId: number;
  Equivalent: number;
  BaseRateUom: boolean;
  EntryDate: string;
  EntryUser: number;
  ModifyDate: string;
  ModifyUser: number;
  OrganizationId: number;
  CompanyId: number;
  UOMDescription: string;
  ItemName: string;
  UOMCode: string;
};

export type TAddScheduleUOM = {
  ItemId: number;
  ScheduleUnitId: number;
  Equivalent: number;
  BaseRateUom: boolean;
  Id: number;
  UOMDescription: string;
  ItemName: string;
  UOMCode: string;
};
export type TAddScheduleUOMonUpdate = {
  ItemId: number;
  ScheduleUnitId: number;
  Equivalent: number;
  BaseRateUom: boolean;
  Id: number;
  UOMDescription: string;
  ItemName: string;
  UOMCode: string;
};
