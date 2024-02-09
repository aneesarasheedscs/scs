import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TrialBalanceAllLevelSearchCriteria,  } from './type';

const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();

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


export const useGetTrialAllLevelReport = ( enabled=true, params?:TrialBalanceAllLevelSearchCriteria,) => {
  return useQuery(
    'tiral-all-level',
    () => {
      return requestManager.get('/api/AccountsReports/HararicalTrialBalance', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          AccountLevel: 2,
          FromDate:FinancialYear?.Start_Period,
          ToDate:FinancialYear?.End_Period,
          ...params
        },
      });
    },
    {enabled}
  );
};