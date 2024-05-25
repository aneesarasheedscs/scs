export type TChartOfAccountCriteria = {
  Id: number;
  ChartOfAccountId: number;
  MultiLanguagesId: number;
  AccountTitle: string;
  IsApproved: boolean;
};

export type TCOAReportHistory = {
  Id: number;
  AccountId:number;
  AccountCode: number;
  AccountTitle: string;
  AccountGroup: string;
  AccountLevel: number;
  AccountClass: string;
  AccountType: string;
  NoteTitle: string;
  LanguageId: number;
  LanguageName: string;
  AccountTitleOtherLingo: string;

};
