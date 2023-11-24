import { useQuery } from 'react-query';
import { TFilterForms, TGeneralLedgerDetail, TGeneralLedgerSummaryI, TGeneralLedgerSummaryII } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const FinancialYearId = storedFinancialYear();
export const useGetGeneralLedgerDetail = (enabled = true, params?: TFilterForms) => {
  return useQuery(
    'general-ledger-detail',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedgerWithOffsetAccount', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        BranchesId: userDetail?.BranchesId,
        // ProjectsId: 2,
        // FromDate: '2023-01-01',
        // ToDate: '2023-08-29',
        // AccountId: 21407,
        // ApprovedFilter: 'All',
        // EntryUser: 2,
        // LanguageId: 0,
        ...params,
      });
    },
    { enabled }
  );
};
export const useGetGeneralLedgerSummaryI = (enabled = false, params?: TFilterForms) => {
  return useQuery(
    'general-ledger-summaryI',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedgerSummery', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        BranchesId: userDetail?.BranchesId,
        ProjectsId: 2,
        FromDate: '2023-01-01',
        ToDate: '2023-08-29',
        AccountId: 21407,
        ApprovedFilter: 'All',

        ...params,
      });
    },
    { enabled }
  );
};
export const useGetGeneralLedgerSummaryII = (enabled = true, params?: TGeneralLedgerSummaryII | TFilterForms) => {
  return useQuery(
    'general-ledger-summaryII',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedger2Format_Rpt', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        ApprovedFilter: 'All',
        ...params,
      });
    },
    { enabled }
  );
};
