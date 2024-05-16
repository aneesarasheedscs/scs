export type PayablesAgingSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  AgingDays: number;

  ToDate: Date;
  UserId: number;
  AccouuntClassId: number;
  Activity: string;
};
export type PayablesAgingRegisterHistory = {
  AccountId: number;
  AccountTitle: string;
  RNo: number;
  StartDate: Date;
  AsOnDate: Date;
  AccountCode: string;
  Opening: number;
  '0_30': number;
  '31_60': number;
  '61_90': number;
  '90_Above': number;
  Closing: number;
  IstIntervale: number;
  ScnInterval: number;
  TrdIntarval: number;
  Above: number;
  FirstIntervalCaption: string;
  SecondIntervalCaption: string;
  ThirdIntervalCaption: string;
  AboveIntervalCaption: string;
  ReportCriteria: string;
};
