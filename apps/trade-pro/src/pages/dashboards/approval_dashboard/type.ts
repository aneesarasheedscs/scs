export type Voucher = {
  key: React.Key;
  Id: number;
  DocumentTypeCode: string;
  VoucherCode: number;
  VoucherDate: Date;
  AccountTitle: string;
  VoucherAmount: number;
  ChequeNo: number;
  ChequeDate: Date;
  UserName: string;
  EntryDate: Date;
  ModifyUser: string;
  ModifyDate: Date;
  Remarks: string;
  Status: string;
  ActionId: any;
  PayTitle: string;
  IsApproved: boolean;
  NoOfAttachments: number;
};

export type VoucherApprovalHistory = {
  RecordNo: number;
  VoucherHeadId: number;
  DocumentTypeId: number;
  DocumentType: string;
  DocumentTypeDescriptio: string;
  VoucherCode: number;
  VoucherDate: Date;
  RefAccountId: number;
  HeaderAccountTitle: string;
  VoucherAmount: number;
  PayTitle: string;
  ChequeNo: number;
  ChequeDate: Date;
  ActionTypeId: boolean;
  IsApproved: boolean;
  EntryUserName: string;
  EntryDate: Date;
  Remarks: string;
  ModifyUserName: string;
  ModifyDate: Date;
};

export type VoucherDetailHistory = {
  AgainstAccountId: number;
  AccountId: number;
  CreditAmount: number;
  DebitAmount: number;
  AccountTitle: string;
  OffsetAccount: string;
  Comments: string;
};

export type CashInHand = {
  AccountTitle: string;
  OffsetAccount: string;
  Comments: string;
  DebitAmount: number;
  CreditAmount: number;
  AccountId: number;
  AgainstAccountId: number;
};

export type SaleOrder = {
  DocNo: number;
  DocDate: Date;
  SupplierName: string;
  Category: any;
  PaymentTerm: any;
  DeliveryTerm: any;
  DueDate: Date;
  CommissionAgent: any;
  CommissionAmount: number;
  BrokeryAmount: number;
  EntryUser: string;
  EntryDate: Date;
  Action: any;
  BrokerAgent: any;
  ModifyDate: Date;
  OrderStatus: any;
};
export type SaleOrderCard = {
  ItemName: string;
  Qty: number;
  UOM: number;
  NetWeight: number;
  Rate: number;
  RateUOM: number;
  Amount: number;
};
export type EmptyBags = {
  Item: any;
  Rate: number;
  WtCut: number;
};
export type SaleInvoice = {
  ItemName: string;
  WareHouse: string;
  Qty: number;
  UOM: number;
  NetWeight: number;
  Rate: number;
  Amount: number;
};
export type ChargeToProduct = {
  Account: string;
  Remarks: string;
  Amount: number;
};

export type VouchersModernHistory = {
  IsChecked: boolean;
  IsSelected: boolean;
  VoucherHistoryHeader: VouchersHistory_Header;
  VoucherHistoryDetail: VoucherHistory_Detail[];
};

export type VouchersHistory_Header = {
  VoucherHeadId: number;
  DocumentTypeId: number;
  DocumentTypeDescription: string;
  DocumentType: string;
  VoucherCode: number;
  VoucherDate: Date;
  RefDocNoId: number;
  RefAccountId: number;
  HeaderAccountTitle: string;
  PayTitle: string;
  ChequeNo: string;
  ChequeDate: Date;
  Remarks: string;
  AttachmentsCount: number;
  EntryUserName: string;
  EntryUser: number;
  EntryDate: Date;
  ModifyUserName: string;
  ModifyUser: number;
  ModifyDate: Date;
  ApprovalUserName: string;
  PostUser: number;
  PostDate: Date;
  EntryUserProfileImageUrl: string;
  ModifyUserProfileImageUrl: string;
  ApprovalUserProfileImageUrl: string;
  //====================================================
  Wht_AgainstAccount: string;
  Wht_Account: string;
  IsApproved: boolean;
  IncludeWHT: boolean;
  TaxType: string;
  TaxPercent: number;
  TaxAmount: number;
  VoucherAmount: number;
};

export type VoucherHistory_Detail = {
  IsDetailExpanded: boolean;
  VoucherDetailId: number;
  VoucherHeadId: number;
  DetailAccountId: number;
  DetailAccountTitle: string;
  AgainstAccountId: number;
  OffsetAccountTitle: string;
  DebitAmount: number;
  CreditAmount: number;
  Job_Lot: string;
  Comments: string;
  IsTaxable: string;
  TaxType: string;
  TaxPrcnt: number;
  TaxesTotalAmount: number;
};
