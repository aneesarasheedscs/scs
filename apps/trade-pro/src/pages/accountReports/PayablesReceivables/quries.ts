import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';

import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TPayablesReceivablesCriteria,  } from './types';

import { queryClient } from '@scs/configs';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TAddFollowUp } from './types';

const financialYear = storedFinancialYear();
const userDetail = storedUserDetail()

export const usePostPayablesReceivables = (
  enabled?: boolean,
  AccouuntClassId?: number,
  CompanyId?: number,
  params?: TPayablesReceivablesCriteria
) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(
    ['payables-receivables', AccouuntClassId, params],
    () => {
      return requestManager.post('/api/AccountsReports/TradeDebtorsAndCreditors_Report', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: CompanyId,
        CwCoaId: CompanyId,
        AccouuntClassId,
        AccountId: 3,
        ApprovedFilter: params?.IsApproved == true ? '' : 'All',
        ActionId:
          params?.OnlyCreditAmountAction == true && params.OnlyDebitAmountAction == true
            ? 0
            : params?.OnlyCreditAmountAction == true && params.OnlyDebitAmountAction == false
            ? 1
            : params?.OnlyCreditAmountAction == false && params.OnlyDebitAmountAction == true
            ? 2
            : null,
        ...params,
      });
    },
    { cacheTime: userDetail?.expires_in, enabled }
  );
};

export const useAddFollowUp = (params?: TAddFollowUp) => {

  return useMutation(
    'follow-up-receivables',
    (data: TAddFollowUp) => {
      let dataToSubmit = {};
      dataToSubmit = {
        ...data,
        Id: 0, //insert  (save)
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        CommentsDate: '2023-09-05',
        ChartOfAccountId: 21340,
        CommentsDetail: '',
        ...params,
      };
      return requestManager.post('/api/AccountsPayRecFollowUpHistory/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('add-follow-up');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'add-follow-up';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
