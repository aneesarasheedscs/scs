export type TSaveBankReceiptVoucher = {
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
  voucherDetailList: ReceiptVoucher[];
};

export type ReceiptVoucher = {
  AccountId: number;
  AgainstAccountId: number;
  JobLotId: number;
  Comments: string;
  PaymentType: 'Advance' | 'Other';
  AdvanceAmount: number;
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

export type TBankReceiptDetailEntry = {
  AccountTitle: string;
  JobLotDescription: string;
  JobLotId: number;
  DCheqDate: Date | string;
  PaymentTypeId: number;
  PaymentType: string;
  Id: number;
  DebitAmount: number;
  CreditAmount: number;
  AdvanceAmount: number;
  CheqNoDetail: number;
  InvoiceNoRefId: number;
  PayeeTitle: string;
  Comments: string;
  IsTaxable: boolean;
  AccountId: number;
  ChequeDate: Date | string;
  Amount: number;
  CheqNo: number;
  AgainstAccountId: number;
  TaxTypeId: number;
  TaxPrcnt: number;
  TaxesTotalAmount: number;
  IsDetailExpanded: boolean;
  AccountCode: number;
  AgainstAccount: string;
};

export type TFormDetailList = {
  IncludeWHT: boolean;
  AccountId: number;
  AgainstAccountId: number;
  IsTaxable: boolean;
  Comments: string;
  CreditAmount: number;
  TaxTypeId: number;
  TaxPrcnt: number;
  TaxesTotalAmount: number;
  Amount: number;
};

export type TSaveBankReceipt = {
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
  voucherDetailList: TBankReceiptDetailEntry[];
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
  Id: number;
  AccountTitle: string;
  JobLotDescription: string;
  JobLotId: number;
  DCheqDate: Date | string;
  PaymentType: string;
  AccountId: number;
  DebitAmount: number;
  CreditAmount: number;
  AdvanceAmount: number;
  CheqNoDetail: number;
  InvoiceNoRefId: number;
  PayeeTitle: string;
  Comments: string;
  IsTaxable: boolean;
};
export type TDebitAccountBind = {
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
