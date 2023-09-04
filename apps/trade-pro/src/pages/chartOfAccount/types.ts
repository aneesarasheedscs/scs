export type TChartAccountData = {
  Id: number;
  ParentAcCode: string;
  ParentAcTitle: string;
  AccountCode: string;
  OtherErpCode: string;
  AccountTitle: string;
  AccountGroup: string;
  Account_Level: number;
  IsActive: string;
  AccountClass: string;
  AccountType: string;
  NoteTitle: string;
  AccountClassName: string;
};

export type TChartAccount = {
  Id: number;
  AccountClass: number;
  AccountGroup: string;
  Account_Level: number;
  AccountCode: string;
  AccountType: string;
  CompanyId: string;
  PLNote: string;
  BsNote: string;
  AccountTitle: string;
  AccountClassName: string;
};
export type child_account = {
  key: React.Key;
  Sr: number;
  Title: string;
  Action: any;
};
