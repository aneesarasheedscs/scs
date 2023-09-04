import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';

export const usegetAccountHistoryTable = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('Chart-of-Account-HistoryTable', () => {
    return requestManager.get('api/ChartofAccount/FormHistory', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
      },
    });
  });
};
