import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { requestManager } from '@tradePro/configs/requestManager';
import { useQuery } from 'react-query';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDistrictTable = () => {
  return useQuery(
    'district-history',
    () => {
      return requestManager.get('/api/District/GetAll', {
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

export const useGetDivisionTable = () => {
  return useQuery(
    'division-history',
    () => {
      return requestManager.get('/api/Division/GetAll', {
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

export const useGetTehsilTable = () => {
  return useQuery(
    'tehsil-history',
    () => {
      return requestManager.get('/api/Tehsil/GetAll', {
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

export const useGetTownTable = () => {
  return useQuery(
    'town-history',
    () => {
      return requestManager.get('/api/Town/GetAll', {
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

export const useGetDivisionState = () => {
  return useQuery(
    'division-state',
    () => {
      return requestManager.get('/api/StateProvince/GetAll', {
        params: { ...params, BranchId: userDetail?.BranchesId },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetDistrictState = () => {
  return useQuery(
    'district-state',
    () => {
      return requestManager.get('/api/Division/GetAll', { params: { ...params, BranchId: userDetail?.BranchesId } });
    },
    { cacheTime: 5000 }
  );
};

export const useGetTehsilState = () => {
  return useQuery(
    'tehsil-state',
    () => {
      return requestManager.get('/api/District/GetAll', {
        params: { ...params, BranchId: userDetail?.BranchesId },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetTownState = () => {
  return useQuery(
    'town-state',
    () => {
      return requestManager.get('/api/Tehsil/GetAll', {
        params: { ...params, BranchId: userDetail?.BranchesId },
      });
    },
    { cacheTime: 5000 }
  );
};
