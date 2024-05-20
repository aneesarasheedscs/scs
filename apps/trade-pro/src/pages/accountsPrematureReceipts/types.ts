export type TAccountsPrematureReceiptsList = {
  DocumentTypeId: number;
  Id: number; // insert 0  and in update gretaer than 0
  DocNo: number;
  DocDate: Date;
  TrackingSlipRef: string;
  VoucherType: string;
  SlipAmount: number;
  VouchersId: number; // Selected Voucher Type
  BankId: number; // Selected Sender Bank
  SupplierCustomerIdSalesMan: number; // Selected RepresentativeAcId"
  ChartOfAccountIdSender: number; //"SenderAcId"
  ChartOfAccountIdReceiver: number; //"ReceiverAcId"
  ChequeNo: string;
  ChequeDate: string;
  Amount: number;
  RemarksHeader: string;
  EntryStatus: string; // always Send Pending
  RepresentativeAccount: string;
  ReceiverAccount: string;
  SenderAccount: string;
  SenderBank: string;
};
