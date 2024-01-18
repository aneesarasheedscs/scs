export type TAccountDashboardCriteria = {
  FromDate?: Date;
  ToDate?: Date;
  CompanyIds?: string;
  ReqType?: string;
  DateType?:string;

};

export type TBankBalancesSummary = {
  Id: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;
};

export type TBankBalances = {
  Id: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;
  voucherdate: Date;
  DebitAmount: number;
  fillteredTableData: number;
  length: any;
};
export type TBankPayment = {
  Id: number;
  AccountTitle: string;
  Opening: number;
  CurrDebit: number;
  CurrCredit: number;
  Closing: number;
  voucherdate: Date;
  DebitAmount: number;
};
export type TAddFollowUp = {
  Id: number; // 0 for Insert, other values for Update
  CompanyId: number;
  OrganizationId: number;
  ChartOfAccountId: number;
  FollowupDate: string; // You may want to use a Date type instead
  NextFollowupDays: number; //
  PromiseDate: string; //
  CommentsDate: string; //
  CommentsDetail: string; //
};
