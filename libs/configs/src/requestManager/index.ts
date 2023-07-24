import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const requestManager = (
  baseURL: string,
  accessToken: string,
  logoutRedirect: (error: AxiosError) => void
) => {
  const reqManager = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });

  // Adds request interceptor
  reqManager.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (accessToken) {
        (config.headers as any)['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: any): Promise<any> => {
      return Promise.reject(error);
    }
  );

  //Adds response interceptor
  reqManager.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const axiosError = error as AxiosError;
      const originalRequest = axiosError.config;

      if ([401, 402].includes(error.response.status) && originalRequest?.url !== '/api/token') {
        logoutRedirect(error);
      }

      return Promise.reject(error);
    }
  );

  return reqManager;
};
