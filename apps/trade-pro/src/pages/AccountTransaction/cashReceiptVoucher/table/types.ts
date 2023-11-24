export type TCashReceiptVoucherTable = {
  Id: string;
  VoucherCode: string;
  DocumentTypeId: string;
  DocumentTypeCode: string;
  VoucherDate: string | Date;
  ManualBillNo: string | null;
  AccountTitle: string;
  Remarks: string;
  VoucherAmount: number;
  UserName: string;
  CheqNo: string;
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
