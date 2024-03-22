export type TAccountsCombo = {
  Id: number;
  AccountTitle: string;
};
export type TDetailItem = {
  Id: number;
  PriceTypeId: number;
  PriceTypeDescription: string;
  ItemPrice: number;
  AddRate: number | null;
  LessRate: number | null;
  ItemId: number;
  ItemName: string;
  ItemUomId: number;
  Equivalent: number;
  UOMCode: string;
  RateUomId: number;
  PreviousRateUom: string;
  BaseRateUom: number | null;
  RateUom: number;
};
export type TDetailPackUom = {
  Id: number;
  ItemId: number;
  Equivalent: number;
  BaseRateUom: false;
  UOMCode: string;
  ItemName: string;
  PriceTypeId: number;
  PriceTypeDescription: string;
  ItemPrice: number;
  AddRate: number | null;
  LessRate: number | null;
  EffectedDate: Date;
  BranchName: string;
  ItemUomId: number;
  RateUomId: number;
  PreviousRateUom: string;
  RateUom: number;
};

// export type TRequisitionOrder = {
//   Id: number;
//   DocumentTypeId: number;
//   PrintPreview: boolean;
//   DocDate: string;
//   DocNo: number;
//   SourceLocationId: number; //Branch
//   DestinationLocationId: number; // Head Office
//   ReqStatus: string; // Pending
//   RemarksHeader: string;
//   OrganizationId: number;
//   CompanyId: number;
//   BranchesId: number;
//   FinancialYearId: number;
//   EntryUserId: number;
//   EntryDate: Date;
//   ModifyDate: Date;
//   ModifyUserId: number;
//   ApprovedUserId: number;
//   ApprovedDate: Date;
//   HoApprovalDate: Date;
//   IsApproved: boolean;
//   HoIsApproved: boolean;
//   HoApprovedUserId: number;
//   WsRmRequisitionPoDetailsList: TWsRmRequisitionPoDetailsList[];
// };
// export type TWsRmRequisitionPoDetailsList = {
//   Id: number;
//   ItemId: number;
//   ItemUomId: number;
//   ReqQty: number;
//   BillWeight: number;
//   StockWeight: number;
//   ReqRate: number;
//   ReqAmount: number;
//   RemarksDetail: string;
//   ActionTypeId: number;
//   // EquivalentRate: number;
//   ItemName: string;
//   ItemUomCode: string;
//   WsRmRequisitionPoId: number;
//   NetWeight: number;
//   LineId: number;
//   ItemUom: number;
//   PackUom: string;
//   PackEquivalent: number;
//   DestinationLocationId: number;
// };

export type TStockAdjustment = {
  Id: number;
  DocumentTypeId: number;
  DocDate: string;
  DocNo: number;
  RemarksHeader: string;
  AdjustmentTypeId: number;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EnteryUserId: number;
  EnteryDate: string;
  ModifyUserId: number;
  ModifyDate: string;
  ApprovalUserId: number;
  ApprovedDate: string;
  InvStockAdjustmentDetailslist: InvStockAdjustmentDetail[];
};
export type InvStockAdjustmentDetail = {
  Id: number;
  PackUom: string;
  Qty: number;
  ItemName: string;
  WarehouseId: number;
  WareHouseName: string;
  ItemId: number;
  PackUomId: number;
  NetWeight: number;
  ItemRate: number;
  RateUomId: number;
  Amount: number;
  DebitAccountId: number;
  RemarksDetail: string;
  ActionTypeId: number;
  RateUom: string;
  AccountTitle: string;
};
export type TWareHouse = {
  Id: number;
  WareHouseName: string;
};

export type TAccountTitle = {
  Id: number;
  AccountTitle: string;
};
export type TStockAdjustmentHistory = {
  Id: number;
  DocNo: number;
  DocDate: Date | string;
  VoucherHeadId: number;
  EntryType: string;
  EntryUser: string;
  EntryDate: Date;
  ModifyUser: string;
  ModifyDate: Date;
  Remarks: string;
};
