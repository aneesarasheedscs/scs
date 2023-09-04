import { requestManager } from '@revisionary/configs/requestManager';
import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { useMutation, useQuery } from 'react-query';

export const useGetStudentProfile = () => useQuery('studentprofile', getStudentProfile);

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

const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

export const useGetClass = () => {
  return useQuery('classes_select', () => {
    return requestManager.get('/Class/GetBySearch', {
      params: {
        CampusId: appUser?.campusId,
        InstituteId: appUser?.instituteId,
        OrganizationId: appUser?.organizationId,
      },
    });
  });
};

export const useGetProfileById = (StudentProfileId?: number | null) => {
  return useQuery(
    ['getProfileById', StudentProfileId],
    () => {
      return getProfileById(StudentProfileId);
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

const getProfileById = (StudentProfileId?: number | null) => {
  return requestManager.get('/StudentProfile/GetById?StudentProfileId', { params: { Id: StudentProfileId } });
};

export const useSaveProfile = (StudentProfileId?: number | null) => {
  return useMutation(
    (data: any) => {
      console.log(data);
      return saveProfile(data, StudentProfileId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('save-profile');
        const msg = StudentProfileId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveProfile = (data: any, StudentProfileId?: number | null) => {
  let dataToSubmit = {
    studentProfileId: 0, // Set the default value for studentProfileId
    appUserLogId: 0, // Set the default value for appUserLogId
    lastModifiedUserId: 0, // Set the default value for lastModifiedUserId
    createdUserId: 0, // Set the default value for createdUserId
    ...data,
  };

  if (isNumber(StudentProfileId)) {
    // Update values if StudentProfileId is available
    dataToSubmit.studentProfileId = StudentProfileId;
    dataToSubmit.appUserLogId = appUser?.appUserLogId || 0;
    dataToSubmit.lastModifiedUserId = appUser?.lastModifiedUserId || 0;
  }

  return requestManager.post('/StudentProfile/Save', dataToSubmit);
};
