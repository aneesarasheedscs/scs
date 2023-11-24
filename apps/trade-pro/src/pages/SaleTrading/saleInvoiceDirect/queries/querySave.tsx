// import { queryClient } from '@tradePro/configs/index';
// import { useMutation, useQuery } from 'react-query';
// import { notification } from 'antd';
// import { AxiosError } from 'axios';
// import { requestManager } from '@tradePro/configs/requestManager';
// import { storedUserDetail } from '@tradePro/utils/storageService';
// import { TSaveContraVoucher } from '../form/types';
// // import { TSaveChequeBook } from '../form/types';

// const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
// const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

// //Get ById
// export const useGetSaleInvoiceById = (Id?: number | null) => {
//   return useQuery(
//     ['SaleInvoice-getById', Id],
//     () => {
//       return getSaleInvoiceById(Id);
//     },
//     {
//       cacheTime: 0,
//       staleTime: 0,
//       enabled: false,
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };
// const getSaleInvoiceById = (Id?: number | null) => {
//   return requestManager.get('/api/Voucher/GetByID', { params: { Id } });
// };

// // save form

// export const useAddSaleInvoice = (params?: TSaveContraVoucher) => {
//   return useMutation(
//     'add-SaleInvoice',
//     (data: TSaveContraVoucher) => {
//       let dataToSubmit = {};
//       const userDetail = storedUserDetail();
//       dataToSubmit = {
//         ...data,
//         Id: 0,
//         OrganizationId: userDetail?.OrganizationId,
//         CompanyId: userDetail?.CompanyId,
//         BrancheId: userDetail?.BranchesId,
//         FinancialYearId: financialYear?.Id,
//         EntryUser: 2,
//         // EntryUser: userDetail?.UserId,
//         ModifyUser: 2,
//         // ModifyUser: userDetail?.UserName,
//         EntryDate: new Date().toISOString(),
//         ModifyDate: new Date().toISOString(),
//         RefAccountId: 21284,
//         RefDocNoId: 21284,
//         ChequeDate: new Date().toISOString(),
//         CheqId: 0,
//         ChequeNo: '0',
//         AgainstAccountId: 21493, // Any One Detail Acount
//         VoucherAmount: 5000,
//         ...params,
//         // voucherDetailList,
//       };
//       return requestManager.post('/api/Voucher/Save', dataToSubmit);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('contraVoucher');
//         const msg = 'Record added successfully!';
//         notification.success({ description: '', message: msg });
//       },
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };

// export const useUpdateSaleInvoice = (Id?: number | null, params?: TSaveContraVoucher) => {
//   console.log(Id);
//   return useMutation(
//     'add-SaleInvoice',
//     (data: TSaveContraVoucher) => {
//       let dataToSubmit = {};
//       const userDetail = storedUserDetail();
//       dataToSubmit = {
//         ...data,
//         Id: Id,
//         OrganizationId: userDetail?.OrganizationId,
//         CompanyId: userDetail?.CompanyId,
//         BrancheId: userDetail?.BranchesId,
//         FinancialYearId: financialYear?.Id,
//         EntryUser: 2,
//         // EntryUser: userDetail?.UserId,
//         ModifyUser: 2,
//         // ModifyUser: userDetail?.UserName,
//         EntryDate: new Date().toISOString(),
//         ModifyDate: new Date().toISOString(),
//         RefAccountId: 21284,
//         RefDocNoId: 21284,
//         ChequeDate: new Date().toISOString(),
//         CheqId: 0,
//         ChequeNo: '0',
//         AgainstAccountId: 21493, // Any One Detail Acount
//         VoucherAmount: 5000,
//         // voucherDetailList,
//         ...params,
//       };
//       return requestManager.post('/api/Voucher/Save', dataToSubmit);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('contraVoucher');
//         const msg = 'Record updated successfully!';
//         notification.success({ description: '', message: msg });
//       },
//       onError: (error: AxiosError) => {
//         const msg = error.response?.data || 'Something went wrong';
//         notification.error({ description: '', message: msg as string });
//       },
//     }
//   );
// };
