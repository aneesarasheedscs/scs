export type Tpayables = {
  lvl03_Title: string;
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  Debit: number;
  Credit:number;
  Closing: number;
  LastBillDate: Date;
  LastBillAmount: number;
  BillDays: number;
  LastPaidAmount: number;
  PaidDays: number;
  CityName: string;
  MobilePersonal: number;
  Title: string;
  LastBillsAmount:number;
  LastRcvdAmount:number;
  RcvdDays:number;
  
};
export type Treceivable = {
  AccountTitle3rd: string;
  AccountId: number;
  AccountCode: number;
  AccountTitle: string;
  Opening: number;
  Debit: number;
  Closing: number;
  LastBillDate: Date;
  LastBillAmount: number;
  RcvdDays: number;
  CityName: string;
  MobilePersonal: number;
  Title: string;
  lvl03_Title:string;
  LastBillsAmount:number;
  Credit:number;
  LastRcvdAmount:number
};

export type TAddFollowUp = {
  Id: number; // 0 for Insert, other values for Update
  CompanyId: number;
  OrganizationId: number;
  ChartOfAccountId: number;
  FollowupDate: Date | string; // You may want to use a Date type instead
  NextFollowupDays: number; //
  PromiseDate: string; //
  CommentsDate: string; //
  CommentsDetail: string; //
};

export type TPayablesReceivablesCriteria = {
  FromDate?: Date;
  ToDate?: Date;
  BalanceFrom: number;
  BalanceTo: number;
  CityId: number;
  Status: string;
  CustomGroupId: number;
  IsApproved: boolean;
  ReportTypeId: number;
  ApprovedFilter: string;
  //=================== Extra For Logic
  DateType: number;
  OnlyCreditAmountAction: boolean;
  OnlyDebitAmountAction: boolean;
};

export type TFollowUp = {
  AccountTitle: string;
  FollowUpDate: Date;
  NFDays: number;
  PromiseDate: Date;
  CommentDetail: string;
};
