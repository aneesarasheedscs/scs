import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSalesDataSearchCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };

export const useGetDateTypes = () => {
  return useQuery(
    'DateTypes',
    () => {
      return requestManager.get('api/CommonServices/DateType', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetWeightType = () => {
  return useQuery(
    'Weight-Type',
    () => {
      return requestManager.get('/api/CommonController/StaticColumnNames', {
        params: {
          // OrganizationId: userDetail?.OrganizationId,
          // CompanyId: userDetail?.CompanyId,
          Activity: 'ComboServiceForWeightType',
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetValueType = () => {
  return useQuery(
    'Value-Type',
    () => {
      return requestManager.get('/api/CommonController/StaticColumnNames', {
        params: {
          // OrganizationId: userDetail?.OrganizationId,
          // CompanyId: userDetail?.CompanyId,
          Activity: 'ComboServiceForValueType',
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetSalesDataBranchWise = (enabled = true, params?: TSalesDataSearchCriteria) => {
  return useQuery(
    'sales_data_branch_wise',
    () => {
      return requestManager.post('/api/Dashboard/GetSalesDataBranchWise', {
        OrganizationId: userDetail?.OrganizationId,
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        PaymenetTermId:
          params?.CashSale === true && params?.CreditSale === false
            ? 1
            : params?.CreditSale === true && params?.CashSale === false
            ? 2
            : params?.CashSale === true && params?.CreditSale === true
            ? 0
            : undefined, // Cash

        ...params,
      });
    },
    { enabled }
  );
};
