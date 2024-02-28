export type TBillsPayableAccountsHistory = {
  Id: number;
  VoucherCode: number;
  DocumentTypeId: string;
  DocumentTypeCode: string;
  VoucherDate: string | Date;
  ManualBillNo: string | null;
  AccountTitle: string;
  Remarks: string;
  VoucherAmount: number;
  UserName: string;
  CheqNo: string;

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
  CompLogoImage: string;
};

export type AccountData = {
  Id: number;
  ChartofAccountId: number;
  AccountTitle: string;
  CompanyId: number;
  OrganizationId: number;
  IsActive: boolean;
  GLPageNo: number | null;
  AccountTypeId: number;
};
export type TBillsPayables = {
  PrintPreview: boolean;
  BranchId: number;
  ProjectId: number;
  DocumentTypeId: string;
  VoucherDate: Date | string;
  VoucherCode: number;
  RefAccountId: number;
  AgainstAccountId: number;
  VoucherAmount: number;
  ManualBillNo: number;
  DueDate: Date | string;
  Remarks: string;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  EntryUser: number;
  ModifyUser: number;
  Type: string;
  voucherDetailList: TvoucherDetailList[];
  PaymentDuesSchedules: TPaymentDuesSchedules[];
};
export type TvoucherDetailList = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  RefInvoiceNo: number;
  QtyIn: number;
  ItemRate: number;
  ItemAmount: number;
  DebitAmount: number;
  CreditAmount: number;
  IsTaxable: string;
  DueDays: number;
  DueDate: Date | string;
  // ,"DuePercentage":0.25
  refDocumentTypeId: number;
  AccountTitle: string;
  JobLotDescription: string;
  Amount: number;
  TaxTypeId: number;
  TaxName: string;
  TaxPrcnt: number;
  RefdocNoId: number;
  DuePercentage: number;
};
export type TPaymentDuesSchedules = {
  DueDate: Date | string;
  Amount: number;
  DuePercentage: number;
  DueDays: number;
  RefdocNoId: number;
  refDocumentTypeId: number;
  PaymentDueScheduleId: number;
};
export type TJobLot = {
  Id: number;
  JobLotCode: string;
  JobLotDescription: string;
};
