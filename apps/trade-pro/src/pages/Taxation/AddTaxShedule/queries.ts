import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TPurchaseOrderEntry, TAddTaxSheduleHistory } from './type';
// const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
// const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
import { notification } from 'antd';
import { AxiosError } from 'axios';
const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetAddTaxSheduleHistory = (enabled = true, params?: TAddTaxSheduleHistory) => {
  return useQuery(
    'txshedule-history',
    () => {
      return requestManager.get('/api/TaxScheduleMain/GetByOrganizationNCompanyId', {
        params: {
          CompanyId: userDetail?.CompanyId,
          OrganizationId: userDetail?.OrganizationId,
        },
      });
    },
    { enabled }
  );
};
// Add tax shedule save
export const useAddTaxSheduleSave = (RecId: number, params?: TAddTaxSheduleHistory) => {
  return useMutation(
    'tax-shedule-save',
    (data: TAddTaxSheduleHistory | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: RecId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        EntryDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        ...params,
      };

      console.log('tax shedule save : ', dataToSubmit);
      // console.log('Data being passed to the mutation: TaxName', TaxName, 'PostState', PostState);
      return requestManager.post('/api/TaxScheduleMain/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-tax-shedule');
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

// update query
export const useUpdateAddTaxShedule = (
  Id?: number | null,
  selectedRecordId?: number,
  params?: TAddTaxSheduleHistory
) => {
  return useMutation(
    'tax-shedule-save',
    (data: TAddTaxSheduleHistory | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        selectedRecordId: selectedRecordId,
        EntryDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        ...params,
      };

      console.log('tax shedule update : ', dataToSubmit);
      // console.log('Data being passed to the mutation: TaxName', TaxName, 'PostState', PostState);
      return requestManager.post('/api/TaxScheduleMain/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-tax-shedule');
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
