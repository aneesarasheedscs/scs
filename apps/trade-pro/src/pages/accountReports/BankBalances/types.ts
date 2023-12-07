export type TCashAndBankBalancesSummary = {
  AccountId: number;
  AccountCode: string;
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
  Id: number;
  DocumentTypeId: number;
  DocumentTypeSrNo: number;
  DocumentTypeCode: number;
  Vouchercode: number;
  AccountTitle: string;
  OffsetAccountTitle: string;
  ChequeNo: number;
  DebitAmount: number;
};
