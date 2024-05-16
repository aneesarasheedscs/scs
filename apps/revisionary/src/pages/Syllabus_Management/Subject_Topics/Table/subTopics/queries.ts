import { useMutation, useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { TSubTopicFormDataOnAdd, TSubTopicFormDataOnUpdate } from '../../types/subTopics';
// import { TAppUserData } from '@revisionary/pages/login';
import { queryClient } from '@revisionary/queryClient';
import requestManager from '@revisionary/configs/requestManager1';
import { TAppUserData } from '@revisionary/pages/Syllabus_Management/types';

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
const getSubTopicById = (subTopicId?: number) => {
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post('/SubTopic/GetById', {
    subTopicId,
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

// services
export const useGetSubTopics = () => useQuery('sub-topics', getSubTopics);

const getSubTopics = () => {
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  return requestManager.post('/SubTopic/GetBySearch', {
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
    // unitTopicId: 0,
  });
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
const addUpdateSubTopic = (data: TSubTopicFormDataOnAdd | TSubTopicFormDataOnUpdate, subTopicId?: number) => {
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');

  let dataToSubmit = {};

  if (isNumber(subTopicId)) {
    dataToSubmit = {
      subTopicId: subTopicId,
      campusId: 1,
      instituteId: 1,
      organizationId: 1,
      appUserLogId: userDetail?.appUserLogId,
      lastModifiedUserId: userDetail?.lastModifiedUserId,
      rowVersion: userDetail?.rowVersion,
      createdUserId: userDetail?.createdUserId,
      loginId: userDetail?.loginId,
      loginAppClientId: userDetail?.loginAppClientId,
      loginAppClientLocationId: userDetail?.loginAppClientLocationId,
      loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      loginAppUserId: userDetail?.loginAppUserId,
      loginAppUserLogId: userDetail?.loginAppUserLogId,
      loginAppClientProductId: userDetail?.loginAppClientProductId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subTopicId: 0,
      campusId: 1,
      instituteId: 1,
      organizationId: 1,
      appUserLogId: userDetail?.appUserLogId,
      lastModifiedUserId: userDetail?.lastModifiedUserId,
      rowVersion: userDetail?.rowVersion,
      createdUserId: userDetail?.createdUserId,
      loginId: userDetail?.loginId,
      loginAppClientId: userDetail?.loginAppClientId,
      loginAppClientLocationId: userDetail?.loginAppClientLocationId,
      loginAppClientConnectionId: userDetail?.loginAppClientConnectionId,
      loginAppUserId: userDetail?.loginAppUserId,
      loginAppUserLogId: userDetail?.loginAppUserLogId,
      loginAppClientProductId: userDetail?.loginAppClientProductId,
      ...data,
    };
  }

  return requestManager.post('/SubTopic/Save', dataToSubmit);
};
