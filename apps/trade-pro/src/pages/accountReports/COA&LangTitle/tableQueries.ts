import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedUserDetail } from '@tradePro/utils/storageService';
import { TChartOfAccountCriteria } from './type';
const userDetail = storedUserDetail();

export const useChartOfReporttableQuery = (enabled = true, params?: TChartOfAccountCriteria) => {
  return useQuery(
    'coa-tableQ',
    () => {
      return requestManager.get('api/ChartofAccount/AllChartofAccountForOtherLingo', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          IsApproved: true,
        },
      });
    },
    { enabled }
  );
};
