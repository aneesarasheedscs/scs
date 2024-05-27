import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { Tfilter } from './ActivitySummary/types';
import { TVoucherReportCriterias, TrialBalanceSearchCriteria } from './types';
import { TAccountDashboardCriteria } from './CashBalance';
import dayjs from 'dayjs'
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';


const userDetail = storedUserDetail();
const FinancialYear = storedFinancialYear();
//Activity Summary
export const useGetActivitySummary = (enabled = true, CompanyId?: number, params?: Tfilter) => {
  return useQuery(
    ['activity-summary'],
    () => {
      return requestManager.post('/api/AccountsReports/ReadByActivitySummary', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: CompanyId,
        FinancialYearId: FinancialYear?.Id,
        IsApproved: params?.ApprovedFilter == 'All' ? false : true,
        ...params,
        FromDate:FinancialYear?.Start_Period,
        ToDate: FinancialYear?.End_Period
      });
    },
    { enabled }
  );
};
//==============

//Voucher Report
export const useGetVoucherReport = (enabled = true, params?: TVoucherReportCriterias) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(
    'voucher-Report',
    () => {
      return requestManager.post('/api/AccountsReports/VoucherReport', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: financialYear?.Id,
        IsApproved: params?.ReportType == 1 ? true : false,
        ApprovedFilter: params?.ReportType == 3 ? 'All' : null,
        
        ...params,
      });
    },
    { enabled }
  );
};
//===============
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

export const useGetCustomGroup = (CompanyId?: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    ['custom-group'],
    () => {
      return requestManager.get('/api/AcLookUpsController/GetAll', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetDocumentType = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    'document-type',
    () => {
      return requestManager.get('api/Voucher/GetDocumentTypesFromVouchers', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
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

export const useGetDateTypes = () => {
  return useQuery(
    'DateTypes',
    () => {
      return requestManager.get('api/CommonServices/DateType', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetTrialBalanceReport = (enabled = true, params?: TrialBalanceSearchCriteria) => {
 
  return useQuery(
    'trial-balance',
    () => {
      return requestManager.post('/api/AccountsReports/TrialBalance', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYear?.Id,
        IsApproved: params?.ApprovedFilter == 'All' ? false : true,
        ...params,
      });
    },
    { enabled }
  );
};

//Cash and Bank Summary
export const useCashBankBalancesSummary = (
  enabled: boolean,
  AccountTypeId: number,
  CompanyId?: number,
  params?: TAccountDashboardCriteria
) => {

  return useQuery(
    ['cash_Bank_balancesummary', AccountTypeId],
    () => {
      return requestManager.post('api/AccountsReports/CashandBankBalancesSummery', {
        CompanyId: CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        FinancialYearId: FinancialYear?.Id,
        AccountTypeId: AccountTypeId,
        ApprovedFilter: 'All',
        BranchesId: userDetail?.BranchesId,
        ProjectsId: 0,
        FromDate:FinancialYear?.Start_Period,
        ToDate: FinancialYear?.End_Period,
        ...params,
      });
    },
    { enabled }
  );
};
//========================
//Cash Receipt And Payment
export const useGetCashReceiptPayment = (enabled: boolean, CompanyId?: number, params?: TAccountDashboardCriteria) => {

  return useQuery(
    'cash_Receipt_Payment',
    () => {
      return requestManager.get('api/AccountsReports/CashBalances', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: CompanyId,
          FromDate:FinancialYear?.Start_Period,
          ToDate: FinancialYear?.End_Period,
          
          ...params,
        },
      });
    },
    { cacheTime: userDetail?.expires_in, enabled }
  );
};
//==========================
//Bank Receipt and Payment
export const useGetBankBalancesReceiptPayment = (
  enabled: boolean,
  CompanyId?: number,
  params?: TAccountDashboardCriteria
) => {

  return useQuery(
    ['bank_receipt_payment', params],
    () => {
      return requestManager.get('api/AccountsReports/BankBalances', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: CompanyId,
          FinancialYearId: FinancialYear?.Id,
          ...params,
        },
      });
    },
    { cacheTime: userDetail?.expires_in, enabled }
  );
};
//=============================

export const useGetFollowUpHistory = () => {

  return useQuery(
    'follow-up-receivables',
    () => {
      return requestManager.get('/api/AccountsPayRecFollowUpHistory/GetAll', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};

export const useGetDateType = () => {

  return useQuery(
    'date-type',
    () => {
      return requestManager.get('api/CommonServices/DateType', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetBranchesByUserId = () => {
  return useQuery(
    'branches-By-UserId',
    () => {
      return requestManager.get('/api/Branches/GetBranchesByUserId', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          UserId: userDetail?.UserId,
        },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
export const useGetMasterBranchByUserId = () => {
  // const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

  return useQuery(
    'master-branch',
    () => {
      return requestManager.get('/api/Company/GetCompaniesByUserId?OrganizationId=2&UserId=2', {
        params: { OrganizationId: userDetail?.OrganizationId, CompanyId: userDetail?.CompanyId },
      });
    },
    { cacheTime: userDetail?.expires_in }
  );
};
