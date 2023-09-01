import { requestManager } from '@revisionary/configs/requestManager';
import { useQuery } from 'react-query';

export const useGetStudentProfile = () => useQuery('studentprofile', getStudentProfile);
// Class services
const getStudentProfile = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/StudentProfile/GetBySearch', {
    params: {
      ClassId: appUser?.classId,
      ExaminationBoardId: appUser?.examinationboardId,
      ClassSubDivisionId: appUser?.classsubdivisionId,
      StudentProfileId: appUser?.studentprfileId,
      UserLoginId: appUser?.userloginId,
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

// export const useGetSubjectListById = (SubjectListId?: number | null) => {
//   return useQuery(
//     ['subject2', SubjectListId],
//     () => {
//       return getSubjectListById(SubjectListId);
//     },
//     {
//       cacheTime: 0,
//       staleTime: 0,
//       enabled: false,
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };

// services
// export const useGetSubjectLists = () => useQuery('subject-list', getSubjectList);
const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

export const useGetSubjectListSelect = () => {
  return useQuery('subject-listssss', () => {
    return requestManager.get('/SubjectList/GetBySearch', {
      params: {
        CampusId: appUser?.campusId,
        InstituteId: appUser?.instituteId,
        OrganizationId: appUser?.organizationId,
      },
    });
  });
};
// const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

// export const useGetStudentProfile = () =>{
// return useQuery('studentprofile',()=> { return requestManager.get('/StudentProfile/GetBySearch',{params:{
//     ClassId: appUser?.classId,
//     ExaminationBoardId: appUser?.examinationboardId,
//     ClassSubDivisionId: appUser?.classsubdivisionId,
//     StudentProfileId: appUser?.studentprfileId,
//     UserLoginId: appUser?.userloginId,
//     CampusId: appUser?.campusId,
//     InstituteId: appUser?.instituteId,
//     OrganizationId: appUser?.organizationId,
//    }
