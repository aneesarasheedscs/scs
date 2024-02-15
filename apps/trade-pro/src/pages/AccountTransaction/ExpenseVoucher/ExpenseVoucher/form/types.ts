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

export type TSaveExpenseVoucher = {
  PrintPreview: boolean;
  Id: number;
  Type: number;
  BranchId: number;
  ProjectId: number;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: string | Date;
  ModifyDate: string | Date;
  DocumentTypeId: number;
  VoucherCode: number;
  VoucherDate: string | Date;
  RefAccountId: number;
  AgainstAccountId: number;
  RefDocNoId: number;
  ChequeDate: string | Date;
  CheqId: number;
  ChequeNo: string;
  PayTitle: string;
  IncludeWHT: boolean;
  Remarks: string;
  VoucherAmount: number;
  voucherDetailList: ExpenseVoucherDetail[];
};

export type ExpenseVoucherDetail = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  DebitAmount: number;
  CreditAmount: number;
};
export type TExpenseDetailEntry = {
  AccountId: number;
  AccountTitle: string;
  JobLotId: number;
  JobLotDescription: string;
  AgainstAccountId: number;
  CreditAmount: number;
  DebitAmount: number;
  Comments: string;
  key: number;
  AccountCode: number;
  AgainstAccount: string;
};
export type DataType = {
  AccountId: number;
  AccountTitle: string;
  debitAccount: any;
  JobLotId: number;
  LineId: number;
  AgainstAccountId: number;
  JobLotDescription: string;
  DebitAmount: number;
  Comments: string;
};

export type TjobLot = {
  Id: number;
  JobLotCode: string;
  JobLotDescription: string;
};
