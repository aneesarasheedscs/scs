export type TBalanceSheetSearchCritaria = {
  OrganizationId: number;
  CompanyId: number;
  FromDate: Date | null;
  ToDate: Date | string;
  Status: boolean;
};

export type TBalanceSheetData = {
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
export type TAccountsData = {
  AccountNoteId: number;
  AccountTitle: string;
  AccountType: string;
  Account_Level: number;
  AccountsNotes: string;
  Amount: number;
  ClassName: string;
  CreditAmount: number;
  DebitAmount: number;
  Id: number;
  NetProfitLoss: number;
  PLNote: string;
  ParentAccountCode: string;
};
