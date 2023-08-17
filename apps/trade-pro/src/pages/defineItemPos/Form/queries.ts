import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

//Parent  Category
// export const getParentCategory = () => {
//   const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

//   return useQuery(
//     'ItemCategory',
//     () => {
//       return requestManager.get('', {
//         params: {
//           OrganizationId: userDetail?.OrganizationId,
//           CompanyId: userDetail?.CompanyId,
//         },
//       });
//     },
//     { cacheTime: userDetail?.expires_in }
//   );
// };
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
