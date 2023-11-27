export type TrialBalanceSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  LanguageId: number;
  FromDate: Date;
  ToDate: Date;
  ApprovedFilter: string;
  IsApproved: boolean;
  ZeroBalanceType: number;
  Debit: number;
  Credit: number;
  DateType: number;
};

export type TrialBalanceHistory = {
  ParentAccount: number;
  ParentAccountTitle: number;
  AccountId: number;
  AccountCode: number;
  AccountTitle: number;
  Opening: number;
  OpeningDr: number;
  OpeningCr: number;
  Debit: number;
  Credit: number;
  Closing: number;
  ClosingDr: number;
  ClosingCr: number;
};

export type TVoucherReportCriterias = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  ProjectsId: number;
  FinancialYearId: number;
  Id: number;
  FromDate: Date;
  ToDate: Date;
  FromDocNo: number;
  ToDocNo: number;
  DocumentTypeId: number;
  CustomerGroupId: number;
  AccountId: number;
  SaleInvoiceDocumentTypeIds: string;
  IsApproved: boolean;
  ApprovedFilter: string;
  ManualBillNo: string;
  ReportType: number
};
export type TVoucherReport = {
  Id: number;
  AccountId: number;
  DocumentTypeCode: string;
  DocumentTypeId: number;
  DocumentTypeSrNo: number;
  VoucherCode: number;
  VoucherDate: Date;
  ManualBillNo: string;
  AccountCode: string;
  AccountTitle: string;
  AccountTitleCoag: string;
  ChequePartyName: string;
  ChequeNo: string;
  Comments: string;
  DebitAmount: number;
  CreditAmount: number;
};
