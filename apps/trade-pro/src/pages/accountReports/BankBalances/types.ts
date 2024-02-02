export type TCashAndBankBalancesSummary = {
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;

  SupplierName: any;
  AccountDescription: string;
};

export type TPaymentReceipt = {
  TranType: string;
  voucherdate: Date;
  vouchercode:number,
  Id: number;
  DocumentTypeId: number;
  DocumentTypeSrNo: number;
  DocumentTypeCode: string;
  Vouchercode: number;
  AccountTitle: string;
  OffsetAccountTitle: string;
  ChequeNo: number;
  DebitAmount: number;
};
