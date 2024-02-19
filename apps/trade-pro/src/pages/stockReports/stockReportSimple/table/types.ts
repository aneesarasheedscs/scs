export type TStockReportTable = {
  ItemId: string;
  ItemName: string;
  PackUom: number;
  TotalQty: number;
  OpWeight: number;
  WeightIn: number;
  WeightOut: number;
  BalWeight: number;
};

export type TStockReportSearchCriteria = {
  FromDate?: string | Date;
  ToDate?: string | Date;
  ParentCategoryId: number;
  ItemCategoryId: number;
  ItemTypeId: number;
  ItemId: number;
  WarehouseId: number;
  Activity: string;
  stockUOM: number;
  RateUOM: number;
};

export type StockReport = {
  ActivityType: string;
  Id: number;
  name: string;
};
