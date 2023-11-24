export type TGRNDetailTable = {
  Id: number;
  DocumentTypeId: number;
  DocDate: Date;
  DocNo: number;
  SupplierName: string;
  DeliveryTerm: string;
  GpSrNo: number;
  VehicleNo: string;
  BiltyNo: string;
  FactoryWeight: number;
  PartyWeight: number;
  DiffWeight: number;
  TransporterName: string | null;
  FreightAmount: number;
  RemarksHeader: string;
  EntryDate: Date;
  EntryUser: string;
};

export type TGRNDetailTableHistory = {
  GrnId: number;
  GrnDetailId: number;
  DocumentTypeId: number;
  GrnDate: Date;
  GrnNo: number;
  OrderId: number;
  OrderNo: number;
  OrderDate: Date;
  SupplierCustomerId: number;
  SupplierName: string;
  ItemId: string;
  ItemName: string;
  WareHouseName: string;
  JobLot: string;
  BaseUom: string;
  ItemQty: number;
  NetBillWeight: number;
  PartyWeight: number;
  FactoryWeight: number;
  DiffWeight: number;
  GpNo: string;
  BiltyNo: string;
  VehicleNo: string;
  Transporter: string;
  Freight: number;
  CityName: string;
  Remarks: string;
};
export type TGRNSearchCriteria = {
  ToDocNo?: number;
  FromDocNo?: number;
  ToDate?: Date | string;
  FromDate?: Date | string;
  SupplierCustomerId?: number;
  ItemId: number;
  WarehouseId: number;
  JobLotId: number;
  AreaCity: string;
};
