import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TChartAccountData } from '../types';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useParentAccountLeaveService = (enabled = true, AccountCode: string | null) => {
  return useQuery(
    ['ChartAccount-Leave-Service', AccountCode],
    () => {
      return requestManager.get('/api/ChartofAccount/GenerateCodebyParentAccountCode', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          LanguageId: 2,
          FinancialYearId: financialYear?.Id,
          AccountCode,
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
      onSuccess: () => {
        queryClient.invalidateQueries('purchase-order');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
