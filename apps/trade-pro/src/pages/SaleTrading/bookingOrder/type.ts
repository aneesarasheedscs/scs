export type TDetailItem = {
  Id: number;
  UOMCode: string;
  ItemName: string;
  ItemUomId: number;
  Equivalent: number;
};

export type TPriceItem = {
  RecordNo: number;
  Id: number;
  ScheduleDesc: null | string;
  PriceTypeId: number;
  PriceTypeDescription: string;
  ItemPrice: number;
  AddRate: number;
  LessRate: number;
  EffectedDate: string;
  ItemId: number;
  ItemName: string;
  BranchName: string;
  ItemUomId: number;
  Equivalent: number;
  UOMCode: string;
  RateUomId: number;
  PreviousRateUom: string;
  BaseRateUom: null;
  RateUom: number;
};

export type TSaleOrderForm = {
  ItemName: string;
  PackUom: string | number;
  QTY: number;
  Weight: number;
  Rate: number;
  RateUOM: number | string;
  Amount: number;
  Remarks: '';
};

export type TPriceSchedule = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  PriceTypeId: number;
  ItemIds: number;
  DocDate: Date;
  SelectedIds: string;
  SelectedItemIds: string;
};

export type THistoryCriteria = {
  DocumentTypeId: number;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  CanViewAllRecord: boolean;
  EntryUser: number;
  FromDate: Date;
  ToDate: Date;
  FromDocNo: number;
  ToDocNo: number;
  SupplierCustomerId: number;
};

export type TBookingOrderHistory = {
  RecordNo: 3;
  Id: number;
  DocNo: number;
  DocDate: Date;
  CustomerName: string;
  CommissionType: string;
  CommRate: string;
  CommAmount: number;
  ItemAmountHeader: number;
  DiscountAmountHeader: number;
  TaxAmountHeader: number;
  OrderAmount: number;
  OrderQty: number;
  OrderWeight: number;
  CommissionRemarks: '';
  DueDays: number;
  DueDate: Date;
  OrderExpiryDate: Date;
  IsAproved: boolean;
  DeliveryTerm: string;
  DeliveryDays: number;
  RemarksHeader: string;
  OrderStatus: string;
  TermsDescription: string;
  UserName: string;
  EntryDate: Date;
  ModifyUserName: string;
  ModifyDate: Date;
  ApprovedUser: number;
  PostDate: Date;
  NoOfAttachments: string;
};

export type TBookingOrder = {
  DocumentTypeId: number;
  DocDate: Date;

  DocNo: number;
  OrderCatagoryId: number;
  CatagorySrNo: number;
  OrderSupCustId: number; // SupplierCustomerId
  SupplierRefNo: number;
  RemarksHeader: string;
  PaymentTermsId: number;
  OrderDueDays: number;
  OrderDueDate: Date;
  OrderExpiryDate: Date;
  DeliveryTerm: string;
  DeliveryStartDate: Date;
  DeliveryDays: number;
  // Commission Agent Fields
  BrokerAgentSupCustId: number;
  CommissionType: string;
  CommRate: number;
  UomScheduleIdCmRate: number;
  CommAmount: number;
  CommissionRemarks: string;
  //========================
  OrderStatus: string;
  OrderType: string;
  EntryDate: Date;
  ModifyDate: Date;
  // ====>>>>> Detail
  PreBookingOrderDetailList: TPreBookingOrderDetailList[];
};
export type TPreBookingOrderDetailList = {
  Id: number;
  ActionTypeId: number; // insert 1 and update 2
  PriceScheduleId: number;
  RateDiscount: number;
  ItemPrice: number;
  OrderItemId: number;
  PackingTypeID: number;
  OrderItemUOMId: number;
  OrderItemQty: number;
  NetWeight: number;
  OrderItemRate: number;
  OrderItemRateUOMId: number;
  PackingAddLessOnRate: number;
  ItemDiscount: number;
  ItemDiscountAmount: number;
  TotalAmount: number;
  Amount: number;
  CityArea: string;
  CityId: number;
  Crop: string;
  ReferencePartyId: number;
  OrderRemarks: string;
  CommOnSale: number;
};
// Model Of Sale Order

export type TRateUomCombo = {
  Id: number;
  ItemId: number;
  ItemName: string;
  Equivalent: number;
  UOMCode: string;
  BaseRateUom: number;
  ScheduleUnitName: string;
};
