import { useQuery } from 'react-query';
import { TFilterForms } from './type';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { useAtom } from 'jotai';
import { CheckBox } from './tables/Atom';

const userDetail = storedUserDetail();
const FinancialYearId = storedFinancialYear();

export const useGetGeneralLedgerDetail = (enabled = false, params?: TFilterForms) => {
  // const [isUnpostedChecked, setIsUnpostedChecked] = useAtom(CheckBox);
  // const filter = isUnpostedChecked ? 'IsApproved' : 'ApprovedFilter';
  // const filterValue = isUnpostedChecked ? true : 'All';
  return useQuery(
    'general-ledger-detail',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedgerWithOffsetAccount', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        BranchesId: userDetail?.BranchesId,
        EntryUser: userDetail?.UserId,
        ApprovedFilter: params?.PostUnpost == true ? 'All' : '',
        IsApproved: params?.PostUnpost == false ? true : false,
        ...params,
      });
    },
    { enabled }
  );
};

export const useGetGeneralLedgerSummaryI = (enabled = true, params?: TFilterForms) => {
  const [isUnpostedChecked, setIsUnpostedChecked] = useAtom(CheckBox);
  const filter = isUnpostedChecked ? 'IsApproved' : 'ApprovedFilter';
  const filterValue = isUnpostedChecked ? true : 'All';

  return useQuery(
    'general-ledger-summaryI',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedgerSummery', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        BranchesId: userDetail?.BranchesId,
        ApprovedFilter: filter === 'ApprovedFilter' ? filterValue : undefined,
        IsApproved: filter === 'IsApproved' ? filterValue : undefined,
        ...params,
      });
    },
    { enabled }
  );
};
export const useGetGeneralLedgerSummaryII = (enabled = true, params?: TFilterForms) => {
  const [isUnpostedChecked, setIsUnpostedChecked] = useAtom(CheckBox);
  const filter = isUnpostedChecked ? 'IsApproved' : 'ApprovedFilter';
  const filterValue = isUnpostedChecked ? true : 'All';
  return useQuery(
    'general-ledger-summaryII',
    () => {
      return requestManager.post('/api/AccountsReports/GeneralLedger2Format_Rpt', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        ApprovedFilter: filter === 'ApprovedFilter' ? filterValue : undefined,
        IsApproved: filter === 'IsApproved' ? filterValue : undefined,
        ...params,
      });
    },
    { enabled }
  );
};
