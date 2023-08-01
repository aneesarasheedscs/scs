import { TUser } from './types';
import { notification } from 'antd';
import { useMutation } from 'react-query';
import { route } from '@tradePro/routes/constant';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default function useLogin() {
  return useMutation('token', (data: TUser) => getAccessToken(data), {
    onSuccess: (response: AxiosResponse) => {
      const userData = JSON.stringify(response?.data);
      localStorage.setItem('loggedInUserDetail', userData);
      window.location.href = window.location.origin + route.PURCHASE_ORDER;
    },
    onError: (error: AxiosError<{ error_description: string }>) => {
      notification.error({ message: error?.response?.data?.error_description });
    },
  });
}

const apiURL = import.meta.env.VITE_API_URL;

const getAccessToken = (values: TUser) => {
  const { username, password } = values;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  data.append('grant_type', 'password');

  return axios.post(`${apiURL}/token`, data, { headers });
};
