export type TVoucherReportCriterias = {
  // OrganizationId: number;
  // CompanyId: number;
  // FinancialYearId: number;
  FromDate: string;
  ToDate: string;
  SelectedDocuments: string;
  SaleInvoiceDocumentTypeIds: string;
  FromDocNo: number;
  ToDocNo: number;
  AccountId: number;
  ManualBillNo: string;
  CustomerGroupId: number;
  IsApproved: boolean;
  ApprovedFilter: string
};
export type TVoucherReport = {
  Id: string;
  AccountId: string;
  DocumentTypeCode: string;
  DocumentTypeId: string;
  DocumentTypeSrNo: string;
  VoucherCode: string;
  VoucherDate: string;
  ManualBillNo: string;
  AccountCode: string;
  AccountTitle: string;
  AccountTitleCoag: string;
  ChequePartyName: string | null;
  ChequeNo: string | null;
  Comments: string;
  DebitAmount: number;
  CreditAmount: number;
};
