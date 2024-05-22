import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TAccountsPrematureReceiptsList } from './types';
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
export const useGetAccountsPrematureReceiptHistory = (enabled = true) => {
  return useQuery(
    'accounts_premature_receipt',
    () => {
      return requestManager.post('/api/AccountsPrematureReceipts/FormHistory', {
        // FromDate: financialYear?.Start_Period,
        // ToDate: financialYear?.End_Period,

        ...params,
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
      return requestManager.get('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        params: {
          ...params,
          AccountTypeIds: '3,6,8,11',
        },
      });
    },
    { enabled }
  );
};
export const useGetReceiverAccount = (voucherTypeId: number | null) => {
  return useQuery(
    ['receiver_account', voucherTypeId],
    () => {
      return requestManager.get('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        params: {
          ...params,
          AccountTypeIds: voucherTypeId === 3 ? '2' : voucherTypeId === 4 ? '15' : voucherTypeId === 5 ? '3,4,8' : '',
        },
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
export const useGetReadByTrackingNo = () => {
  return useQuery(
    'read_by_tracking_no',
    () => {
      return requestManager.get('/api/AccountsPrematureReceipts/ReadByTrackingNo', {
        params: {
          // ...params,
          TrackingNo: 'tcs8899',
        },
      });
    },
    { cacheTime: 5000 }
  );
};
//Confrim and cancel
export const useGetUpdateRecords = () => {
  return useQuery(
    'update_records',
    () => {
      return requestManager.post('/api/AccountsPrematureReceipts/UpdateRecord', {
        // FromDate: financialYear?.Start_Period,
        // ToDate: financialYear?.End_Period,
        FinancialYear: financialYear?.Id,
        EntryUserId: userDetail?.UserId,
        EntryStatus: 'Confrim', // cancel
        ...params,
      });
    }
    // { enabled }
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

    (data: TAccountsPrematureReceiptsList) => {
      return requestManager.post('/api/AccountsPrematureReceipts/Save', {
        AccountsPrematureReceiptsList: [
          {
            ...data,
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
            // EnteryDate: financialYear?.EntryDate,
            // ModifyDate: financialYear?.ModifyDate,
            // ApprovedDate: financialYear?.PostDate,
          },
        ],
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
          const msg = 'Record Updated successfully!';
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
