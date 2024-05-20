import exp from 'constants';

// export type TSaleOrder2 = {
//   DueDate: Date;
//   IsAproved: boolean;
//   PostState: boolean;
//   DeliveryStartDate: Date;
//   DocDate: Date;
//   EntryDate: Date;
//   ModifyDate: Date;
//   OrderDueDate: Date;
//   OrderExpiryDate: Date;
//   PostDate: Date | null;
//   CommAmount: number;
//   CommRate: number;
//   ActionId: number;
//   BranchesId: number;
//   BrokerAgentSupCustId: number;
//   CatagorySrNo: number;
//   CompanyId: number;
//   DeliveryDays: number;
//   DocNo: number;
//   DocumentTypeId: number;
//   EntryUser: number;
//   Id: number;
//   ModifyUser: number;
//   NoOfCntnr: number;
//   OrderCatagoryId: number;
//   OrderDueDays: number;
//   OrderSupCustId: number;
//   OrganizationId: number;
//   PaymentTermsId: number;
//   PfiScId: number;
//   PostUser: number;
//   ProjectsId: number;
//   RefrenenceParty: number;
//   SupplierCustomerIdStockParty: number;
//   UomScheduleIdCmRate: number;
//   FinancialYearId: number;
//   ShiptoAddress: number;
//   SubPartyId: number;
//   CommissionRemarks: string;
//   CommissionType: string;
//   DeliveryRemarks: string;
//   DeliveryTerm: string;
//   ExportInvoiceNo: string;
//   ExportLotRef: string;
//   ExportOrderNo: string;
//   OrderStatus: string;
//   OrderType: string;
//   OrderTaxable: string;
//   RemarksHeader: string;
//   SupplierRefNo: string;
//   SaleOrderDetailList: TSaleOrderDetail2[];
//   // AttachmentsList: DMSAttachment[];
// };
// export type TSaleOrderDetail2 = {
//   Amount: number;
//   BagPrice: number;
//   BagWeight: number;
//   NetWeight: number;
//   OrderItemQty: number;
//   OrderItemRate: number;
//   RetailRate: number;
//   TaxAmount: number;
//   TaxPercent: number;
//   RateAddLess: number;
//   RateWithouAdLs: number;
//   Id: number;
//   JobLotId: number;
//   OrderItemId: number;
//   OrderItemRateUOMId: number;
//   OrderItemUOMId: number;
//   SaleOrderId: number;
//   TaxNameId: number;
//   CityId: number;
//   ActionTypeId: number;
//   AmountCalcType: string;
//   CityArea: string;
//   Crop: string;
//   LabSampleNo: string;
//   OrderRemarks: string;
//   TaxableStatus: string;
//   ItemName: string;
//   TaxName: string;
//   UOMDescription: number;
//   UOMCode: string; //base uom
//   RateUom: string; // rate uom
//   JobLotDescription: string;
//   EquivalentRate: number;
//   ItemPrice: number;
//   Remarks: string;
//   NetRate: number;
//   DiscRate: number;
//   ItemPriceSchudleId: string | Date;
//   ItemId: number;
//   AddLess: number;
//   SaleOrderDetailList: TSaleOrderDetail[];
// };



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

