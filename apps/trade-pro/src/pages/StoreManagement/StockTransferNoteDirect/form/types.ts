export type TStockTransferNoteDetailEntry = {
  ItemId: number;
  ItemQty: number;
  IssuedQty: number;
  StockWeight: number;
  IssuedRate: number;
  IssuedAmount: number;
  RemarksDetail: string;
  Id: number;
  UOMCode: number;
  WareHouseName: string;
  ItemName: string;
  BillWeight: number;
  ExpenseAmount: number;
  ItemNetAmount: number;
};

export type DocumentInfo = {
  Id: number;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  DocumentTypeId: number;
  EntryDate: string;
  EntryUserId: number;
  ModifyDate: string;
  ModifyUserId: number;
  ApprovedDate: string;
  ApprovedUserId: number;
  DocNo: number;
  DocDate: string;
  SourceLocationId: number;
  DestinationLocationId: number;
  ReqStatus: number;
  RemarksHeader: string;
  WsRmStockTransferNotesDetailsList: StockTransferDetail[];
  WsRmStockTransferNotesExpensesList: StockTransferExpense[];
};

export type StockTransferDetail = {
  Id: number;
  LineId: number;
  WarehouseId: number;
  ItemId: number;
  ItemUomId: number;
  IssuedQty: number;
  BillWeight: number;
  StockWeight: number;
  IssuedRate: number;
  IssuedAmount: number;
  ExpenseAmount: number;
  ItemNetAmount: number;
  RemarksDetail: string;
  ActionTypeId: number;
  UOMCode: number;
  ItemName: string;
  NetWeight: number;
  ItemQty: number;
  WareHouseName: string;
  PackEquivalent: number;
  BalQty: number;
  BalWeight: number;
  totalValue: number;
  Amount: number;
};

export type StockTransferExpense = {
  ItemId: number;
  Qty: number;
  Rate: number;
  Amount: number;
  Remarks: string;
  OtherItemName: string;
};

export type TWareHouseAndItemOnChange = {
  OrganizationId: number;
  CompanyId: number;
  DocDate: string;
  ItemId: number;
  WarehouseId: number;
  stockUOM: number;
};

export type TDetailItem = {
  Id: number;
  UOMCode: number;
  ItemUomId: number;
  Equivalent: number;
  ItemName: string;
  IssuedRate: number;
};

export type TCompanyData = {
  Id: number;
  ERPFeatures: string;
};

export type TFifoAvgRate = {
  OrganizationId: number;
  CompanyId: number;
  DocDate: string;
  ItemId: number;
  WarehouseId: number;
  stockUOM: number;
  ItemQty: number;
  NetWeight: number;
  RateEqvailent: number;
  DocumentTypeId?: number;
  Id?: number;
};

export type TAvgRate = {
  Id: number;
  ItemId: number;
  ItemUomId: number;
  WareHouseId: number;
  itemQty: number | string | null;
  RateEqvailent: number;
  NetWeight: number;
};

export type TSourceAndDestination = {
  Id: number;
  CompName: string;
};
