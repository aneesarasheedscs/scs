import { AxiosError } from 'axios';
import { requestManager as reqManager } from '@scs/configs';

const logoutRedirect = (error: AxiosError) => {
  localStorage.clear();

  window.location.href = window.location.origin + '/';
  return Promise.reject(error);
};

const baseUrl = import.meta.env.VITE_API_URL;
const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

export const requestManager = reqManager(baseUrl, userDetail?.access_token, logoutRedirect);
