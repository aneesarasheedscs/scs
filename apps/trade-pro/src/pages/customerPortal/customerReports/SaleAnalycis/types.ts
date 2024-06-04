export type TSaleAnalyticsCriteria = {
  FromDate: Date | any;
  ToDate: Date;
  StartDate: Date;
  EndDate: Date;
  OrganizationId: number;
  CompanyId: number;
  Activity: string;
  Ids: number;
};

export type TpuchaseAnalyticsItemGroupCriteria = {
  FromDate: Date | any;
  ToDate: Date;
  StartDate: Date;
  EndDate: Date;
  OrganizationId: number;
  CompanyId: number;
  Activity: string;
  Ids: number;
  ItemId: number;
  SortNo: number;
};
