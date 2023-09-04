import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';

export const usegetAccountLevels = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('AccountLevelsOfChart', () => {
    return requestManager.get('/api/ChartofAccount/GetByOrganizationCompanyId', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        LanguageId: 2,
      },
    });
  });
};
