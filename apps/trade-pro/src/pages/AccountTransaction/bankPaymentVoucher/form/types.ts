export type TSaveBankPaymentVoucher = {
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
  voucherDetailList: TBankPaymentDetailEntry[];
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

export type TBankPaymentDetailEntry = {
  AccountIdDebit: string;
  AccountTitle: string;
  JobLotDescription: string;
  JobLotId: number;
  DCheqDate: Date | string;
  PaymentType: string;
  DebitAmount: number;
  CreditAmount: number;
  AdvanceAmount: number;
  CheqNoDetail: number;
  CheqId: number;
  InvoiceNoRefId: number;
  PayeeTitle: string;
  Comments: string;
  IsTaxable: boolean;
  Amount: number;
  AccountId: number;
  AgainstAccountId: number;
  TaxTypeId: number;
  TaxPrcnt: number;
  TaxesTotalAmount: number;
  IsDetailExpanded: boolean;
  AccountCode: string;
  AgainstAccountCode: string;
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
export type TTaxType = {
  Id: number;
  TaxName: string;
};
