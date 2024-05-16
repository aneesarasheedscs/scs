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
                OrgCompanyTypeId: userDetail?.OrganizationId,
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
            return requestManager.post('/api/AccountsReports/ReceivablesAging_New', {
                OrganizationId: userDetail?.OrganizationId,
                CompanyId:userDetail?.CompanyId,
                FinancialYearId: financialYear?.Id,
                UserId:userDetail?.UserId,
                Activity:"Detail",
                AccouuntClassId:2,
                AgingDays:30,
                ToDate:new Date(),
            
                ...params,
                FromDate:'',
                EndDate:'',
            });
        },
        { enabled }
    );
};

export const useGetReceivablesAgingRegisterOverDue = (enabled = true, params?: ReceivablesAgingSearchCriteria) => {
    return useQuery(
        'ReceivableAging_Aging_New',
        () => {
            return requestManager.post('/api/AccountsReports/ReceivablesAging_New', {
                OrganizationId: userDetail?.OrganizationId,
                CompanyId:userDetail?.CompanyId,
                FinancialYearId: financialYear?.Id,
                UserId:userDetail?.UserId,
                Activity:"Detail",
                ReportTypeId:1,
                AccouuntClassId:2,
                AgingDays:30,
                ToDate:new Date(),
                ...params,
                FromDate:'',
                EndDate:'',
            });
        },
        { enabled }
    );
};

export const useGetReceivablesAgingRegisterNotYetDue = (enabled = true, params?: ReceivablesAgingSearchCriteria) => {
    return useQuery(
        'ReceivableAging_NotYetDue',
        () => {
            return requestManager.post('/api/AccountsReports/ReceivablesNotYetDue', {
                OrganizationId: userDetail?.OrganizationId,
                CompanyId:userDetail?.CompanyId,
                FinancialYearId: financialYear?.Id,
                UserId:userDetail?.UserId,
                Activity:"Detail",
                AccouuntClassId:2,
                AgingDays:30,
                ToDate:new Date(),
                ...params,
                FromDate:'',
                EndDate:'',
            });
        },
        { enabled }
    );
};