export type TAccountReceivablesSearchCriteria = {
  OrganizationId: number;
  CompanyId: number;
  DueDateTo?: string;
  FromDocNo: number;
  ToDocNo: number;
  LanguageId: number;
  Id?: string;
  AccountIds: number;
};

export type AccountReceivables = {
  Id: number;
  AccountTitle: string;
  AccountClass: number;
  AccountIds: number;
};

export type TAccountReceivablesTable = {
  AccountCode: string;
  AccountTitle: string;
  DueDays: number;
  DueDate: string;
  DebitAmount: number;
  CreditAmount: number;
  DueAmount: number;
};
