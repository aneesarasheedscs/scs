import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { TAccountsPrematureReceiptsList } from './types';

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
        FromDate: financialYear?.Start_Period,
        ToDate: financialYear?.End_Period,

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
      return requestManager.post('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        UserId: userDetail?.UserId,
        AccountTypeIds: '3,6,,8,11',

        ...params,
      });
    },
    { enabled }
  );
};
export const useGetReceiverAccount = (enabled = true) => {
  return useQuery(
    'receiver_account',
    () => {
      return requestManager.post('/api/COAAllocation/GetAccountTitleByAccountTypeIds', {
        UserId: userDetail?.UserId,
        // if voucherType == 3
        AccountTypeIds: '2',

        // if voucherType == 4
        //,"AccountTypeIds": "15"

        // if voucherType == 5
        //,"AccountTypeIds": "3,6,8"

        ...params,
      });
    },
    { enabled }
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
          },
        ],
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('accounts_premature_receipt');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
