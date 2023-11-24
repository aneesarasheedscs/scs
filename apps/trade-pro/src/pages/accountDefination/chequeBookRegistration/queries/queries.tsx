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

export const useGetChequeBookTable = () => {
  return useQuery(
    'chequebookregistration-history',
    () => {
      return requestManager.get('/api/CheqBookHeader/GetAll', {
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

export const useGetChequeBookRegistrationSelect = () => {
  return useQuery(
    'ChequeBookRegistration-Select',
    () => {
      return requestManager.get(
        '/api/COAAllocation/GetAccountTitleByAccountTypeIds?OrganizationId=2&CompanyId=2&AccountTypeIds=15',
        { params: { ...params, AccountTypeIds: 4 } }
      );
    },
    { cacheTime: 5000 }
  );
};
