import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TVoucherReportCriterias } from '../types';

const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();

export const useGetAccountTitle = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'account-title',
    () => {
      return requestManager.get('/api/ChartofAccount/DetailAccount', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          BranchesId: userDetail?.BranchesId,
          languageId: 0,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

// export const useGetVoucherReport = () => {
//   const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
//   return useQuery(
//     'account-title',
//     () => {
//       return requestManager.get('/api/ChartofAccount/ReadAllParentGroupAccount', {
//         params: {
//           OrganizationId: userDetail?.OrganizationId,
//           CompanyId: userDetail?.CompanyId,
//           FinancialYearId: FinancialYear?.Id,
//           ApprovedFilter: 'All',
//           IsApproved: true,

//           languageId: 0,
//         },
//       });
//     },
//     { cacheTime: userDetail?.expires_in }
//   );
// };

//====================
export const useGetCityName = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'city-name',
    () => {
      return requestManager.get('/api/City/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetLanguages = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'Languages',
    () => {
      return requestManager.get('api/MultiLanguages/GetByOrganizationCompanyId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetDocumentType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'doc-type',
    () => {
      return requestManager.get('/api/Voucher/GetDocumentTypesFromVouchers', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetCustomGroup = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'custom-group',
    () => {
      return requestManager.get('/api/AcLookUpsController/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetVoucherReport = (enabled = false, params?: TVoucherReportCriterias) => {
  return useQuery(
    'trial-balance',
    () => {
      return requestManager.post('/api/AccountsReports/VoucherReport', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYear?.Id,
        ApprovedFilter: params?.IsApproved ? '' : 'All',
        SaleInvoiceDocumentTypeIds: params?.SelectedDocuments.toString(),
        ...params,
      });
    },
    { enabled }
  );
};
