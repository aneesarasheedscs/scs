import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { queryClient } from '@tradePro/configs/index';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { TDefineDistrictDataOnAdd } from './forms/district/types';
import { TDefineDivisionDataOnAdd } from './forms/division/types';
import { TDefineTehsilDataOnAdd } from './forms/tehsil/types';
import { TDefineTownDataOnAdd } from './forms/town/types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

// District Type

export const useSaveDistrictType = (DistrictId?: number | null) => {
  return useMutation(
    (data: TDefineDistrictDataOnAdd) => {
      console.log(data);
      return saveDistrictType(data, DistrictId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('district-history');
        const msg = DistrictId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveDistrictType = (
  data?: TDefineDistrictDataOnAdd,
  DistrictId?: number | null,
  params?: TDefineDistrictDataOnAdd
) => {
  let dataToSubmit = {};
  if (isNumber(DistrictId)) {
    dataToSubmit = {
      DistrictId: DistrictId,
      ...data,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-07-08',
      CityId: 0,
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      DivisionId: 0,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-07-08',
      CityId: 0,
      ...params,
    };
  }
  return requestManager.post('/api/District/Save', dataToSubmit);
};

// Division Type

export const useSaveDivisionType = (DivisionId?: number | null) => {
  return useMutation(
    (data: TDefineDivisionDataOnAdd) => {
      console.log(data);
      return saveDivisionType(data, DivisionId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('division-history');
        const msg = DivisionId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveDivisionType = (
  data?: TDefineDivisionDataOnAdd,
  DivisionId?: number | null,
  params?: TDefineDivisionDataOnAdd
) => {
  let dataToSubmit = {};
  if (isNumber(DivisionId)) {
    dataToSubmit = {
      ...data,
      DivisionId: DivisionId,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-07-08',
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      DivisionId: 0,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-07-08',
      ...params,
    };
  }
  return requestManager.post('/api/Division/Save', dataToSubmit);
};

// Tehsil Type

export const useSaveTehsilType = (TehsilId?: number | null) => {
  return useMutation(
    (data: TDefineTehsilDataOnAdd) => {
      console.log(data);
      return saveTehsilType(data, TehsilId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tehsil-history');
        const msg = TehsilId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveTehsilType = (data: TDefineTehsilDataOnAdd, TehsilId?: number | null, params?: TDefineTehsilDataOnAdd) => {
  let dataToSubmit = {};
  if (isNumber(TehsilId)) {
    dataToSubmit = {
      ...data,
      TehsilId: TehsilId,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-09-06',
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      TehsilId: 0,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      CreatedOn: '2023-09-06',
      ...params,
    };
  }
  return requestManager.post('/api/Tehsil/Save', dataToSubmit);
};

// Town Type

export const useSaveTownType = (TownId?: number | null) => {
  return useMutation(
    (data: TDefineTownDataOnAdd) => {
      console.log(data);
      return saveTownType(data, TownId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('town-history');
        const msg = TownId ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveTownType = (data?: TDefineTownDataOnAdd, TownId?: number | null, params?: TDefineTownDataOnAdd) => {
  let dataToSubmit = {};
  if (isNumber(TownId)) {
    dataToSubmit = {
      ...data,
      TownId: TownId,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      ...params,
    };
  } else {
    dataToSubmit = {
      ...data,
      TownId: 0,
      OrganizationId: userDetail?.OrganizationId,
      BranchId: userDetail?.BranchesId,
      CompanyId: userDetail?.CompanyId,
      CreatedUserId: userDetail?.UserId,
      DateTime: '2023-07-08',
      SortNo: 1,
      ...params,
    };
  }
  return requestManager.post('/api/Town/Save', dataToSubmit);
};
