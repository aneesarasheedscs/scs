export type TActivitySummary = {
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  Closing: number;
  Debit: number;
  Credit: number;
};

export type Tfilter = {
  FromDate?: Date;
  ToDate?: Date;
  ApprovedFilter: string;
  IsApproved: boolean;
};
