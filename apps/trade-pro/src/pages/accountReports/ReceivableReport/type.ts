export type ReceivableReportTypeCriteria = {
  FromDate?: Date;
  ToDate?: Date;
  FromDocNo?: number;
  ToDocNo?: number;
  OrganizationId?: number;
  CompanyId?: number;
  FinancialYearId?: number;
  AccountId?: number;
  CityId?: number;
  CustomGroupId: number;
  Status: string;
};

export type ReceivableReportTypeHistory = {
  Id: number;
  AccountId: number;
  AccountTitle: string;
  AccountCode: number;
  ObDebit: number;
  ObCredit: number;
  ClDebit: number;
  CurrDebit: number;
  CurrCredit: number;
  Opening: number;
  BillDays: number;
  LastBillDate: Date;
  LastRcvdAmount: number;
  LastBillsAmount: number;
  LastRcvdDate: Date;
  RcvdDays: number;
  CityName: string;
  MobilePersonal: number;
  FollowUpDate: number;
  PromiseDate: number;
  // CompLogoImage: any;
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

export type TFollowUp = {
  AccountTitle: string;
  FollowUpDate: Date;
  NFDays: number;
  PromiseDate: Date;
  CommentDetail: string;
};