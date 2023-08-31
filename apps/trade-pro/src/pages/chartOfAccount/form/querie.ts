import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

export const useParentAccountLeaveService = () => {
  return useQuery('ChartAccount-Leave-Service', () => {
    return requestManager.get('/api/ChartofAccount/GenerateCodebyParentAccountCode', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        LanguageId: 2,
        FinancialYearId: financialYear?.Id,
        AccountCode: 400302,
      },
    });
  });
};
