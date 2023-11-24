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

export const useGetWareHouseTable = () => {
  return useQuery(
    'warehouse-history',
    () => {
      return requestManager.get('/api/InvWareHouse/GetAllWarehouse', {
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

// get By Id

export const useGetWareHouseById = (Id?: number | null) => {
  return useQuery(
    ['getWareHouseById', Id],
    () => {
      return getWareHouseById(Id);
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
const getWareHouseById = (Id?: number | null) => {
  return requestManager.get('/api/InvWareHouse/GetByID', { params: { Id } });
};
