export type TStockReportsSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  ItemId?: number;
  ToDate?: Date | string;
  FromDate?: Date | string;
  InventoryParentCategories?: number;
  ItemCategoryId: number;
  ItemClassGroupId: number;
  ItemTypeId: number;
  WarehouseId: number;
  Activity: string;
  ActionId: number;
  StockAccountId: string;
};

export type TStockReportDetail = {
  AccountId: string;
  AccountTitle: string;
  ItemId: number;
  ItemName: string;
  OpQty: number;
  QtyIn: number;
  QtyOut: number;
  BalQty: number;
  OpWeight: number;
  WeightIn: number;
  WeightOut: number;
  BalWeight: number;
  OpAmount: number;
  AmountIn: number;
  AmountOut: number;
  BalAmount: number;
};
