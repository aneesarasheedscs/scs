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
    return useQuery('drop_down_transfer', () => {
        return requestManager.get('/api/WsRmStockTransferNotes/GetDataForDropDownFromTransfer', {
            params: {
                OrganizationId: userDetail?.OrganizationId,
                CompanyId:userDetail?.CompanyId,
                
            }
        });
    },
        { enabled }
    );
};

export const useGetStockTransferNoteRegister = (enabled = true, params?: TSearchCriteria) => {
    return useQuery(
        'stock_transfer_note_register_History',
        () => {
            return requestManager.post('/api/WsRmStockTransferNotes/StockTransferNoteRegisterHistory', {
                OrganizationId: userDetail?.OrganizationId,
                CompanyId:userDetail?.CompanyId,
                DocumentTypeId:2,
          
                ...params,
        
            });
        },
        { enabled }
    );
};

