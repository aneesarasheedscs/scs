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

  TrakingNo: string;
  VoucherTypeId: number;
  BankName: string;
  RepresentativeAcId: number;
  RepresentativeAc: string;
  SenderAcId: number;
  SenderAc: string;
  ReceiverAcId: number;
  ReceiverAc: string;
  Remarks: string;
  Status: string;
  SenderPartyId: number;
};

export type TAccountsPrematureReceiptsHistory = {
  Id: number;
  DocDate: Date;
  DocNo: number;
  TrakingNo: number;
  Amount: number;
  BankName: string;
  SenderAccount: string;
  RecieverAccount: string;
  ChequeNo: string;
  ChequeDate: Date;
  RemarksHeader: string;
  EntryStatus: string;
  RepresentativeAc: string;
  NoOfAttachments: number;
};

export type TAccountsPrematureReceiptsSearchCriteria = {
  FromDate: Date | string;
  ToDate: Date | string;
  DocumentTypeId: number;
  RepresentativeAcId: number;
  ReceiverAcId: number;
  SenderAcId: number;
  VoucherTypeId: number;
  VouchersId: number;
};
