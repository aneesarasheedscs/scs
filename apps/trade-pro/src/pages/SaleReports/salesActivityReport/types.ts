import exp from 'constants';
export type commontype = {
  SaleQty: number;
  SaleWeight: number;
  SaleRate: number;
  SaleAmount: number;
  CgsRate: number;
  CgsAmount: number;
  GrossProfitLoss: number;
  PrcntOfTotal: number;
  PrctofTotalWeight: number;
};
export type TsaleByDetail = {
  Id: number;
  InvoiceDate: Date | string;
  InvoiceNo: string;
  ItemName: string;
  PackUom: string;
};
export type TSalesByInvoices = {
  Id: number;
  InvoiceDate: string;
  InvoiceNo: string;
};
export type TSalesByCustomer = {
  Customer: string;
  PackUom: string;
};
export type TSalesByCustomerandItem = {
  Customer: string;
  ItemName: string;
  PackUom: string;
};
export type TSalesByCustomerItemAndInvoice = {
  Id: number;
  InvoiceDate: Date | string;
  InvoiceNo: string;
  ItemName: string;
  PackUom: string;
};
export type TSalesByItemCategoryandItemType = {
  CategoryDescription: string;
  TypeDescription: string;
  ItemName: string;
  PackUom: string;
};
export type TSalesByCategory = {
  CategoryDescription: string;
};
export type TSalesByItemType = {
  TypeDescription: string;
};
export type TSalesByPaymentTerm = {
  PaymentTerm: string;
};
export type TSalesByCategoryAndPackSize = {
  CategoryDescription: string;
};
export type TItemPurchaseAndSaleSummary = {
  WareHouseName: string;
  Category: string;
  ItemName: string;
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
export type AccountAllocationTypes = {
  OrganizationId: number;
  CompanyId: number;
  BranchId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ChartofAccountId: number;
  AccountTitle: string;
  GLPageNo: string;
  IsActive: boolean;
  Id: number;
  DocumentTypeId: number;
  AccountTypeId: number;
};
