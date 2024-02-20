export type TInventryReportHistory = {
  DocId: number;
  DocumentTypeId: number;
  DocumentType: string;
  DocDate: string | Date;
  DocNo: number;
  WareHouse: string;
  JobLot: string;
  ItemId: string;
  ItemCode: number;
  ItemName: string;
  BaseUom: string;
  QtyIn: number;
  QtyOut: number;
  BalQty: number;
  WeightIn: number;
  WeightOut: number;
  BalWeight: number;
};

export type TInventryReportSearchCriteria = {
  FromDate: string;
  ToDate: string;
  ItemId: number;
  WarehouseId: number;
  SupplierCustomerId: number;
  DocumentTypeId: number;
};

export type InventoryReport = {
  ActivityType: string;
  Id: number;
  name: string;
};
