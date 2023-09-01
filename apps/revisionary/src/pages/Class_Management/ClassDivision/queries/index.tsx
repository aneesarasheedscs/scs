import { requestManager } from '@revisionary/configs/requestManager';
import { useQuery } from 'react-query';

export const useGetClassSyllabus = () => useQuery('class-syllabus', getClassSyllabus);

// Class syllabus services
const getClassSyllabus = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/ClassSyllabus/GetSubjectListBySyllabusAuthorityIdandClassId', {
    params: {
      SyllabusAuthorityId: 1,
      ClassId: 2,
      OrganizationId: appUser?.organizationId,
      InstituteId: appUser?.instituteId,
      CampusId: appUser?.campusId,
    },
  });
};
