import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TAccountsPrematureReceiptsList, TAccountsPrematureReceiptsSearchCriteria } from './types';
import dayjs from 'dayjs';
const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDocumentNumber = (DocumentTypeId?: number) => {
  return useQuery(
    'document-number',
    () => {
      return requestManager.get('/api/AccountsPrematureReceipts/GenerateCode', {
        params: {
          ...params,
          // BranchesId: userDetail?.BranchesId,
          DocumentTypeId: DocumentTypeId,
          FinancialYearId: financialYear?.Id,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
export const useGetAccountsPrematureReceiptHistory = (
  enabled = true,
  parameters?: TAccountsPrematureReceiptsSearchCriteria
) => {
  return useQuery(
    'accounts_premature_receipt',
    () => {
      return requestManager.post('/api/AccountsPrematureReceipts/FormHistory', {
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,
        DocumentTypeId: 159,
        ...params,
        ...parameters,
      });
    },
    { enabled }
  );
};
export const useGetSenderBank = (enabled = true) => {
  return useQuery(
    'sender_bank',
    () => {
      return requestManager.post('/api/PdcBankName/GetByOrganizationCompanyId', {
        // FromDate: financialYear?.Start_Period,
        // ToDate: financialYear?.End_Period,

        ...params,
      });
    },
    { enabled }
  );
};
export const useGetSenderAccount = (enabled = true) => {
  return useQuery(
    'sender_account',
    () => {
      return requestManager.post('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        ...params,
        AccountTypeIds: '3,6,8,11',
      });
    },
    { enabled }
  );
};
export const useGetReceiverAccount = (voucherTypeId: number | null) => {
  return useQuery(
    ['receiver_account', voucherTypeId],
    () => {
      return requestManager.post('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        ...params,
        AccountTypeIds: voucherTypeId === 3 ? '2' : voucherTypeId === 4 ? '15' : voucherTypeId === 5 ? '3,4,8' : '',
      });
    },
    { enabled: !!voucherTypeId }
  );
};

export const useGetPendingRecords = () => {
  return useQuery(
    'pending_records',
    () => {
      return requestManager.get('/api/AccountsPrematureReceipts/GetPendingRecords', {
        params: {
          ...params,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
//Get By Id
// export const useGetReadByTrackingNo = () => {
//   return useQuery(
//     'read_by_tracking_no',
//     () => {
//       return requestManager.get('/api/AccountsPrematureReceipts/ReadByTrackingNo', {
//         params: {
//           // ...params,
//           TrackingNo: '',
//         },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
//Get ById
export const useGetReadByTrackingNo = (TrackingNo?: number | null) => {
  return useQuery(
    ['read_by_tracking_no', TrackingNo],
    () => {
      return getTrackingNo(TrackingNo);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getTrackingNo = (TrackingNo?: number | null) => {
  return requestManager.get('/api/AccountsPrematureReceipts/ReadByTrackingNo', { params: { TrackingNo } });
};
//Confrim and cancel
export const useGetUpdateRecords = (selectedRecordId?: number | null) => {
  return useQuery(
    ['update_records', selectedRecordId],
    () => {
      return requestManager.post('/api/AccountsPrematureReceipts/UpdateRecord', {
        FinancialYearId: financialYear?.Id,
        EnteryUserId: userDetail?.UserId,
        EntryStatus: 'Confirm', // cancel
        Id: selectedRecordId,
        ...params,
      });
    },
    {
      enabled: !!selectedRecordId,

      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Confirmed successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('accounts_premature_receipt');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useGetCancelRecords = (selectedRecordId?: number | null) => {
  return useQuery(
    ['cancel_records', selectedRecordId],
    () => {
      return requestManager.post('/api/AccountsPrematureReceipts/UpdateRecord', {
        FinancialYearId: financialYear?.Id,
        EnteryUserId: userDetail?.UserId,
        EntryStatus: 'Cancel', // cancel
        Id: selectedRecordId,
        ...params,
      });
    },
    {
      enabled: !!selectedRecordId,

      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record Canceled successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('accounts_premature_receipt');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useGetRepresentativeAccount = () => {
  return useQuery(
    'representative_account',
    () => {
      return requestManager.get('/api/DefineOtherParties/GetAll', {
        params: {
          ...params,
          DocumentTypeId: 159,
        },
      });
    },
    { cacheTime: 5000 }
  );
};
export const useAddAccountsPrematureReceipts = (DocumentTypeId?: number) => {
  return useMutation(
    'accounts_premature_receipts_add',

    (data: TAccountsPrematureReceiptsList[]) => {
      return requestManager.post('/api/AccountsPrematureReceipts/Save', {
        AccountsPrematureReceiptsList: data.map((item) => ({
          ...item,

          Id: 0,
          DocumentTypeId: DocumentTypeId,
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          EnteryUserId: userDetail?.UserId,
          ModifyUserId: userDetail?.UserId,
          ApprovalUserId: userDetail?.UserId,
          EnteryDate: dayjs(new Date()),
          ModifyDate: dayjs(new Date()),
          ApprovedDate: dayjs(new Date()),
          ChartOfAccountIdSender:
            userDetail?.PartyGlAccountId == 0 ? item.ChartOfAccountIdSender : userDetail?.PartyGlAccountId,
        })),
      });
    },

    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record added successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('accounts_premature_receipt');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
export const useUpdateAccountsPrematureReceipts = (
  DocumentTypeId?: number,
  selectedRecordId?: number | null,
  selectedTrackingSlip?: number | null
) => {
  return useMutation(
    'accounts_premature_receipts_update',

    (data: TAccountsPrematureReceiptsList[]) => {
      return requestManager.post('/api/AccountsPrematureReceipts/Save', {
        AccountsPrematureReceiptsList: data.map((item) => ({
          ...item,

          Id: selectedRecordId,
          TrackingSlipRef: selectedTrackingSlip,
          DocumentTypeId: DocumentTypeId,
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          FinancialYearId: financialYear?.Id,
          EnteryUserId: userDetail?.UserId,
          ModifyUserId: userDetail?.UserId,
          ApprovalUserId: userDetail?.UserId,
          EnteryDate: dayjs(new Date()),
          ModifyDate: dayjs(new Date()),
          ApprovedDate: dayjs(new Date()),

          ChartOfAccountIdSender:
            userDetail?.PartyGlAccountId == 0 ? item.ChartOfAccountIdSender : userDetail?.PartyGlAccountId,
        })),
      });
    },

    {
      onSuccess: (response: AxiosResponse) => {
        if (response?.data && response?.data?.Status === false) {
          notification.error({
            message: 'Error',
            description: response?.data?.Message || 'An error occurred.',
          });
        } else if (response?.data && response?.data?.Status === true) {
          const msg = 'Record updated successfully!';
          notification.success({ description: '', message: msg });
          queryClient.invalidateQueries('accounts_premature_receipt');
        }
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
