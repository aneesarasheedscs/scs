import { requestManager } from '@scs/configs';
import { useQuery } from 'react-query';

// export const useGetStudentProfile = () => useQuery('studentprofile', getStudentProfile);
// // Class services
// const getStudentProfile = () => {
//   const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

//   return requestManager.get('/StudentProfile/GetBySearch', {
//     params: {
//       CampusId: appUser?.campusId,
//       InstituteId: appUser?.instituteId,
//       OrganizationId: appUser?.organizationId,
//     },
//   });
// };
