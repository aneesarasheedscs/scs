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

export type TtrialBalanceSelectedHistory = {
  Id: number;
  ClassName: string;
  AcLevel: number;
  AccountType: string;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  Debit: number;
  Credit: number;
  Closing: number;
  AccountId: number;
  OpeningDr:number;
  OpeningCr:number;
  ClosingCr:number;
  ClosingDr:number
};
