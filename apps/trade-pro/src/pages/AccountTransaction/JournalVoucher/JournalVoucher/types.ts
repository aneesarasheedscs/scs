export type TJournalVoucherData = {
  Id: number;
  DocumentTypeId: number;
  DocumentTypeSrNo: number;
  VoucherCode: number;
  VoucherDate: string;
  RemarksOtherLingo: string;
  FinancialYearId: number;
  Remarks: string;
  EntryDate: Date | string;
  EntryUser: number;
  ModifyDate: Date | string;
  ModifyUser: number;
  OrganizationId: number;
  BranchId: number;
  CompanyId: number;
  VoucherAmount: number;
  voucherDetailList: TVoucherDetailList[];
};
export type TVoucherDetailList = {
  AccountIdC: number;
  AccountIdD: number;
  AccountTitleC: string;
  AccountTitleD: string;
  AccountId: number;
  AccountTitle: string;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  CheqNoDetail: string;
  DebitAmount: number;
  CreditAmount: number;
  LineId: number;
};
export type TAccountsCombo = {
  Id: number;
  AccountTitle: string;
};
export type TJournalVoucherHistory = {
  Id: number;
  VoucherCode: number;
  DocumentTypeId: number;
  DocumentTypeCode: string;
  VoucherDate: Date | string;
  ManualBillNo: number | null;
  AccountTitle: string | null;
  Remarks: string;
  VoucherAmount: number;
  UserName: string;
  CheqNo: number | null;
};