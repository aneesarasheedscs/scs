export type TCashAndBankBalancesSummary = {
  AccountId: number;
  AccountTitle: string;
  AccountCode: number;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;

  SupplierName: any;
  AccountDescription: string;
};

export type TCashBalance = {
  Id: number;
  VoucherCode:number,
  AccountTitle:string,
  Type: string;
  Vcode: any;
  Date: number;
  CashAccount: number;
  RecievedForm: any;
  DocumentTypeCode:string,
  Amount: number;
  Attachments: any;
  voucherdate: Date;
  DebitAmount: number;
  OffsetAccountTitle: string;
  NoOfAttachments:number
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
  DocumentTypeCode:string
  VoucherCode:number;
  NoOfAttachments:number
};
