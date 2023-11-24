import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { ReceivablesAgingSearchCriteria } from './type';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

// const [CompanyId, OrganizationId] = [
//     userDetail?.CompanyId,
//     userDetail?.OrganizationId

// ];
// const params = { CompanyId, OrganizationId };

export const useGetCustomer = (enabled = true) => {
    return useQuery('Receivabes-Customers', () => {
        return requestManager.get('/api/Company/GetAlldt', {
            params: {
                OrgCompanyTypeId: userDetail?.OrganizationId
            }
        });
    },
        { enabled }
    );
};

export const useGetReceivablesAgingRegister = (enabled = true, params?: ReceivablesAgingSearchCriteria) => {
    return useQuery(
        'ReceivableAging_History',
        () => {
            return requestManager.post('/api/AccountsReports/ReceivableAging', {
                OrganizationId: userDetail?.OrganizationId,
                FinancialYearId: financialYear?.Id,
                ...params,
            });
        },
        { enabled }
    );
};