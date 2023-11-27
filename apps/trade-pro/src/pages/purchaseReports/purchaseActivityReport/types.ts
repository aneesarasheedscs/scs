import exp from 'constants';
export type commontype = {
  ItemQty: number;
  NetWeight: number;
  ItemNetAmount: number;
  PrcntOfTotal: number;
  PrctofTotalWeight: number;
};
export type purchasebyDetail = {
  Id: number;
  InvoiceDate: Date | string;
  InvoiceNo: string;
  Type: string;
  SupplierName: string;
  ItemName: string;
  PackUom: string;

  ItemRate: number;
};
export type PurchaseByInvoicesSupplier = {
  Id: number;
  InvoiceDate: string;
  InvoiceNo: string;
  SupplierName: string;
};
export type PurchaseBySupplier = {
  SupplierName: string;
};
export type PurchaseBySupplierItem = {
  SupplierName: string;
  ItemName: string;
  PackUom: string;
};
export type PurchaseByItemCategoryItemType = {
  CategoryDescription: string;
  TypeDescription: string;
  ItemName: string;
  PackUom: string;
};
export type PurchaseByCategory = {
  CategoryDescription: string;
};
export type PurchaseByItemType = {
  TypeDescription: string;
};
export type PurchaseByPaymentTerms = {
  TermsDescription: string;
};
export type PurchaseByCategoryandPackSize = {
  CategoryDescription: string;
};
export type TSearchCritariaPurchaseActivity = {
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
