// import { requestManager } from "@scs/configs";
import { requestManager } from '@revisionary/configs/requestManager';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  TClassDivisionFormDataOnAdd,
  TClassDivisionFormDataOnUpdate,
  TClassFormDataOnAdd,
  TClassFormDataOnUpdate,
} from './Types';
import { queryClient } from '@scs/configs';
import { TAppUserData } from '@revisionary/pages/login';
import { isNumber } from 'lodash';

export const useGetClasses = () => useQuery('classes', getClass);

// Class services
const getClass = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/Class/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

export const useGetClassDivisions = () => useQuery('class-divisions', getClassDivision);

//ClassDivision services
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
// Class
export const useGetClassById = (ClassId?: number) => {
  return useQuery(
    ['class', ClassId],
    () => {
      return getClassById(ClassId);
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
export const useAddUpdateClass = (classId?: number) => {
  return useMutation(
    (data: TClassFormDataOnAdd | TClassFormDataOnUpdate) => {
      return addUpdateClass(data, classId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classes');
        const msg = classId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getClassById = (ClassId?: number) => {
  return requestManager.get('/Class/GetById', { params: { ClassId } });
};

const addUpdateClass = (data: TClassFormDataOnAdd | TClassFormDataOnUpdate, classId?: number) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(classId)) {
    dataToSubmit = {
      classId: classId,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      classId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post('/Class/Save', dataToSubmit);
};
// ClassDivision
// export const useGetClassDivisions = () => useQuery('class-divisions', getClassDivision);

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
