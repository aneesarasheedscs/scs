import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { PayablesAgingSearchCriteria } from './type';

const userDetail = storedUserDetail();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
export const useGetPayableAgingReport = (enabled = true, params?: PayablesAgingSearchCriteria) => {
  return useQuery(
    'PayablesAging_History',
    () => {
      return requestManager.post('/api/AccountsReports/PayablesAging_New', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        UserId: userDetail?.UserId,
        AccouuntClassId: 3,
        Activity: 'Detail',
        ToDate: new Date(),
        AgingDays: 30,
        ...params,
        FromDate: '',
        EndDate: '',
      });
    },
    { enabled }
  );
};
export const useGetPayableAgingRegisterReport = (enabled = true) => {
  return useQuery(
    'PayablesAging_Register_Report',
    () => {
      return requestManager.post('/api/AccountsHistoryReports/PayablesAging_124', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        CompanyAddress: userDetail?.CompanyAddress,
        CompanyName: userDetail?.CompanyName,
        ReportName: '124_Payables_New',
        UserId: userDetail?.UserId,
        AccouuntClassId: 3,
        Activity: 'Detail',
        ToDate: new Date(),
        AgingDays: 30,
      });
    },
    { enabled }
  );
};
