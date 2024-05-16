export type TCashPaymentVoucherTable = {
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
  Debit: number;

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

export type TCashHistory = {
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
  AccountTitle: string;
  DateType: number;
  AccountId: number;

  EntryDateTo: Date;
  EntryDateFrom: Date;
  ApprovedDateFrom: Date;
  ApprovedDateTo: Date;
  ModifyDateFrom: Date;
  ModifyDateTo: Date;
};
