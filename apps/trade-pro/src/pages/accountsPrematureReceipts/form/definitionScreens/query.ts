import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TBankName, TDefineOtherParties } from './types';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { queryClient } from '@tradePro/configs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetBankNameHistory = (enabled = true) => {
  return useQuery(
    'bank_name_history',
    () => {
      return requestManager.post('/api/PdcBankName/GetByOrganizationCompanyId', {
        ...params,
      });
    },
    { enabled }
  );
};

export const useGetDefineOtherPartiesHistory = (DocumentTypeId?: number) => {
  return useQuery(
    'define_other_parties_history',
    () => {
      return requestManager.get('/api/DefineOtherParties/FormHistory', {
        params: {
          ...params,
          DocumentTypeId: DocumentTypeId,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
export const useAddBankName = () => {
  return useMutation(
    'bank_name_add',
    (data: TBankName) => {
      return requestManager.post('/api/PdcBankName/Save', {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bank_name_history');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};

export const useUpdateBankName = (selectedRecordId: number | null) => {
  return useMutation(
    'bank_name_update',
    (data: TBankName) => {
      return requestManager.post('/api/PdcBankName/Save', {
        ...data,
        Id: selectedRecordId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bank_name_history');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
export const useAddDefineOtherParties = (DocumentTypeId?: number) => {
  return useMutation(
    'define_other_parties_add',
    (data: TDefineOtherParties) => {
      return requestManager.post('/api/DefineOtherParties/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('define_other_parties_history');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
export const useUpdateDefineOtherParties = (DocumentTypeId: number, selectedRecordId: number | null) => {
  return useMutation(
    'define_other_parties_update',
    (data: TDefineOtherParties) => {
      return requestManager.post('/api/DefineOtherParties/Save', {
        ...data,
        Id: selectedRecordId,
        DocumentTypeId: DocumentTypeId,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('define_other_parties_history');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
//Get ById
export const useGetDefineOtherPartiesById = (Id?: number | null) => {
  return useQuery(
    ['define-other-parties-getById', Id],
    () => {
      return getDefineOtherPartiesById(Id);
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
const getDefineOtherPartiesById = (Id?: number | null) => {
  return requestManager.get('/api/DefineOtherParties/GetByID', { params: { Id } });
};
export const useGetBankNameById = (Id?: number | null) => {
  return useQuery(
    ['bank-name-getById', Id],
    () => {
      return getBankNameById(Id);
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
const getBankNameById = (Id?: number | null) => {
  return requestManager.get('/api/PdcBankName/GetByID', { params: { Id } });
};
