import requestManager from '@revisionary/configs/requestManager';
import { useQuery } from 'react-query';

export const useGetTopics = () => useQuery('topics', getTopics);
//       services
const getTopics = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');
  return requestManager.get('/UnitTopic/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};
