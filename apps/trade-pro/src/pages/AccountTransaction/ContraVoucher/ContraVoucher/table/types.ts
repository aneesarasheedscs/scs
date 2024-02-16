export type TContraVoucherHistory = {
  Id: number;
  VoucherCode: number;
  Attachment: number;
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
  PayTitle: string;
};

export type TContraHistory = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  Ids: string;
  PostState: boolean;
  NoOfRecords: number;
};