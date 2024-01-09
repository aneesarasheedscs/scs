import { QueryFunction, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { AxiosResponse } from 'axios';
import { storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();

//Parent  Category
export const getParentCategory = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ParentCategory',
    () => {
      return requestManager.get('/api/ItemCategory/InventoryParentCategories', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Item Category
export const getItemCategory = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemCategory',
    () => {
      return requestManager.get('/api/ItemCategory/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Sale GL
export const getItemSaleGLAccount = () => {
  return useQuery('gl-accounts', saleGLAccount, {
    cacheTime: userDetail?.expires_in,
  });
};
const saleGLAccount: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAllList', {
    params: {
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: TGLAccounts) => item.AccountTypeId === 10);
  console.log(filteredData);
  return filteredData;
};
//purchase GL
export const getItemPurchaseGLAccount = () => {
  return useQuery('gl-accounts', purchaseGLAccount, {
    cacheTime: userDetail?.expires_in,
  });
};

const purchaseGLAccount: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAllList', {
    params: {
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: TGLAccounts) => item.AccountTypeId === 4);
  console.log(filteredData);
  return filteredData;
};
//CGS GL
export const getItemCGSAccount = () => {
  return useQuery('gl-accounts', CGSGLAccount, {
    cacheTime: userDetail?.expires_in,
  });
};

const CGSGLAccount: QueryFunction<AxiosResponse<any, any>> = async () => {
  const response = await requestManager.get('/api/COAAllocation/GetAllList', {
    params: {
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
    },
  });
  const rawData = response.data?.Data.Result || [];
  const filteredData = rawData.filter((item: TGLAccounts) => item.AccountTypeId === 12);
  console.log(filteredData);
  return filteredData;
};

//Item Code
export const getItemCode = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemCode',
    () => {
      return requestManager.get('/api/Item/GenerateCodeByCategoryId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ItemCategoryId: 2,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

// Item Type
export const getItemType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemType',
    () => {
      return requestManager.get('/api/ItemType/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Type: 16,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
// Item Class
export const getItemClass = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemClass',
    () => {
      return requestManager.get('/api/ItemClass/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
// Item Class Group
export const getItemClassGroup = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemClassGroup',
    () => {
      return requestManager.get('/api/ItemCategory/GetItemClassGroup', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
// Item UOM
export const getItemUOM = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'ItemUOM',
    () => {
      return requestManager.get('/api/UOM/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Get GeneralLedger accounts By Item Category Id
export const getItemLedger = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'get-GeneralLedger-accounts ',
    () => {
      return requestManager.get('/api/Item/GetGLAccountbyItemCategoryId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          ItemCategoryId: 2,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
//Get Companies
export const getCompaniesNames = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'CompaniesName',
    () => {
      return requestManager.get('/api/Company/GetCompaniesAndBranches', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export type TGLAccounts = {
  IsActive: boolean;
  ChartofAccountId: number;
  CompanyId: number;
  Id: number;
  BranchId: number;
  GLPageNo: number | null;
  AccountTitle: string;
  OrganizationId: number;
  DocumentTypeId: number;
  AccountTypeId: number;
  EntryUserId: number;
  FinancialYearId: number;
  COAAllocationlist: any;
};
