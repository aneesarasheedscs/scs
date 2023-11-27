import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { TSaveCustomerAllocateDiscountPolicy, TSaveCustomerDiscountPolicy } from './types';
import { queryClient } from '@tradePro/configs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId, BranchesId };

export const useGetCustomerDetailPolicyTable = () => {
  return useQuery(
    'CustomerDetailPolicy-History',
    () => {
      return requestManager.get('/api/CustomerDiscountPolicy/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          //   BranchesId: userDetail?.BranchesId,
          BranchesId: 2,
          CompanyId: userDetail?.CompanyId,
        },
        ...params,
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCustomerDetailPolicyDiscountTable = () => {
  return useQuery(
    'CustomerDetailPolicy-DiscountHistory',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/FormHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          //   BranchesId: userDetail?.BranchesId,
          BranchesId: 2,
          CompanyId: userDetail?.CompanyId,
        },
        ...params,
      });
    },
    { cacheTime: 5000 }
  );
};

//Get ById
export const useGetCustomerDetailPolicyById = (Id?: number | null) => {
  return useQuery(
    ['CustomerDetailPolicy-getById', Id],
    () => {
      return getCustomerDetailPolicyById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: !!Id,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getCustomerDetailPolicyById = (Id?: number | null) => {
  return requestManager.get('/api/CustomerDiscountPolicy/GetByID', { params: { Id } });
};

export const useGetCustomerDetailPolicyDiscountById = (Id?: number | null) => {
  return useQuery(
    ['CustomerDetailPolicy-DiscountgetById', Id],
    () => {
      return getCustomerDetailPolicyDiscountById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: !!Id,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const getCustomerDetailPolicyDiscountById = (Id?: number | null) => {
  return requestManager.get('/api/DiscountType/GetByID', { params: { Id } });
};

// Select Fields

export const useGetCustomerDetailPolicyCustomerSelect = () => {
  return useQuery(
    'CustomerDetailPolicy-CustomerSelect',
    () => {
      return requestManager.get('/api/SupplierCustomer/GetSupplierustomerByCustomerGroupId', {
        params: { ...params },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCustomerDetailPolicyDiscountTypeSelect = () => {
  return useQuery(
    'CustomerDetailPolicy-DiscountTypeSelect',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountTypes', {
        params: { ...params, BranchesId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCustomerDetailPolicyDiscountTypeModalSelect = () => {
  return useQuery(
    'CustomerDetailPolicy-DiscountTypeModalSelect',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountTypes', {
        params: { ...params, BranchesId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetCustomerDetailPolicyDiscountItemModalSelect = () => {
  return useQuery(
    'CustomerDetailPolicy-DiscountItemModalSelect',
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountCategories', {
        params: { ...params, BranchesId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

// Discount Type Change

export const useGetDiscountTypeChange = (DiscountTypeId: number) => {
  return useQuery(
    ['CustomerDetailPolicy-DiscountTypeChange', DiscountTypeId],
    () => {
      return requestManager.get('/api/AllocateDiscCategoryToDiscType/GetDiscountCategoriesFromAllocation', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          // BranchesId: userDetail?.BranchesId,
          BranchesId: 2,
          DiscountTypeId: DiscountTypeId,
        },
      });
    },
    { enabled: !!DiscountTypeId }
  );
};

// save form

export const useAddCustomerDiscountPolicy = (params?: TSaveCustomerDiscountPolicy) => {
  return useMutation(
    'CustomerDiscountPolicy-History',
    (data: TSaveCustomerDiscountPolicy) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        ...params,
      };
      return requestManager.post('/api/CustomerDiscountPolicy/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('CustomerDiscountPolicy-History');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateCustomerDiscountPolicy = (Id?: number | null, params?: TSaveCustomerDiscountPolicy) => {
  return useMutation(
    'CustomerDiscountPolicy-History',
    (data: TSaveCustomerDiscountPolicy) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        ...params,
      };
      return requestManager.post('/api/CustomerDiscountPolicy/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('CustomerDiscountPolicy-History');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useAddAllocateDiscount = (params?: TSaveCustomerAllocateDiscountPolicy) => {
  return useMutation(
    'CustomerDetailPolicy-DiscountHistory',
    (data: TSaveCustomerAllocateDiscountPolicy) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        // BranchesId: userDetail?.BranchesId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        EntryDate: new Date(),
        ModifyDate: new Date(),
        ...params,
      };
      return requestManager.post('/api/AllocateDiscCategoryToDiscType/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('CustomerDetailPolicy-DiscountHistory');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

export const useUpdateAllocateDiscount = (Id?: number | null, params?: TSaveCustomerAllocateDiscountPolicy) => {
  return useMutation(
    'CustomerDetailPolicy-DiscountHistory',
    (data: TSaveCustomerAllocateDiscountPolicy) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: Id,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        // BranchesId: userDetail?.BranchesId,
        BranchesId: 2,
        FinancialYearId: financialYear?.Id,
        EntryUserId: userDetail?.UserId,
        ModifyUserId: userDetail?.UserId,
        EntryDate: new Date(),
        ModifyDate: new Date(),
        ...params,
      };
      return requestManager.post('/api/AllocateDiscCategoryToDiscType/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('CustomerDetailPolicy-DiscountHistory');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
