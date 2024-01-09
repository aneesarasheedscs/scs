export type TExpenseVoucherHistory = {
  Id: string;
  VoucherCode: string;
  DocumentTypeId: string;
  DocumentTypeCode: string;
  VoucherDate: string;
  ManualBillNo: string | null;
  AccountTitle: string;
  Remarks: string;
  VoucherAmount: number;
  UserName: string;
  CheqNo: string;
};

export type TVoucherHistory = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  Ids: string;
  PostState: boolean;
  NoOfRecords: number;
};
