export type TGeneralLedgerDetail = {
  VoucherDate: Date;
  DocType: string;
  VocherNo: number;
  AmountCode: number;
  OffSetTitle: string;
  Debit: number;
  Credit: number;
  Balance: number;
  Comments: string;
  ChequeNo: number | string;
  ChequeDate: Date;
  NoOfAttachments: number;
};

export type TFilterForms = {
  FromDate?: string;
  ToDate?: string;
  Id?: number;
  AccountTitle: string;
  DateType: string | Date;
  Branch: string;
  SubBranch: string;

  
  AccountId:number
};

export type TGeneralLedgerSummaryI = {
  VoucherDate: string;
  DocTypeDescription: string;
  VoucherNo: string;
  ManualBillNo: string;
  AccountTitle: string;
  Remarks: string;
  DebitAmount: number;
  CreditAmount: number;
  RunningBalance: number;
  IsApproved: boolean;
  DocumentTypeDescription: string;
};

export type TGeneralLedgerSummaryII = {
  VoucherDate: string;
  DocTypeDescription: string;
  VoucherNo: string;
  ManualBillNo: string;
  AccountTitle: string;
  OffsetAccountTitle: string;
  Remarks: string;
  DebitAmount: number;
  CreditAmount: number;
  RunningBalance: number;
  NumAttachments: number;
  VoucherType: string;
};
export type TBranchId = {
  BranchName: string;
};
