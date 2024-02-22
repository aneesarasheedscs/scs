import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetChequeStatusTable = () => {
  return useQuery(
    'chequebookstatus-history',
    () => {
      return requestManager.get('/api/CheqBookHeader/CancelChequeHistory', {
        params: {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
        },
      });
    },
    { cacheTime: 5000 }
  );
};

//   Select Fields Query

export const useGetBankSelect = () => {
  return useQuery(
    'bank-Select',
    () => {
      return requestManager.get('/api/COAAllocation/GetDetailAccountByDocumentTypeId', {
        params: { ...params, DocumentTypeId: 2 },
      });
    },
    { cacheTime: 5000 }
  );
};

export const useGetChequeBookSelect = (BankId: number) => {
  console.log(BankId);
  return useQuery(
    ['cheque-book-Select', BankId],
    () => {
      return requestManager.get('/api/CheqBookHeader/OutstandingCheqNo', {
        params: { ...params, AccountId: BankId === null ? 0 : BankId },
      });
    },
    { cacheTime: 5000 }
  );
};

export const fetchChequeNoBalance = async (CheqNo: any, accountType: any, setBalanceFunction: any) => {
  const organizationId = 2;
  const companyId = 2;
  const accountId = 21657;

  try {
    const response = await requestManager.get(`/api/CheqBookHeader/OutstandingCheqNo`, {
      params: {
        OrganizationId: organizationId,
        CompanyId: companyId,
        AccountId: accountId,
        Id: CheqNo,
        // You may need to adjust the parameter name based on the API documentation
      },
    });

    if (response.status === 200) {
      const accountBalance = response.data?.Data.Result[0]?.CheqNo || 0;
      setBalanceFunction(accountBalance);
    } else {
      console.error('API request failed with status:', response.status);
      console.error('API response data:', response.data);
    }
  } catch (error) {
    console.error(`Error fetching ${accountType} account balance`, error);
  }
};
