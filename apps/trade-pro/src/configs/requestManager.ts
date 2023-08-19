import { AxiosError } from 'axios';
import { requestManager as reqManager } from '@scs/configs';
import { storedUserDetail } from '@tradePro/utils/storageService';

const logoutRedirect = (error: AxiosError) => {
  // localStorage.clear();

  // window.location.href = window.location.origin + '/';
  return Promise.reject(error);
};

const baseUrl = import.meta.env.VITE_API_URL;
const userDetail = storedUserDetail();

export const requestManager = reqManager(baseUrl, userDetail?.access_token as string, logoutRedirect);
