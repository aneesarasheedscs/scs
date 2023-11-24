export type TSaveCashReceiptVoucher = {
  Id: number;
  Type: number;
  BranchId: number;
  ProjectId: number;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: string;
  ModifyDate: string;
  DocumentTypeId: number;
  VoucherCode: number;
  VoucherDate: string;
  RefAccountId: number;
  AgainstAccountId: number;
  RefDocNoId: number;
  IncludeWHT: boolean;
  ChequeDate: string;
  Remarks: string;
  VoucherAmount: number;
  voucherDetailList: PaymentVoucher[];
};

export type PaymentVoucher = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  PaymentType: 'Advance' | 'Other';
  AdvanceAmount?: number;
  DebitAmount: number;
  CreditAmount: number;
  InvoiceNoRefId: number;
  CheqNoDetail: number;
  DCheqDate: string;
  PayeeTitle: string;
  IsTaxable: boolean;
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

export type TTaxSchedule = {
  OrganizationId: number;
  CompanyId: number;
  EffectedDate: string | Date;
  TaxNameId: number;
};

export type TCashReceiptDetailEntry = {
  Id: number;
  PaymentTypeId: number;
  PaymentType: string;
  JobLotId: number;
  Remarks: string;
  AccountId: number;
  AccountTitle: string;
  JobLotDescription: string;
  AgainstAccountId: number;
  CreditAmount: number;
  DebitAmount: number;
  Comments: string;
  key: number;
};

export type TFormDetailList = {
  TaxTypeId: number;
  TaxPercent: number;
  TotalAmount: number;
  Amount: number;
  TaxAmount: number;
  IncludeWHT: boolean | string;
  AgainstAccountId: number;
};

export type TSaveCashReceipt = {
  Id: number;
  Type: number;
  BranchId: number;
  ProjectId: number;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: string;
  ModifyDate: string;
  DocumentTypeId: number;
  VoucherCode: number;
  VoucherDate: string;
  RefAccountId: number;
  AgainstAccountId: number;
  RefDocNoId: number;
  IncludeWHT: boolean;
  ChequeDate: string;
  Remarks: string;
  VoucherAmount: number;
  voucherDetailList: VoucherDetail[];
};

type VoucherDetail = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  PaymentType: 'Advance' | 'Other';
  AdvanceAmount?: number;
  DebitAmount: number;
  CreditAmount: number;
  InvoiceNoRefId: number;
  CheqNoDetail: number;
  DCheqDate: string;
  PayeeTitle: string;
  IsTaxable: boolean;
};

export type DataType = {
  key: number;
  PaymentType: string;
  AccountTitle: string;
  JobLotDescription: string;
  CreditAmount: number;
  Comments: string;
};

export type TCreditAccountBind = {
  AccountTitle: string;
  AccountTypeId: number;
  ChartofAccountId: number;
  CompanyId: number;
  GLPageNo: null;
  Id: number;
  IsActive: boolean;
  OrganizationId: number;
};

export type TjobLot = {
  Id: number;
  JobLotCode: string;
  JobLotDescription: string;
};
