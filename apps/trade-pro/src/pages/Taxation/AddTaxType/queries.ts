import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail, storedFinancialYear } from '@tradePro/utils/storageService';
import { TAddTaxTypeHistory } from './type';
// const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
// const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
import { notification } from 'antd';
import { AxiosError } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useGetAddTaxTypeHistory = (enabled = true, params?: TAddTaxTypeHistory) => {
  return useQuery(
    'txtype-history',
    () => {
      return requestManager.get('/api/TaxesTypes/GetByOrganizationCompanyId', {
        params: {
          CompanyId: userDetail?.CompanyId,
          OrganizationId: userDetail?.OrganizationId,
        },
      });
    },
    { enabled }
  );
};

// Tax type save API
// export const useAddTaxTypeSave = (params?: TAddTaxType) => {
//   return useMutation(
//     'tax-type-save',
//     (data: TAddTaxType) => {
//       return requestManager.post('/api/TaxesTypes/Save', {
//         ...data,
//         OrganizationId: userDetail?.OrganizationId,
//         CompanyId: userDetail?.CompanyId,
//         // IsActive: true,
//         EntryDate: new Date(),
//         ModifyDate: new Date(),

//         ...params,
//       });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('purchase-order');
//         const msg = 'Record added successfully!';
//         notification.success({ description: '', message: msg });
//       },
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };

// copieed code

export const useAddTaxTypeSave = (RecId: number, params?: TAddTaxTypeHistory) => {
  return useMutation(
    'tax-type-save',
    (data: TAddTaxTypeHistory | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      const { TaxName } = data; // Assuming 'CbSrFrom' and 'CbSrTo' correspond to form fields

      dataToSubmit = {
        ...data,
        Id: RecId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        DocDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        TaxDescription: TaxName,
        ...params,
      };
      console.log('tax type save ', dataToSubmit);
      return requestManager.post('/api/TaxesTypes/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-tax-type');
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
export const useUpdateAddTaxType = (Id?: number | null, selectedRecordId?: number, params?: TAddTaxTypeHistory) => {
  return useMutation(
    'tax-type-save',
    (data: TAddTaxTypeHistory | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      const { TaxName } = data; // Assuming 'CbSrFrom' and 'CbSrTo' correspond to form fields

      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: userDetail?.UserId,
        selectedRecordId: selectedRecordId,
        DocDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        TaxDescription: TaxName,
        ...params,
      };

      console.log('tax type update ', dataToSubmit);
      return requestManager.post('/api/TaxesTypes/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-tax-type');
        const msg = 'Record update successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
