export type TrialBalanceSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  LanguageId: number;
  FromDate: Date;
  ToDate: Date;
  ApprovedFilter: string;
  IsApproved: boolean;
  ZeroBalanceType: number;
  Debit: number;
  Credit: number;
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
