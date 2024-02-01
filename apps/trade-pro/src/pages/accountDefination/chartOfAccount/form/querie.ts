import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TChartAccountData } from '../types';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
console.log(financialYear?.Id);
export const useParentAccountLeaveService = (enabled = true, AccountCode: string | null) => {
  return useQuery(
    ['ChartAccount-Leave-Service', AccountCode],
    () => {
      return requestManager.get('/api/ChartofAccount/GenerateCodebyParentAccountCode', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          AccountCode,
          SerachDetailAccount: true,
          SerachGroupAccount: true,
        },
      });
    },
    { enabled: !!AccountCode }
  );
};
export const useGetReadAllLevelLeaveService = (enabled = true) => {
  return useQuery(
    'AllLevel-Leave-Service',
    () => {
      return requestManager.get('/api/ChartofAccount/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          LanguageId: 2,
        },
      });
    },
    { enabled }
  );
};

export const useChartofAccountSave = (params?: TChartAccountData) => {
  return useMutation(
    'ChartofAccount-Save',
    (data: TChartAccountData) => {
      return requestManager.post('/api/ChartofAccount/Save', {
        ...data,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchId: userDetail?.BranchesId,
        IsActive: true,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date(),
        ModifyDate: new Date(),
        PostDate: new Date(),
        ActionId: 1,
        COAAllocationList: [],
        ChartofAccountsList: [],
        ...params,
      });
    },
    {
      onSuccess: (response: AxiosResponse) => {
        queryClient.invalidateQueries('Chart-of-Account-HistoryTable');
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record added successfully!';
          notification.success({ description: '', message: msg });
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
