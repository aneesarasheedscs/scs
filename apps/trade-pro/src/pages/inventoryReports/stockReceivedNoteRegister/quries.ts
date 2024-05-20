import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

// const [CompanyId, OrganizationId] = [
//     userDetail?.CompanyId,
//     userDetail?.OrganizationId

// ];
// const params = { CompanyId, OrganizationId };

export const useGetDataForDropDownFromTransfer = (enabled = true) => {
  return useQuery(
    'drop_down_transfer',
    () => {
      return requestManager.get('/api/WsRmStockReceivedNotes/GetDataForDropDownFromTransferRecieved', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { enabled }
  );
};

export const useGetStockReceivedNoteRegister = (enabled = true, params?: TSearchCriteria) => {
  console.log(params, 'params');
  return useQuery(
    'stock_receive_note_register_History',
    () => {
      return requestManager.post('/api/WsRmStockReceivedNotes/StockRecievedNotesRegister', {
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        DocumentTypeId: 2,
        IsApproved: params?.ReqTypeId > 1 ? true : false,

        ApprovedFilter: params?.ReqTypeId <= 1 ? 'All' : '',

        ...params,
      });
    },
    { enabled }
  );
};
