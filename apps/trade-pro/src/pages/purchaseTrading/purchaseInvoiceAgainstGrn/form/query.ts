import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { TGRNDetailTableAdd } from './types';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

// export const useGetPurchaseOrder = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
//   return useQuery(
//     'purchase-order',
//     () => {
//       return requestManager.post('/api/InventoryReports/PurchaseOrderHistory', {
//         DocumentTypeId: 41,
//         CompanyId: userDetail?.CompanyId,
//         OrganizationId: userDetail?.OrganizationId,
//         ...params,
//       });
//     },
//     { enabled }
//   );
// };

//Get ById
export const useGetGoodsRecievedNotesById = (Id?: number | null) => {
  return useQuery(
    ['grn-getById', Id],
    () => {
      return getPurchaseOrderById(Id);
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
const getPurchaseOrderById = (Id?: number | null) => {
  return requestManager.get('/api/InvGrn/GetByID', { params: { Id } });
};
//Save GoodsRecievedNotes
export const useAddGoodsRecievedNotes = (params?: TGRNDetailTableAdd) => {
  return useMutation(
    'GRN-History-table',
    (data: TGRNDetailTableAdd) => {
      return requestManager.post('/api/InvGrn/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 46,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        // ModifyUser:

        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GRN-History-table');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
//Update GoodsRecievedNotes
export const useUpdateGoodsRecievedNotes = (Id?: number | null, params?: TGRNDetailTableAdd) => {
  return useMutation(
    'GRN-History-table',
    (data: TGRNDetailTableAdd) => {
      return requestManager.post('/api/InvGrn/Save', {
        ...data,
        Id: 0,
        DocumentTypeId: 41,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        BranchesId: userDetail?.BranchesId,
        FinancialYearId: financialYear?.Id,
        EntryDate: new Date().toISOString(),
        EntryUser: userDetail?.UserId,
        ModifyDate: new Date().toISOString(),
        ...params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GRN-History-table');
        const msg = 'Record updated successfully!';
        notification.success({ description: '', message: msg });
      },
    }
  );
};
