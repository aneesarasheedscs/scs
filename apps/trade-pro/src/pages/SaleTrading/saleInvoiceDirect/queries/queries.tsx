// import { QueryFunction, useQuery } from 'react-query';
// import { requestManager } from '@tradePro/configs/requestManager';
// import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
// import { AxiosResponse } from 'axios';
// import { AccountData } from '../form/types';
// import { TContraVoucherHistory } from '../table/types';

// const userDetail = storedUserDetail();
// const financialYear = storedFinancialYear();

// const [BranchesId, CompanyId, OrganizationId] = [
//   userDetail?.BranchesId,
//   userDetail?.CompanyId,
//   userDetail?.OrganizationId,
// ];

// const params = { CompanyId, OrganizationId, BranchesId };

// export const useGetSaleInvoiceTable = (params?: TContraVoucherHistory) => {
//   return useQuery(
//     'SaleInvoice-history',
//     () => {
//       return requestManager.post('/api/Voucher/VoucherFormHistory', {
//         OrganizationId: userDetail?.OrganizationId,
//         BranchesId: userDetail?.BranchesId,
//         CompanyId: userDetail?.CompanyId,
//         FinancialYearId: financialYear?.Id,
//         Ids: '10',
//         PostState: true,
//         NoOfRecords: 50,
//         ...params,
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };

// // Voucher No

// export const useGetVoucherNo = () => {
//   return useQuery(
//     'voucher-number',
//     () => {
//       return requestManager.get(
//         '/api/Voucher/GenerateVoucherCodeByDocumentTypeId?OrganizationId=2&CompanyId=2&DocumentTypeId=10&BranchId=2&FinancialYearId=2',
//         {
//           params: { ...params, DocumentTypeId: 10, BranchId: 2, FinancialYearId: 2 },
//         }
//       );
//     },
//     { cacheTime: 5000 }
//   );
// };

// // Onchange Credit and Debit Account Logic

// export const fetchAccountBalance = async (accountId: any, accountType: any, setBalanceFunction: any) => {
//   const organizationId = 2;
//   const companyId = 2;
//   const financialYearId = 2;
//   const refAccountId = 21493;
//   const voucherDate = '2023-09-12';

//   try {
//     const response = await requestManager.get(`/api/Voucher/ReadBalanceBySelectedAccount`, {
//       params: {
//         OrganizationId: organizationId,
//         CompanyId: companyId,
//         FinancialYearId: financialYearId,
//         RefAccountId: refAccountId,
//         VoucherDate: voucherDate,
//         AccountId: accountId, // You may need to adjust the parameter name based on the API documentation
//       },
//     });

//     if (response.status === 200) {
//       const accountBalance = response.data?.Data.Result[0]?.Balance || 0;
//       setBalanceFunction(accountBalance);
//     } else {
//       console.error('API request failed with status:', response.status);
//       console.error('API response data:', response.data);
//     }
//   } catch (error) {
//     console.error(`Error fetching ${accountType} account balance`, error);
//   }
// };

// // Fetch credit and debit Account Logic

// export const useGetContraCreditAccountSelect = () => {
//   return useQuery('credit-accounts', GetContraCreditAccountSelect, {
//     cacheTime: userDetail?.expires_in,
//   });
// };
// const GetContraCreditAccountSelect: QueryFunction<AxiosResponse<any, any>> = async () => {
//   const response = await requestManager.get('/api/COAAllocation/GetAll', {
//     params: {
//       ...params,
//     },
//   });
//   const rawData = response.data?.Data.Result || [];
//   const filteredData = rawData.filter((item: AccountData) => item.AccountTypeId === 2);
//   const filteredData2 = rawData.filter((item: AccountData) => item.AccountTypeId === 15);
//   // console.log(filteredData);
//   return filteredData && filteredData2;
// };

// //   Select Fields Query

// export const useGetContraCompanySelect = () => {
//   return useQuery(
//     'ContraCompany-Select',
//     () => {
//       return requestManager.get('/api/Company/GetAlldt?OrgCompanyTypeId=2', {
//         params: { ...params, OrgCompanyTypeId: 2 },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };

// export const useGetContraBranchSelect = () => {
//   return useQuery(
//     'ContraBranch-Select',
//     () => {
//       return requestManager.get('/api/Branches/GetAll?OrganizationId=2&CompanyId=2', { params: { ...params } });
//     },
//     { cacheTime: 5000 }
//   );
// };

// export const useGetContraProjectSelect = () => {
//   return useQuery(
//     'ContraProject-Select',
//     () => {
//       return requestManager.get('/api/Projects/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2', {
//         params: { ...params },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };

// export const useGetContraChequeNoSelect = () => {
//   return useQuery(
//     'ContraChequeNo-Select',
//     () => {
//       return requestManager.get('/api/Voucher/ReadBalanceBySelectedAccount', {
//         params: { ...params, FinancialYearId: 2, RefAccountId: 21493, VoucherDate: new Date().toISOString() },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };

// export const useGetContraJobLotSelect = () => {
//   return useQuery(
//     'ContraJobLot-Select',
//     () => {
//       return requestManager.get('/api/JobLot/GetByOrganizationCompanyId?OrganizationId=2&CompanyId=2', {
//         params: { ...params },
//       });
//     },
//     { cacheTime: 5000 }
//   );
// };
