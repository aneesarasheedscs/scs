export type TSalesReportsByActivity ={
  SaleQty: number;
  SaleWeight: number;
  SaleRate: number;
  SaleAmount: number;
  CgsRate: number;
  CgsAmount: number;
  GrossProfitLoss: number;
  PrcntOfTotal: number;
  PrctofTotalWeight: number;
  Id: number;
  InvoiceDate: Date | string;
  InvoiceNo: number;
  ItemName: string;
  PackUom: string;
  Customer:string
  CategoryDescription: string;
  TypeDescription: string;
  PaymentTerm: string;
  WareHouseName: string;
  Category: string;
  PurchaseQty:number
  BalQty:number
  AvgRate:number  
};

export type TSearchCritariaSaleActivity = {
  OrganizationId: number;
  CompanyId: number;
  FromDate: Date | string;
  ToDate: Date | string;
  FromDocNo: number;
  ToDocNo: number;
  ItemClassGroupId: number;
  ItemTypeId: number;
  ParentCategoryId: number;
  ItemCategoryId: number;
  ItemId: number;
  SupplierCustomerId: number;
  DocumentTypeId: number;
  PaymentTermId: number;
  ReportType: string;
};

