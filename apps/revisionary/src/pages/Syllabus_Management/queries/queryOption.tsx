import { useMutation, useQuery } from 'react-query';
import requestManager from '@revisionary/configs/requestManager';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import {
  TSubjectCategoryFormDataOnAdd,
  TSubjectCategoryFormDataOnUpdate,
  TAppUserData,
  TSyllabusAuthorityFormDataOnAdd,
  TSyllabusAuthorityFormDataOnUpdate,
  TSubjectListFormDataOnAdd,
  TSubjectListFormDataOnUpdate,
} from './types';
import { queryClient } from '@scs/configs';
import { isNumber } from 'lodash';

export const useSyllabusAuthorityForList = () => () => useQuery('list', getSyllabusAuthority);

const getSyllabusAuthority = () => requestManager.get('/SyllabusAuthority/GetBySearch');

// export const useSubjectCategory = () => useQuery('cards2', getSubjectCategory);

// const getSubjectCategory = () => requestManager.get('/SubjectCategory/GetBySearch');

export const useGetSubjectCategories = () => useQuery('cards2', getSubjectCategory);
const getSubjectCategory = () => requestManager.get('/SubjectCategory/GetBySearch');

export const useGetSubjectCategoryById = (SubjectCategoryId?: number) => {
  return useQuery(
    ['subject-category', SubjectCategoryId],
    () => {
      return getSubjectCategoryById(SubjectCategoryId);
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

const getSubjectCategoryById = (SubjectCategoryId?: number) => {
  return requestManager.get('/SubjectCategory/GetById', { params: { SubjectCategoryId } });
};

export const useAddUpdateSubjectCategory = (subjectCategoryId?: number) => {
  return useMutation(
    (data: TSubjectCategoryFormDataOnAdd | TSubjectCategoryFormDataOnUpdate) => {
      return addUpdateSubjectCategory(data, subjectCategoryId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subject-categories');
        const msg = subjectCategoryId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const addUpdateSubjectCategory = (
  data: TSubjectCategoryFormDataOnAdd | TSubjectCategoryFormDataOnUpdate,
  subjectCategoryId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(subjectCategoryId)) {
    dataToSubmit = {
      appUserLogId: appUser?.appUserLogId,
      subjectCategoryId: subjectCategoryId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subjectCategoryId: 0,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      ...data,
    };
  }

  return requestManager.post('/SubjectCategory/Save', dataToSubmit);
};

export const useGetSyllabusAuthorityById = (SyllabusAuthorityId?: number) => {
  return useQuery(
    ['syllabus-authority', SyllabusAuthorityId],
    () => {
      return getSyllabusAuthorityById(SyllabusAuthorityId);
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
export const useAddUpdateSyllabusAuthority = (syllabusAuthorityId?: number) => {
  return useMutation(
    (data: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate) => {
      return addUpdateSyllabusAuthority(data, syllabusAuthorityId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('syllabus-authorities');
        const msg = syllabusAuthorityId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
// const getSyllabusAuthority = () => requestManager.get("/SyllabusAuthority/GetBySearch");

const getSyllabusAuthorityById = (SyllabusAuthorityId?: number) => {
  return requestManager.get('/SyllabusAuthority/GetById', { params: { SyllabusAuthorityId } });
};

const addUpdateSyllabusAuthority = (
  data: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate,
  syllabusAuthorityId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(syllabusAuthorityId)) {
    dataToSubmit = {
      appUserLogId: appUser?.appUserLogId,
      syllabusAuthorityId: syllabusAuthorityId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      syllabusAuthorityId: 0,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      ...data,
    };
  }

  return requestManager.post('/SyllabusAuthority/Save', dataToSubmit);
};

// Table(Student List)
export const useGetSubjectLists = () => () => useQuery('subject-lists', getSubjectList);

export const useGetSubjectListById = (SubjectListId?: number | null) => () => {
  return useQuery(
    ['subject2', SubjectListId],
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

//subject list
export const useGetSubjectLists2 = () => useQuery('subject-list2', getSubjectList2);
// services
const getSubjectList2 = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/SubjectList/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};
