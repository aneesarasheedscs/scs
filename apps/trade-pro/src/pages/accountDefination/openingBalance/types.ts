export type OpeningBalanceTypes = {
  Id: number;
  AccountType: string;
  ParentAccount: string;
  AccountTitle: string;
  DebitBalance: number;
  CreditBalance: number;
};
export type OpeningBalanceCriteriaTypes = {
  Id: number;
  AccountTitle: string;
 
  YearObCredit: number;
  YearObDebit: number;
  ChartofAccountId: number
  DebitBalance: number;
  CreditBalance: number;
  BeforeDebit: number;
  BeforeCredit: number;
  AccountType: string;
  ParentAccountTitle: string;

  
};
export type TopeningBalanceHistory = {
  Id: string;
  ChartofAccountId: string;
  AccountType: string;
  ParentAccountTitle: string;
  AccountTitle: string;
  BeforeDebit: number;
  BeforeCredit: number;
  DebitBalance: number;
  CreditBalance: number;
};

export type TaddOpeningBalance = {
  Id: number;
  ChartOfAccountId: number;
  ChartOfAccountTitle: string;
  FinancialYearId: number;
  OrganizationId: number;
  CompanyId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: string;
  ModifyDate: string;
  PostDate: string;
  PostState: boolean;
  PostUser: number;
  YearObCredit: number;
  YearObDebit: number;
  Account: string
};
