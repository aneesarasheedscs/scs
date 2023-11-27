import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TItemTaxShedule } from './type';
import { notification } from 'antd';
import { AxiosError } from 'axios';

const userDetail = storedUserDetail();

//history query
export const useGetItemTaxSheduleHistory = (enabled = true, params?: TItemTaxShedule) => {
  return useQuery(
    'Item-tax-shedule-history',
    () => {
      return requestManager.get('/api/ItemTaxSchedule/GetByOrganizationCompanyId', {
        params: {
          CompanyId: userDetail?.CompanyId,
          OrganizationId: userDetail?.OrganizationId,
        },
      });
    },
    { enabled }
  );
};

// save query
export const useItemTaxSheduleSave = (RecId: number, params?: TItemTaxShedule) => {
  return useMutation(
    'Itam-tax-shedule-save',
    (data: TItemTaxShedule | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      const { IsActive } = data;
      dataToSubmit = {
        ...data,
        Id: RecId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        IsActive: IsActive,
        ...params,
      };

      console.log('Item Tax shedule save : ', dataToSubmit);
      console.log('Data being passed to the mutation for save: IsActive', IsActive);
      return requestManager.post('/api/ItemTaxSchedule/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-tax-shedule-save');
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
// update save query API
export const useUpdateItemTaxShedule = (Id?: number | null, selectedRecordId?: number, params?: TItemTaxShedule) => {
  return useMutation(
    'Itam-tax-shedule-save',
    (data: TItemTaxShedule | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      const { IsActive } = data;
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        selectedRecordId: selectedRecordId,
        EntryDate: new Date().toISOString(),
        IsActive: IsActive,
        ...params,
      };

      console.log('Item Tax shedule update : ', dataToSubmit);
      console.log('Data being passed to the mutation for update: IsActive', IsActive);
      return requestManager.post('/api/ItemTaxSchedule/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Item-tax-shedule-save');
        const msg = 'Record Updated successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
