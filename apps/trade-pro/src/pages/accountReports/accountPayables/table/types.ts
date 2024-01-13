export type TAccountPayablesSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  Ids: string;
  Id: number;
  DueDateFrom?: string;
  DueDateTo?: string;
  FromDocNo: number;
  ToDocNo: number;
  LanguageId: number;
  ActionId: number;
  SelectedIds: string;
  SelectedAccountIds: string;
  AccountIdss: string;
};

type ReportCriteria = {
  DueDateTo: string;
  Group: string;
};

export type TAccountPayablesTable = {
  ReportCriteria: ReportCriteria;
  AccountId: string;
  AccountCode: string;
  AccountTitle: string;
  OtherLanguageTitle: string;
  DueDays: number;
  DueDate: string;
  DebitAmount: number;
  CreditAmount: number;
  DueAmount: number;
};

export type TAccountPayablesBetweenPeriodSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  DueDateFrom: string;
  DueDateTo: string;
  Ids: string;
  FromDocNo: number;
  ToDocNo: number;
  SelectedIds: string;
  LanguageId: number;
  ActionId: number;
  SelectedAccountIds: string;
};

export type ReportCriteriaBetweenPeriod = {
  DueDateFrom: string;
  DueDateTo: string;
  Group: string;
};

export type TAccountPayablesBetweenPeriodTable = {
  ReportCriteria: ReportCriteriaBetweenPeriod;
  AccountId: string;
  AccountCode: string;
  AccountTitle: string;
  Opening: number;
  Debit: number;
  Credit: number;

  // OtherLanguageTitle: string;
  // DueDays: number;
  // DueDate: string;
  // DebitAmount: number;
  // CreditAmount: number;
  // DueAmount: number;
};
