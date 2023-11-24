export type TCashAndBankBalancesSummary = {
  Id: number;
  AccountTitle: string;
  AccountCode: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;

  SupplierName: any;
  AccountDescription: string;
};

export type TBankBalances = {
  Id: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;
  voucherdate: Date;
  DebitAmount: number;
  fillteredTableData: number;
  length: any;
};
export type TBankPayment = {
  Id: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;
  voucherdate: Date;
  DebitAmount: number;
};
