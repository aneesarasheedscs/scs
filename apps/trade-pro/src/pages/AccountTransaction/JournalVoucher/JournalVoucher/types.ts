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
  AgainstAccount: string;
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

  ChequeDate: Date | string;
  PayTitle: string;
  TaxAmount: number;
  TaxPrcnt: number;
  TaxName: string;
  TaxAccount: string;
  CustomerAddress: string;
  EntryUserProfileImageUrl: string;
  ModifyUserProfileImageUrl: string;
  ApprovalUserProfileImageUrl: string;
  CompLogoImage: string | null;
};
export type TSearchCriteria = {
  FromDate: Date;
  ToDate: Date;
  FromDocNo: number;
  ToDocNo: number;
  ApprovedStatus: string;
  AccountId: number;
  AccountTitle: string;
  DateType: number;
  EntryDateTo: Date;
  EntryDateFrom: Date;
  ApprovedDateFrom: Date;
  ApprovedDateTo: Date;
  ModifyDateFrom: Date;
  ModifyDateTo: Date;
};
