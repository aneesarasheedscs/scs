import { useAtom } from 'jotai';
import { menuAtom } from './atom';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TAppUserFormData, TUser } from './index';
import { TAppUserFormDataforValidation } from './CompanyBranchesForm';
import requestManager from '@revisionary/configs/requestManager';

export default function useLogin(user: any) {
  console.log(user);
  return useMutation('token', (data: TUser) => getAccessToken(data, user), {
    onSuccess: (response, data: TUser) => {
      localStorage.setItem('auth', response?.data);
      console.log(response?.data?.apiData);
      getUser(response?.data, { LoginId: data?.UserName })
        .then((response) => {
          localStorage.setItem('app-user', JSON.stringify(response?.data?.apiData));
        })
        .catch((error) => console.log(error));
    },
    onError: (error: AxiosError) => {
      const msg = error.response?.data || 'Something went wrong';
      notification.error({ description: '', message: msg as string });
    },
  });
}

const apiURL = import.meta.env.VITE_API_URL;

const getAccessToken = (data: TUser, user: any) => axios.post(`${apiURL}/api/token?UserName=${user}`, data);
const getUser = (token: string, data: TAppUserFormData) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`${apiURL}/Login/UserValidate`, { params: { ...data }, headers });
};

export const useGetLocation = () => {
  const username = localStorage.getItem('username') || '';
  const token = localStorage.getItem('auth') || '';
  const headers = { Authorization: `Bearer ${token}` };
  return useQuery(
    'app-user-login',
    () => {
      return requestManager.get(`${apiURL}/Login/UserValidate`, {
        params: { LoginId: username },
        headers,
      });
    },
    { enabled: !!username }
  );
};
export const useGetMenu = () => {
  const [menuItems, setMenuItems] = useAtom(menuAtom);
  const token = localStorage.getItem('auth') || '';
  const headers = { Authorization: `Bearer ${token}` };

  return useMutation(
    (formData: TAppUserFormDataforValidation) => {
      return requestManager.get('/Login/UserAndPasswordValidate', {
        params: { ...formData },
        headers,
      });
    },
    {
      onSuccess: (response) => {
        console.log(response?.data?.apiData);
        localStorage.setItem('userDetail', JSON.stringify(response?.data?.apiData));
        setMenuItems(response?.data?.apiData);
      },
      onError: (error) => {},
    }
  );
};
