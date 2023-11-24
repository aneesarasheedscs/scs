import { isNumber } from 'lodash';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from '@revisionary/configs/index';
import requestManager from '@revisionary/configs/requestManager';
import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from '../../types/subjectList';
import { TAppUserData } from '@revisionary/pages/login';
import { TClassDivisionFormDataOnAdd, TClassDivisionFormDataOnUpdate } from '../../types/classDivision';
import { TTopicFormDataOnAdd, TTopicFormDataOnUpdate } from '../../types/topics';

export const useGetSubjectLists = () => useQuery('subject-list', getSubjectList);

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
const getSubjectList = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/SubjectList/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const getSubjectListById = (SubjectListId?: number | null) => {
  return requestManager.get('/SubjectList/GetById', { params: { SubjectListId } });
};

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
const getClassDivisionId = (ClassSubDivisionId?: number) => {
  return requestManager.get('/ClassSubDivision/GetById', { params: { ClassSubDivisionId } });
};

const getClassDivision = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/ClassSubDivision/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

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
//        Subject Topic

export const useGetTopics = () => useQuery('topics', getTopics);

export const useGetTopicById = (UnitTopicId?: number) => {
  return useQuery(
    ['topic', UnitTopicId],
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

const getTopicById = (UnitTopicId?: number) => {
  return requestManager.get('/UnitTopic/GetById', { params: { UnitTopicId } });
};

const addUpdateTopic = (data: TTopicFormDataOnAdd | TTopicFormDataOnUpdate, unitTopicId?: number) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(unitTopicId)) {
    dataToSubmit = {
      unitTopicId: unitTopicId,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      unitTopicId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post('/UnitTopic/Save', dataToSubmit);
};
