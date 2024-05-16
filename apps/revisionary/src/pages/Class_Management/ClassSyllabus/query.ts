import { useQuery, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import requestManager from '@revisionary/configs/requestManager';
import { notification } from 'antd';
import { queryClient } from '@revisionary/queryClient';
import { isNumber } from 'lodash';
import { TAppUserData } from '@revisionary/pages/Syllabus_Management/types';
// Class syllabus services
export const useGetClassSyllabus = () => useQuery('class-syllabus', getClassSyllabuses);

const getClassSyllabuses = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post(
    `/ClassSyllabus/GetBySearch?OrganizationId=1&InstituteId=1&CampusId=1&LoginId="${userDetail?.loginId}"&LoginAppClientConnectionId=${userDetail?.loginAppClientConnectionId}`,
    {
      LoginId: userDetail?.loginId,
      LoginAppClientId: userDetail?.loginAppClientId,
      LoginAppClientLocationId: userDetail?.loginAppClientLocationId,
      LoginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      LoginAppUserId: userDetail?.loginAppUserId,
      LoginAppUserLogId: userDetail?.loginAppUserLogId,
      LoginAppClientProductId: userDetail?.loginAppClientProductId,
      CampusId: 1,
      OrganizationId: 1,
      InstitueId: 1,
    }
  );
};

export const useGetSyllabusById = () => useQuery('class-syllabus', getClassSyllabus);
const getClassSyllabus = () => requestManager.get('/ClassSyllabus/GetBySearch');
// ByID

export const useGetClassSyllabusById = (ClassSyllabusId?: number) => {
  return useQuery(
    ['class-syllabus', ClassSyllabusId],
    () => {
      return getClassSyllabusById(ClassSyllabusId);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getClassSyllabusById = (ClassSyllabusId?: number) => {
  return requestManager.get('/ClassSyllabus/GetById', { params: { ClassSyllabusId } });
};
export const useSaveClassSyllabus = (ClassSyllabusId?: number | null, params?: TClassSyllabus) => {
  return useMutation(
    (data: TClassSyllabus) => {
      console.log(data);
      return saveClassSyllabus(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('save-classSyllabus');
        const msg = ClassSyllabusId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const saveClassSyllabus = (
  data?: TClassSyllabus,
  classSyllabusId?: number | null,
  params?: TClassSyllabus | undefined
) => {
  let dataToSubmit = {};
  if (isNumber(classSyllabusId)) {
    dataToSubmit = {
      ...data,
      classSyllabusId: classSyllabusId,
      syllabusAuthorityId: 0,
      classId: 0,
      subjectListId: 0,
      organizationId: 0,
      instituteId: 0,
      campusId: 0,
      effectiveFrom: '2023-09-08T05:49:19.836Z',
      createdOn: '2023-09-08T05:49:19.836Z',
      createdUserId: 0,
      lastModifiedOn: '2023-09-08T05:49:19.836Z',
      lastModifiedUserId: 0,
      rowVersion: 0,
      appActionId: 0,
      appUserLogId: 0,

      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      classSyllabusId: classSyllabusId,
      isActive: true,
      syllabusAuthorityId: 0,
      classId: 0,
      subjectListId: 0,
      organizationId: 0,
      instituteId: 0,
      campusId: 0,
      effectiveFrom: '2023-09-08T05:49:19.836Z',
      createdOn: '2023-09-08T05:49:19.836Z',
      createdUserId: 0,
      lastModifiedOn: '2023-09-08T05:49:19.836Z',
      lastModifiedUserId: 0,
      rowVersion: 0,
      appActionId: 0,
      appUserLogId: 0,

      ...params,
    };
  }
  return requestManager.post('/ClassSyllabus/SaveAll', dataToSubmit);
};
