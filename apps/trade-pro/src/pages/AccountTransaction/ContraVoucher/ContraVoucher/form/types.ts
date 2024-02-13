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

export type TSaveContraVoucher = {
  PrintPreview: boolean;
  Id: number | string;
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
  RefDocNoId: number;
  ChequeDate: string | Date;
  CheqId: number;
  ChequeNo: string;
  PayTitle: string;
  Remarks: string;
  AgainstAccountId: number;
  VoucherAmount: number;
  voucherDetailList: TContraDetailEntry[];
};

export type VoucherDetail = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  DebitAmount: number;
  CreditAmount: number;
  InvoiceNoRefId: number;
  CheqNoDetail: number;
  DCheqDate: string | Date;
  IsTaxable: boolean;
  LineId: number;
};

export type TContraDetailEntry = {
  AccountId: number;
  AccountTitle: string;
  AgainstAccountId: number;
  JobLotId: number;
  JobLotDescription: string;
  CreditAmount: number;
  DebitAmount: number;
  InvoiceNoRefId: number;
  CheqNoDetail: number;
  DCheqDate: Date | string;
  IsTaxable: boolean;
  Comments: string;
  LineId: number;
  AgainstAccount: string;
  AccountCode: number;
};
export type TjobLot = {
  Id: number;
  JobLotCode: string;
  JobLotDescription: string;
};
