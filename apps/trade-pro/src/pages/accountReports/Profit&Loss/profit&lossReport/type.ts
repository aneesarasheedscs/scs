export type TProfitLossSearchCritaria = {
  OrganizationId: number;
  CompanyId: number;
  FromDate: Date | null;
  ToDate: Date | string;
};
export type TProfitLossData = {
  Id: number;
  ParentAccountCode: string;
  AccountTitle: string;
  Account_Level: number;
  AccountType: string;
  AccountNoteId: number;
  AccountsNotes: string;
  ClassName: string;
  DebitAmount: number;
  CreditAmount: number;
  Amount: number;
  PLNote: string;
  NetProfitLoss: number;
};