export type TPaymentTerms = {
  Id: number;
  CompanyId: number;
  TermsCode: string;
  PostDate: Date | null;
  EntryDate: Date | null;
  OrganizationId: number;
  ModifyDate: Date | null;
  TermsDescription: string;
  PostState: string | null;
  PostUser: number | string | null;
  EntryUser: number | string | null;
  ModifyUser: number | string | null;
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
export type TSaleOrderForm2 = {};
interface Status {
  All: -1;
  Pending: 0;
  Approved: 1;
}
export type TSaleOrder = {
  Status: Status;
  IsAproved: boolean;
  PostState: boolean;
  DeliveryStartDate: Date;
  DocDate: Date;
  EntryDate: Date;
  ModifyDate: Date;
  OrderDueDate: Date;
  OrderExpiryDate: Date;
  PostDate: Date | null;
  CommAmount: number;
  CommRate: number;
  ActionId: number;
  BranchesId: number;
  BrokerAgentSupCustId: number;
  CatagorySrNo: number;
  CompanyId: number;
  DeliveryDays: number;
  DocNo: number;
  DocumentTypeId: number;
  EntryUser: number;
  Id: number;
  ModifyUser: number;
  NoOfCntnr: number;
  OrderCatagoryId: number;
  OrderDueDays: number;
  OrderSupCustId: number;
  OrganizationId: number;
  PaymentTermsId: number;
  PfiScId: number;
  PostUser: number;
  ProjectsId: number;
  RefrenenceParty: number;
  SupplierCustomerIdStockParty: number;
  UomScheduleIdCmRate: number;
  FinancialYearId: number;
  ShiptoAddress: number;
  SubPartyId: number;
  CommissionRemarks: string;
  CommissionType: string;
  DeliveryRemarks: string;
  DeliveryTerm: string;
  ExportInvoiceNo: string;
  ExportLotRef: string;
  ExportOrderNo: string;
  OrderStatus: string;
  OrderType: string;
  OrderTaxable: string;
  RemarksHeader: string;
  SupplierRefNo: string;
  SaleOrderDetailList: TSaleOrderDetail[];
  AttachmentsList: any[];
};
export type TSaleOrderDetail = {
  Amount: number;
  BagPrice: number;
  BagWeight: number;
  NetWeight: number;
  OrderItemQty: number;
  OrderItemRate: number;
  RetailRate: number;
  TaxAmount: number;
  TaxPercent: number;
  RateAddLess: number;
  RateWithouAdLs: number;
  Id: number;
  JobLotId: number;
  OrderItemId: number;
  OrderItemRateUOMId: number;
  OrderItemUOMId: number;
  SaleOrderId: number;
  TaxNameId: number;
  CityId: number;
  ActionTypeId: number;
  AmountCalcType: string;
  CityArea: string;
  Crop: string;
  LabSampleNo: string;
  OrderRemarks: string;
  TaxableStatus: string;
  ItemName: string;
  TaxName: string;
  UOMDescription: string;
  UOMCode: number;
  RateUom: string;
  RateUomNo: number;
  JobLotDescription: string;
  EquivalentRate: number;
  ItemPriceSchudleId: number;
  DiscRate: number;
};

export type TsaleOrderHistory ={
  Id: number;
  OrderNo: number;
  BaseUom: string;
  ItemName: string;
  OrderQty: number;
  BalWeight: number;
  ItemRate: number;
  BalanceQty: number;
  OrderWeight: number;
  ReceivedQty: number;
  SupplierName: string;
  DeliveryTerm: string;
  OrderSupCustId: number;
  ReceivedWeight: number;
  ItemId: string | number;
  OrderDate: Date | string;
  ApprovedBy: string | null;
  ApprovedDate: Date | string;
  PurchaseGLAC: number | string;
  OrderExpiryDate: Date | string;
  ReportCriteria: string;
  PoDetailId: number;
  SupplierCustomerId: number;
  PaymentTerm: string;
  DueDays: number;
  DueDate: Date | string;
  DeliveryStartDate: Date | string;
  DeliveryDays: number;
  RateUom: string;
  OrderAmount: number;
  ReceivedAmount: number;
  BalAmount: number;
  EntryUser: string;
  EntryDate: Date | string;
  ModifyUser: string;
  ModifyDate: Date | string;
  ApprovalUser: string;
  OrderStatus: string;
  ApprovedStatus: string;
}


export type TRateUomCombo = {
  Id: number;
  ItemId: number;
  ItemName: string;
  Equivalent: number;
  UOMCode: string;
  BaseRateUom: number;

  ScheduleUnitName: string;
};
