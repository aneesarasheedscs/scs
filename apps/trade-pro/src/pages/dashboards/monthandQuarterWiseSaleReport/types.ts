export type TMonthandQuarterWiseSaleReport = {
  OrganizationId: number;
  CompanyIds: string | null;
  ToDate?: Date | string;
  FromDate?: Date | string;
  InventoryParentCategories?: number;
  ItemClassGroupId: number;
};
export type TMonthlySaleReport = {
  ActivityDescription: string;
  SalesMonth: string | Date;
  CurrSaleAmount: number;
  PrcntOfTotal: number;
  'Curr-Prv_Diff': number;
  PrcntOfPrvMonth: number;
  TotalSales: number;
};
export type TQuarterlySaleReport = {
  ActivityDescription: string;
  YearNo: number;
  QuarterNo: number;
  QuarterStartDate: string | Date;
  QuarterEndDate: string | Date;
  CurrSaleAmount: number;
  PrcntOfTotal: number;
  'Curr-Prv_Diff': number;
  PrcntOfPrvQuarter: number;
  TotalSales: number;
};
