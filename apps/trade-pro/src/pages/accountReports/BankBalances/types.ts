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

export type TPaymentReceipt = {
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
