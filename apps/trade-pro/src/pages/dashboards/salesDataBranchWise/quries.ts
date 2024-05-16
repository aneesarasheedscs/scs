import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TSalesDataSearchCriteria } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();
const [CompanyId, OrganizationId] = [userDetail?.CompanyId, userDetail?.OrganizationId];

const params = { CompanyId, OrganizationId };
export const useGetSalesDataBranchWise = (enabled = true, params?: TSalesDataSearchCriteria) => {
  return useQuery(
    'sales_data_branch_wise',
    () => {
      return requestManager.post('/api/Dashboard/GetSalesDataBranchWise', {
        OrganizationId: userDetail?.OrganizationId,

        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        PaymenetTermId: 1, // Cash
        //,"PaymenetTermId": 2 // Credit
        WeightType: 1,
        ReqType: 'Kgs',
        ValueType: 1,
        VoucherType: 'Rs',
        ...params,
      });
    },
    { enabled }
  );
};
