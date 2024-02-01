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

  ParentAccount: string;
  ParentAccountTitle: string;
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  OpeningDr: number;
  OpeningCr: number;
  Debit: number;
  Credit: number;
  Closing: number;
  ClosingDr: number;
  ClosingCr: number;
};

export type TrialBalanceSixCol = {
  ParentAccount: string;
  ParentAccountTitle: string;
  AccountId: number;
  AccountCode: string;
  AccountTitle: string;
  // Opening: number;
  OpeningDr: number;
  OpeningCr: number;
  Debit: number;
  Credit: number;
  // Closing: number;
  ClosingDr: number;
  ClosingCr: number;
};
