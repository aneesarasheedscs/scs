import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

export const useGetParentAccount = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('Chart-of-Account-Parent', () => {
    return requestManager.get('/api/ChartofAccount/GetByOrganizationCompanyId', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        LanguageId: 2,
      },
    });
  });
};
