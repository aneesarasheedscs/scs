export type TrialBalanceAllLevelSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  LanguageId: number;
  FromDate: Date;
  ToDate: Date;
  AccountLevel:number;
  DateType: number;
};

export type TrialBalanceHistory = {

  ParentAccount: number;
  ParentAccountTitle: number;
  AccountId: number;
  AccountCode: number;
  AccountTitle: number;
  Opening: number;
  OpeningDr: number;
  OpeningCr: number;
  Debit: number;
  Credit: number;
  Closing: number;
  ClosingDr: number;
  ClosingCr: number;
};

export type TtrialBalanceSelectedSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  GroupAccountId: number;
  FromDate: string;
  ToDate: string;
  CityId: number;
  IsApproved: boolean;
  ActionId: number;
};

export type TtrialBalanceAllLevel = {
  RowId: number
  Id: number;
  AccountType:string;
  AccountTitle: string;
  AccountCode: number;
  AccountLevel: number;
  IsGroupDetail: string;
  Opening: number;
  Debit: number;
  Credit: number;
  Closing: number;
  AccountId: number;
  OpeningCr:number
  OpeningDr:number
  ClosingCr:number;
  ClosingDr:number
  AcLevel:number
  CreditDr:number
};