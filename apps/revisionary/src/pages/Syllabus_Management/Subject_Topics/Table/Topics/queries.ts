import { isNumber } from 'lodash';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from '../../types/subjectList';
import { TClassDivisionFormDataOnAdd, TClassDivisionFormDataOnUpdate } from '../../types/classDivision';
import { TTopicFormDataOnAdd, TTopicFormDataOnUpdate } from '../../types/topics';
import { queryClient } from '@revisionary/queryClient';
import requestManager from '@revisionary/configs/requestManager1';
import { TAppUserData } from '@revisionary/pages/Syllabus_Management/types';

// services
export const useGetSubjectList = () => useQuery('subject-list', getSubjectLists);

const getSubjectLists = () => {
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post('/SubjectList/GetBySearch', {
    organizationId: 1,
    instituteId: 1,
    campusId: 1,
    // classSubDivisionId: 0,
    loginId: userDetail?.loginId,
    loginAppClientId: userDetail?.loginAppClientId,
    loginAppClientLocationId: userDetail?.loginAppClientLocationId,
    loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
    loginAppUserId: userDetail?.loginAppUserId,
    loginAppUserLogId: userDetail?.loginAppUserLogId,
    loginAppClientProductId: userDetail?.loginAppClientProductId,
    // syllabusAuthorityId: 0,
    // subjectCategoryId: 0,
    // classId: 0,
    isActive: true,
    activeAll: 'string',
  });
};

