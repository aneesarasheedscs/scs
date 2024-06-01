export type TFilters = {
  FromDate: Date;
  ToDate: Date;
};

export type TItem = {
  ItemName: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TCustomer = {
  CustomerName: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TItemPacks = {
  PackUom: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TPackItem = {
  ItemName: string;
  Qty: number;
  Weight: number;
  Amount: number;
  PackUom: string;
};

export type TDeliveryInTransit = {
  RNo: number;
  Id: number;
  DocDate: string;
  DocNo: number;
  SupplierCustomerId: number;
  CustomerName: string;
  GpNo: number;
  VehicleNo: string;
  DriverName: string | null;
  DriverCellNo: string;
  CarriageAmount: number;
  InTime: string;
  OutTime: string | Date;
  ItemQty: number;
  NetWeight: number;
  GdnStatus: string;
  CustomerRemarks: string | null;
  EntryDate: string;
  EntryUser: string;
  ModifyDate: string | null;
  ModifyUser: string | null;
};

export type TSalesBill = {
  Id: number;
  DocumentTypeId: number;
  DocDate: string;
  DocNo: number;
  SupplierCustomerId: number;
  CustomerName: string;
  TermsDescription: string | null;
  DueDate: string;
  DueDays: number;
  ItemQty: number;
  ItemWeight: number;
  OrderNos: string;
  OrderDates: string;
  BillAmount: number;
  EntryDate: string;
  EntryUser: string;
  ModifyDate: string | null;
  ModifyUser: string | null;
  ApprovedDate: string | null;
  ApprovedUser: string | null;
  ApprovedStatus: string;
};
