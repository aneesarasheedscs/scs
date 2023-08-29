import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

//ItemSchedule UOM History
export const useGetItemScheduleUOMHistory = (enabled = true, params?: TItemScheduleUOMHistory) => {
  return useQuery(
    'Item-Schedule-UOM-History',
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
    ['UOM_ScheduleById', Id],
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
