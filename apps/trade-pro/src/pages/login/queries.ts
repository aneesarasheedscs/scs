import { TUser } from './types';
import { notification } from 'antd';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
export const useLogin = () => {
  return useMutation('token', (data: TUser) => getAccessToken(data), {
    onSuccess: (response: AxiosResponse) => {
      const userData = JSON.stringify(response?.data);
      localStorage.setItem('loggedInUserDetail', userData);
      // queryClient.invalidateQueries
    },
    onError: (error: AxiosError<{ error_description: string }>) => {
      notification.error({ message: error?.response?.data?.error_description });
    },
  });
};
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
const userDetail = storedUserDetail();
export const useGetCompany = () => {
  return useQuery('company', () => {
    return requestManager.get('/api/UserAccountAllocation/GetAllCompaniesByUserId', {
      params: { OrganizationId: userDetail?.OrganizationId, UserAccountId: userDetail?.UserId },
    });
  });
};
export const useGetFinancialYear = (CompanyId: number | null) => () => {
  return useQuery(
    ['financial-year', CompanyId],
    () => {
      return requestManager.get('/api/FinancialYear/GetFinancialYearlist', {
        params: { CompanyId, OrganizationId: userDetail?.OrganizationId },
      });
    },
    { enabled: !!CompanyId }
  );
};
export const useGetBranch = (CompanyId: number | null) => () => {
  return useQuery(
    ['branch', CompanyId],
    () => {
      return requestManager.get('/api/UserAccountAllocation/GetBranchesByUserId', {
        params: { CompanyId, UserAccountId: userDetail?.UserId },
      });
    },
    { enabled: !!CompanyId }
  );
};
