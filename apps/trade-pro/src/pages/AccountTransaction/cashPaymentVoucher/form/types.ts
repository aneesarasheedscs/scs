export type TSaveCashPaymentVoucher = {
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
  voucherDetailList: TCashPaymentDetailEntry[];
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

export type TCashPaymentDetailEntry = {
  PaymentTypeId: number;
  Id: number;
  PaymentType: string;
  JobLotId: number;
  Remarks: string;
  AccountId: number;
  AccountIdDebit: number;
  AccountTitle: string;
  JobLotDescription: string;
  AgainstAccountId: number;
  CreditAmount: number;
  DebitAmount: number;
  Comments: string;
  key: number;
  TaxTypeId: number;
  TaxName: string;
  TaxPrcnt: number;
  CheqId: number;
  InvoiceNoRefId: number;
  PayeeTitle: string;
  CheqNoDetail: number;
  IsDetailExpanded: boolean;
  Amount: number;
  TaxAmount: number;
  TotalAmount: number;
  IsTaxable: boolean;
};

export type TFormDetailList = {
  TaxPercent: number;
  TotalAmount: number;
  TaxAmount: number;
  IncludeWHT: boolean;
  AccountId: number;
  AgainstAccountId: number;
  IsTaxable: boolean;
  Comments: string;
  CreditAmount: number;
  TaxTypeId: number;
};

export type DataType = {
  Id: number;
  PaymentTypeId: number;
  PaymentType: string;
  AccountId: number;
  AccountTitle: string;
  JobLotId: number;
  JobLotDescription: string;
  DCheqDate: Date | string;
  DebitAmount: number;
  CreditAmount: number;
  AdvanceAmount: number;
  CheqNoDetail: number;
  InvoiceNoRefId: number;
  PayeeTitle: string;
  Comments: string;
  IsTaxable: boolean;
  TaxName: string;
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
