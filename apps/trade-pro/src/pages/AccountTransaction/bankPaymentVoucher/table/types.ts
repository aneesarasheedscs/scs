export type TBankPaymentVoucherTable = {
  Id: number;
  VoucherCode: number;
  DocumentTypeId: number;
  DocumentTypeCode: string;
  VoucherDate: string;
  ManualBillNo: number;
  AccountTitle: string;
  Remarks: string;
  VoucherAmount: number;
  UserName: string;
  CheqNo: number;
  TaxAmount: number;
  TaxPrcnt: number;
  TaxName: string;
  TaxAccount: string;
  CustomerAddress: string;
  EntryUserProfileImageUrl: string;
  ModifyUserProfileImageUrl: string;
  ApprovalUserProfileImageUrl: string;
  CompLogoImage: string;
  ChequeDate: Date | string;
  EntryDate: Date | string;
  PayeeTitle: string;
};

export type TBankHistory = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  Ids: string;
  PostState: boolean;
  NoOfRecords: number;
};

export type TSearchCriteria = {
  FromDate: Date;
  ToDate: Date;
  FromDocNo: number;
  ToDocNo: number;
  ApprovedStatus: string;
  AccountId: number;
  AccountTitle: string;
  EntryDateTo: Date;
  EntryDateFrom: Date;
  ApprovedDateFrom: Date;
  ApprovedDateTo: Date;
  ModifyDateFrom: Date;
  ModifyDateTo: Date;
  DateType: number;
};
