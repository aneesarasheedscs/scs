import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetJobLotsTable = () => {
  return useQuery(
    'joblots-history',
    () => {
      return requestManager.get('/api/JobLot/GetByOrganizationCompanyId/', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          BranchId: userDetail?.BranchesId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: 5000 }
  );
};

//   Select Fields Query

export const useGetJobLotState = () => {
  return useQuery(
    'JobLot-state',
    () => {
      return requestManager.get('/api/InvLookUp/GetLookupsByTypeId', { params: { ...params, InvLookupTypeId: 4 } });
    },
    { cacheTime: 5000 }
  );
};

// get By Id

export const useGetJobLotsById = (Id?: number | null) => {
  return useQuery(
    ['getJobLotsById', Id],
    () => {
      return getJobLotsById(Id);
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
const getJobLotsById = (Id?: number | null) => {
  return requestManager.get('/api/JobLot/GetByID/', { params: { Id } });
};
