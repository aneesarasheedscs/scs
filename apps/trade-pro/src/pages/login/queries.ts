import { TUser } from './types';
import { useAtom } from 'jotai';
import { notification } from 'antd';
import { financialYearObject } from './Atom';
import { useMutation, useQuery } from 'react-query';
import { TUserDetail } from '@tradePro/globalTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';

export const useLogin = () => {
  return useMutation('token', (data: TUser) => getAccessToken(data), {
    onSuccess: (response: AxiosResponse) => {
      const userData: TUserDetail = response?.data;
      console.log(userData);
      localStorage.setItem('loggedInUserDetail', JSON.stringify(userData));
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
    return requestManager.post('/api/UserAccountAllocation/GetAllCompaniesByUserId', {
      OrganizationId: userDetail?.OrganizationId,
      UserAccountId: userDetail?.UserId,
    });
  });
};

export const useGetFinancialYear = (CompanyId: number | null) => () => {
  const [financialYearObjec, setFinancialYearObjec] = useAtom(financialYearObject);
  return useQuery(
    ['financial-year', CompanyId],
    () => {
      return requestManager.post('/api/FinancialYear/GetFinancialYearlist', {
        CompanyId,
        OrganizationId: userDetail?.OrganizationId,
      });
    },
    {
      enabled: !!CompanyId,
      onSuccess: (response: AxiosResponse) => {
        const userData: TUserDetail = response?.data?.Data?.Result;
        setFinancialYearObjec(userData);
      },
    }
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
export const useGetCompanyFeatures = (enabled = true) => {
  return useQuery(
    'company-features',
    () => {
      return requestManager.get('/api/CompanyFeatures/GetERPFeaturesByCompanyId', {
        params: { CompanyId: userDetail?.CompanyId, OrganizationId: userDetail?.OrganizationId },
      });
    },
    { enabled }
  );
};
