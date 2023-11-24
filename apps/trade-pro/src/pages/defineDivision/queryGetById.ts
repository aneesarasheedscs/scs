import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

// District By Id
export const useGetDistrictById = (Id?: number | null) => {
  return useQuery(
    ['getdistrictById', Id],
    () => {
      return getDistrictById(Id);
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
const getDistrictById = (Id?: number | null) => {
  return requestManager.get('/api/District/GetByID', { params: { Id } });
};

// Division By Id

export const useGetDivisionById = (Id?: number | null) => {
  return useQuery(
    ['getdivisionById', Id],
    () => {
      return getDivisionById(Id);
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
const getDivisionById = (Id?: number | null) => {
  return requestManager.get('/api/Division/GetByID', { params: { Id } });
};

// Tehsil By Id

export const useGetTehsilById = (Id?: number | null) => {
  return useQuery(
    ['getTehsilById', Id],
    () => {
      return getTehsilById(Id);
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
const getTehsilById = (Id?: number | null) => {
  return requestManager.get('/api/Tehsil/GetByID', { params: { Id } });
};

// Town By Id

export const useGetTownById = (Id?: number | null) => {
  return useQuery(
    ['getTownById', Id],
    () => {
      return getTownById(Id);
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
const getTownById = (Id?: number | null) => {
  return requestManager.get('/api/Town/GetByID', { params: { Id } });
};
