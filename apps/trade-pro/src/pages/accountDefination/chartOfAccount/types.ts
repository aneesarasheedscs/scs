export type TChartAccountData = {
  Id: number;
  PostState: string;
  ParentAcCode: string;
  ParentAcTitle: string;
  AccountCode: string;
  OtherErpCode: string;
  AccountTitle: string;
  ParentAccountCodeTitle: string;
  ParentAccountCode: string;
  AccountGroup: string;
  Account_Level: number;
  IsActive: string;
  AccountClass: number;
  AccountType: string;
  NoteTitle: string;
  ModifyDate: Date | string;
  PostDate: Date | string;
  BSNoteId: number;
  PLNoteId: number;
  FinancialYear: number;
  ModifyUser: string | number;
  OrganizationId: number;
  ParentCodeId: number;
};
export type TChartAccountAllLevelData = {
  Id: number;
  AccountTitle: string;
  AccountCode: string;
  AccountClass: number;
  AccountTypeId: number;
  AccountGroup: string;
  Account_Level: number;
  PLNoteId: number;
  BSNoteId: number;
  ParentAccountCode: number | string;
  ParentAccountTitle: string;
  AccountTitleOtherLingo: string | null;
  OtherErpCode: string;
  QrCode: null | number;
  IsActive: number;
  EntryDate: string | Date;
  EntryUser: number;
  ModifyDate: null | Date;
  ModifyUser: null | Date;
  PostDate: string | Date;
  PostUser: number;
  PostState: boolean;
  OrganizationId: number;
  CompanyId: number;
  FinancialYearId: number;
  AccountType: string;
  PLNote: null | string;
  BsNote: string;
  AccountClassName: string;
};

export type TChartAccountLeaveService = {
  Id: number;
  AccountClass: number;
  Account_Level: number;
  AccountCode: string;
  AccountType: string;
  AccountTitle: string;
  ParentCodeTitle: string;
  ParentAccountCode: number | string;
  CustomerGroupId: null;
};
export type TChartAccount = {
  Id: number;
  AccountCode: number;
  AccountTitle: string;
  AccountClass: number;
  AccountTypeId: number;
  AccountGroup: string;
  Account_Level: number;
  PLNoteId: number;
  BSNoteId: number;
  ParentAccountCode: number;
  AccountTitleOtherLingo: null;
  OtherErpCode: null;
  QrCode: null;
  IsActive: boolean;
  FinancialYearId: number;
  EntryDate: Date | string;
  EntryUser: number;
  ModifyDate: null;
  ModifyUser: null;
  PostDate: null;
  PostUser: null;
  PostState: boolean;
  OrganizationId: number;
  CompanyId: number;
};