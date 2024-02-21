export type SaleOrderRetailCriteria = {
  FromDate: Date;
  ToDate: Date;
  FromDocNo: number;
  ToDocNo: number;
  SupplierCustomerId: number;
  ItemId: number;
  InventoryParentCategories: number;
  ItemCategoryId: number;
  ItemTypeId: number;
  Status: string;
  DocumentTypeId:number;
  ApprovedFilter: string;
  IsApproved: boolean;
};

export type SaleOrderHistory = {
  DocDate: Date;
  DocNo: number;
  DueDays: number ;
  DueDate: number | string | Date;
  CustomerName: string;
  CommissionAgent: string;
  OrderSupCustId: number;
  OrderItemId: number;
  SaleGLAC: string;
  DeliveryTerm: string;
  ItemName: string;
  PackUom: string;
  ItemQty: number;
  DispatchQty: number;
  BalQty: number;
  Weight: number;
  DispatchWeight: number;
  BalWeight: number;
  Rate: number;
  ExpiryDate: Date;
  NoOfAttachments:number
};
