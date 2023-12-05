export type TCashAndBankBalancesSummary = {
  AccountId: number;
  AccountTitle: string;
  AccountCode: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;

  SupplierName: any;
  AccountDescription: string;
};

export type TCashBalance = {
  Id: number;
  Type: string;
  Vcode: any;
  Date: number;
  CashAccount: number;
  RecievedForm: any;
  Amount: number;
  Attachments: any;
  voucherdate: Date;
  DebitAmount: number;
  OffsetAccountTitle: string;
};
export type TCashPayment = {
  Id: number;
  Type: any;
  CashAccount: any;
  Vcode: any;
  Date: number;
  PaidTo: any;
  Amount: number;
  Attachments: any;
  voucherdate: Date;
  DebitAmount: number;
};