export const useGetSubjectListById = (SubjectListId?: number | null) => {
  return useQuery(
    ['subject', SubjectListId],
    () => {
      return getSubjectListById(SubjectListId);
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
const getSubjectListById = (SubjectListId?: number | null) => {
  return requestManager.get('/SubjectList/GetById', { params: { SubjectListId } });
};

export const useAddUpdateSubjectList = (subjectListId?: number | null) => {
  return useMutation(
    (data: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate) => {
      return addUpdateSubjectList(data, subjectListId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subject-list');
        const msg = subjectListId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

// services

const addUpdateSubjectList = (
  data: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate,
  subjectListId?: number | null
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(subjectListId)) {
    dataToSubmit = {
      campusId: appUser?.campusId,
      subjectListId: subjectListId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subjectListId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post('/SubjectList/Save', dataToSubmit);
};

//       Class Division
export const useGetClassDivisions = () => useQuery('class-divisions', getClassDivision);
const getClassDivision = () => {
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post(
    `/ClassSubDivision/GetBySearch?LoginId="${userDetail?.loginId}"&LoginAppClientConnectionId=
  ${userDetail?.loginAppClientConnectionId}&CampusId=1&InstituteId=1&OrganizationId=1`,
    {
      CampusId: 1,
      InstituteId: 1,
      OrganizationId: 1,
      LoginId: userDetail?.loginId,
      LoginAppClientId: userDetail?.loginAppClientId,
      LoginAppClientLocationId: userDetail?.loginAppClientLocationId,
      LoginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      LoginAppUserId: userDetail?.loginAppUserId,
      LoginAppUserLogId: userDetail?.loginAppUserLogId,
      LoginAppClientProductId: userDetail?.loginAppClientProductId,
    }
  );
};
export const useGetClassDivisionById = (ClassSubDivisionId?: number) => {
  return useQuery(
    ['class-division', ClassSubDivisionId],
    () => {
      return getClassDivisionId(ClassSubDivisionId);
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
const getClassDivisionId = (ClassSubDivisionId?: number) => {
  return requestManager.get('/ClassSubDivision/GetById', { params: { ClassSubDivisionId } });
};

export const useAddUpdateClassDivision = (classSubDivisionId?: number) => {
  return useMutation(
    (data: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate) => {
      return addUpdateClassDivision(data, classSubDivisionId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('class-divisions');
        const msg = classSubDivisionId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

//      services

const addUpdateClassDivision = (
  data: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate,
  classSubDivisionId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(classSubDivisionId)) {
    dataToSubmit = {
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      classSubDivisionId: classSubDivisionId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      classSubDivisionId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post('/ClassSubDivision/Save', dataToSubmit);
};

//    UnitTopics   services
export const useGetTopics = () => useQuery('topics', getTopics);

const getTopics = () => {
  const userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post(
    `/UnitTopic/GetBySearch?LoginId="${userDetail?.loginId}"&LoginAppClientConnectionId=
    ${userDetail?.loginAppClientConnectionId}&CampusId=1&InstituteId=1&OrganizationId=1`,
    {
      CampusId: 1,
      InstituteId: 1,
      OrganizationId: 1,
      LoginId: userDetail?.loginId,
      LoginAppClientId: userDetail?.loginAppClientId,
      LoginAppClientLocationId: userDetail?.loginAppClientLocationId,
      LoginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      LoginAppUserId: userDetail?.loginAppUserId,
      LoginAppUserLogId: userDetail?.loginAppUserLogId,
      LoginAppClientProductId: userDetail?.loginAppClientProductId,
      // ...params,
    }
  );
};
export const useGetTopicById = (UnitTopicId?: number) => {
  return useQuery(
    ['topic-getById', UnitTopicId],
    () => {
      return getTopicById(UnitTopicId);
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
const getTopicById = (unitTopicId?: number | null) => {
  const userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post('/UnitTopic/GetById', {
    unitTopicId,
    organizationId: 1,
    instituteId: 1,
    campusId: 1,
    // classSubDivisionId: 0,
    loginId: userDetail?.loginId,
    loginAppClientId: userDetail?.loginAppClientId,
    loginAppClientLocationId: userDetail?.loginAppClientLocationId,
    loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
    loginAppUserId: userDetail?.loginAppUserId,
    loginAppUserLogId: userDetail?.loginAppUserLogId,
    loginAppClientProductId: userDetail?.loginAppClientProductId,
  });
};
export const useAddUpdateTopic = (unitTopicId?: number) => {
  return useMutation(
    (data: TTopicFormDataOnAdd | TTopicFormDataOnUpdate) => {
      return addUpdateTopic(data, unitTopicId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('topics');
        const msg = unitTopicId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const addUpdateTopic = (data: TTopicFormDataOnAdd | TTopicFormDataOnUpdate, unitTopicId?: number) => {
  const userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');

  let dataToSubmit = {};

  if (isNumber(unitTopicId)) {
    dataToSubmit = {
      ...data,
      unitTopicId: unitTopicId,
      campusId: 1,
      instituteId: 1,
      appUserLogId: userDetail?.appUserLogId,
      organizationId: 1,
      lastModifiedUserId: userDetail?.lastModifiedUserId,
      loginId: userDetail?.loginId,
      loginAppClientId: userDetail?.loginAppClientId,
      loginAppClientLocationId: userDetail?.loginAppClientLocationId,
      loginAppClientProductId: userDetail?.loginAppClientProductId,
      loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      loginAppUserId: userDetail?.loginAppUserId,
      loginAppUserLogId: userDetail?.loginAppUserLogId,
      rowVersion: userDetail?.rowVersion,
      createdUserId: userDetail?.createdUserId,
    };
  } else {
    dataToSubmit = {
      ...data,
      unitTopicId: 0,
      campusId: 1,
      instituteId: 1,
      appUserLogId: userDetail?.appUserLogId,
      organizationId: 1,
      lastModifiedUserId: userDetail?.lastModifiedUserId,
      loginId: userDetail?.loginId,
      loginAppClientId: userDetail?.loginAppClientId,
      loginAppClientLocationId: userDetail?.loginAppClientLocationId,
      loginAppClientProductId: userDetail?.loginAppClientProductId,
      loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      loginAppUserId: userDetail?.loginAppUserId,
      loginAppUserLogId: userDetail?.loginAppUserLogId,
      rowVersion: userDetail?.rowVersion,
      createdUserId: userDetail?.createdUserId,
    };
  }

  return requestManager.post('/UnitTopic/Save', dataToSubmit);
};
