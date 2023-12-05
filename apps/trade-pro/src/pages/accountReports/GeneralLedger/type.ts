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
  QtyIn: number;
  QtyOut: number;
  MannualNo: string;
  NoOfAttachments: number;
};

export type TFilterForms = {
  FromDate?: Date;
  ToDate?: Date;
  AccountId?: number;
  PostUnpost?: boolean;
  ReportType?: number;
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
  IsApproved: string;
  DocumentTypeDescription: string;
};

export type TGeneralLedgerSummaryII = {
  VoucherDate: string;
  DocTypeDescription: string;
  VoucherNo: string;
  ManualBillNo: string;
  AccountTitle: string;
  OffSetAccountTitle: string;
  Remarks: string;
  DebitAmount: number;
  CreditAmount: number;
  RunningBalance: number;
  NumAttachments: number;
  VoucherType: string;
};
