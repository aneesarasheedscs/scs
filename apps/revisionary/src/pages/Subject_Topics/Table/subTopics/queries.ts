import { useMutation, useQuery } from 'react-query';
// import  requestManager  from "@revisionary/configs/requestManager";
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
// import { queryClient } from "@revisionary/configs/index";
import { TSubTopicFormDataOnAdd, TSubTopicFormDataOnUpdate } from '../../types/subTopics';
import { TAppUserData } from '@revisionary/pages/login';
import { requestManager } from '@revisionary/configs/requestManager';
import { queryClient } from '@revisionary/queryClient';

export const useGetSubTopics = () => useQuery('sub-topics', getSubTopics);

export const useGetTopicById = (SubTopicId?: number) => {
  return useQuery(
    ['sub-topic', SubTopicId],
    () => {
      return getSubTopicById(SubTopicId);
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

export const useAddUpdateSubTopic = (subTopicId?: number) => {
  return useMutation(
    (data: TSubTopicFormDataOnAdd | TSubTopicFormDataOnUpdate) => {
      return addUpdateSubTopic(data, subTopicId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sub-topics');
        const msg = subTopicId ? 'Record updated successfully!' : 'Record added successfully!';
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
const getSubTopics = () => {
  const appUser = JSON.parse(localStorage.getItem('app-user') || '{}');

  return requestManager.get('/SubTopic/GetBySearch', {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const getSubTopicById = (SubTopicId?: number) => {
  return requestManager.get('/SubTopic/GetById', { params: { SubTopicId } });
};

const addUpdateSubTopic = (data: TSubTopicFormDataOnAdd | TSubTopicFormDataOnUpdate, subTopicId?: number) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem('app-user') || '{}');

  let dataToSubmit = {};

  if (isNumber(subTopicId)) {
    dataToSubmit = {
      subTopicId: subTopicId,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subTopicId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post('/SubTopic/Save', dataToSubmit);
};
