import dayjs, { Dayjs } from 'dayjs';
export type TSearchCriteriaSalesComparison = {
  OrganizationId: number;
  CompanyIds: string | null;
  ToDate?: Date | string;
  FromDate?: Date | string;
  NoOfRecords: number;
  ParentCategoryId?: number;
  ItemTypeId: number;
  ApprovedFilter: string;
};
export type TSalesComparisonforCustomer = {
  RecordNo: number;
  DescriptionTitle: string;
  GroupTitle: string;
  SaleQty: number;
  SaleWeight: number;
  SaleAmount: number;
  '%OfTopBottom': number;
  '%OfTotal': number;
  GrandTotal: number;
};
export type TSalesComparisonforItem = {
  RecordNo: number;
  DescriptionTitle: string;
  GroupTitle: string;
  SaleQty: number;
  SaleWeight: number;
  SaleAmount: number;
  '%OfTopBottom': number;
  '%OfTotal': number;
  GrandTotal: number;
};
export type TSalesComparisonforCities = {
  RecordNo: number;
  DescriptionTitle: string;
  GroupTitle: string;
  SaleQty: number;
  SaleWeight: number;
  SaleAmount: number;
  '%OfTopBottom': number;
  '%OfTotal': number;
  GrandTotal: number;
};
export type TSalesComparisonforPackingSize = {
  RecordNo: number;
  DescriptionTitle: string;
  GroupTitle: string;
  SaleQty: number;
  SaleWeight: number;
  SaleAmount: number;
  '%OfTopBottom': number;
  '%OfTotal': number;
  GrandTotal: number;
};
