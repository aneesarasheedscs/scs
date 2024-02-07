import exp from 'constants';

export type TtrialBalanceAllLevel = {
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
};
//trial balance
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
export type TtrialBalanceSelectedSearchCriteria = {
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
};
