import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { queryClient } from '@scs/configs';

export const useAccount = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const FinancialYearId: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery('vouchers-Approval', () => {
    return requestManager.get('api/Dashboard/AccountsPendingApprovals', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        UserId: userDetail?.UserId,
      },
    });
  });
};

export const useInventory = () => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const FinancialYearId: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery('inventory-Approval', () => {
    return requestManager.get('api/Dashboard/InventoryPendingApprovals', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        UserId: userDetail?.UserId,
      },
    });
  });
};

//==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Ali Rehman
export const useGetPendingForViewVouchers = (documentTypeId: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const FinancialYearId: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery('pending-view', () => {
    return requestManager.get('api/Voucher/PendingVoucherReconcilationForApprovalDashboard', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        DocumentTypeId: documentTypeId,
      },
    });
  });
};

export const useGetVoucherDetail = (Id?: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery('', () => {
    return requestManager.get('api/Voucher/GetDetailByVoucherHeadId', {
      params: {
        Id: Id,
      },
    });
  });
};

export const useGetVouchersForApproval = (documentTypeId: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const FinancialYearId: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(['voucher-history-table', documentTypeId], () => {
    return requestManager.get('api/Voucher/VoucherForApprovalDashboard', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        DocumentTypeId: documentTypeId,
      },
    });
  });
};

export const useGetVouchersModernHistoryHeaderData = (
  documentTypeIds: string,
  NoOfRecords: number,
  CanViewAllRecords: boolean,
  ApprovedFilter: string,
  IsApproved: boolean
) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const FinancialYearId: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
  return useQuery(['Modern-history-Header', documentTypeIds], () => {
    return requestManager.get('api/ModernHistory/VouchersModernHisotry_Header', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        FinancialYearId: FinancialYearId?.Id,
        EntryUser: userDetail?.UserId,
        DocumentTypeIds: documentTypeIds,
        NoOfRecords: NoOfRecords,
        CanViewAllRecords: CanViewAllRecords,
        IsApproved: IsApproved,
        ApprovedFilter: ApprovedFilter,
      },
    });
  });
};

export const useGetVouchersModernHistoryByHeaderId = (documentId?: number, documentTypeIds?: string) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  return useQuery(['Detail-Data', documentId], () => {
    return requestManager.get('api/ModernHistory/VouchersModernHisotry', {
      params: {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: documentId,
        DocumentTypeIds: documentTypeIds,
      },
    });
  });
};

//Approval
export const useApproveVouchers = (documentTypeId?: number) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  let dataToSubmit: any;
  return useMutation(
    'Approve_Vouchers',
    (ApprovalList: any) => {
      dataToSubmit = {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        documentTypeId,
        ...ApprovalList,
      };
      return requestManager.post('/api/Voucher/UpdateStatusandIsapprovedByVoucherId', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['Modern-history-Header', documentTypeId?.toString()]);
        queryClient.invalidateQueries('vouchers-Approval');
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

// Notes Save
export const useVouchersNotesByApprovalUserId_Save = (documentTypeId?: number) => {
  return useMutation(
    'VouchersNotesByApprovalUserId_Save',
    (dataToSubmit: any) => {
      return requestManager.post('api/VouchersApprovedByEditorRemarks/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('VouchersRemarksByApprovalUser_History');
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
//Notes History
export const useVouchersRemarksByApprovalUser_History = (documentTypeId?: number, VoucherHeadId?: number) => {
  return useQuery(
    'VouchersRemarksByApprovalUser_History',
    () => {
      return requestManager.post('api/VouchersApprovedByEditorRemarks/HistoryByUserAndDocumentId', {
        CommentsUserId: documentTypeId,
        RefDocMasterRecordId: VoucherHeadId,
      });
    },
    {
      enabled: !!VoucherHeadId,
    }
  );
};
