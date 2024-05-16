export type ReceivablesAgingSearchCriteria = {
  CompanyId: number;
  FinancialYearId: number;
  OrganizationId: number;
  UserId: number;
  ToDate: Date | string | any;
  AgingDays: number;
  AccountClassId: number;
  Activity: string;
  ReportTypeId: number;
};
export type ReceivablesAgingRegisterHistory = {
  RNo: number;
  StartDate: string;
  AsOnDate: string;
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  '0_10': number;
  '11_20': number;
  '21_30': number;
  '30_Above': number;
  Closing: number;
  IstIntervale: number;
  ScnInterval: number;
  TrdIntarval: number;
  Above: number;
  FirstIntervalCaption: number;
  SecondIntervalCaption: number;
  ThirdIntervalCaption: number;
  AboveIntervalCaption: number;
  CompCountry: string | null;
  CompContactPerson: string;
  CompMobileA: string;
  CompMobileB: string;
  CompMobileC: string;
  CompEmailA: string | null;
  CompEmailB: string | null;
  CompLogoImage: string | null;
  ReportCriteria: string;
};
