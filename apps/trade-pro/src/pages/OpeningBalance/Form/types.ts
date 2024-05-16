export type TAccountOpeningBalance = {
  Id: number;
  ChartOfAccountId: number;
  ChartOfAccountTitle: string;
  FinancialYearId: number;
  OrganizationId: number;
  CompanyId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: Date;
  ModifyDate: Date;
  PostDate: Date;
  PostState: boolean;
  PostUser: number;
  YearObCredit: number;
  YearObDebit: number;
};

export type TAccountOpeningBalanceList = {
  OrganizationId: 2;
  CompanyId: 2;
  FinancialYearId: 2;
  OpeningBalanceList: TAccountOpeningBalanceList[];
};
export type TOpeningBalance = {
  Id: number;
  ChartOfAccountId: number;
  ChartOfAccountTitle: string;
  FinancialYearId: number;
  OrganizationId: number;
  CompanyId: number;
  EntryUser: number;
  ModifyUser: number;
  EntryDate: Date;
  ModifyDate: Date;
  PostDate: Date;
  PostState: boolean;
  PostUser: number;
  YearObCredit: number;
  YearObDebit: number;
};
