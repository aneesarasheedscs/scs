import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

//Parent  Category
export const usegetItemNameUOMSchedule = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'Item-Uom-Schedule',
    () => {
      return requestManager.get('/api/Item/ItemsWithPackingAndStore', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
