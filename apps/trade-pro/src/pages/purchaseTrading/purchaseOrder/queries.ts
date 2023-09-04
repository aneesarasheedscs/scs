import { queryClient } from '@tradePro/configs';
import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TPurchaseOrderEntry, TPurchaseOrderSearchCriteria } from './type';

const userDetail = storedUserDetail();

export const useGetPurchaseOrder = (enabled = true, params?: TPurchaseOrderSearchCriteria) => {
  return useQuery(
    'purchase-order',
    () => {
      return requestManager.post('/api/InventoryReports/PurchaseOrderHistory', {
        DocumentTypeId: 41,
        CompanyId: userDetail?.CompanyId,
        OrganizationId: userDetail?.OrganizationId,
        ...params,
      });
    },
    { enabled }
  );
};

export const useAddPurchaseOrder = () => {
  return useMutation(
    'add-purchase-order',
    (data: TPurchaseOrderEntry) => {
      return requestManager.post('/api/PurchaseOrder/Save', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('purchase-order');
      },
    }
  );
};
