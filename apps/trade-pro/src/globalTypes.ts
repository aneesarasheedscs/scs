import { ColumnType } from 'antd/es/table/interface';

export type AntColumnType<T> = {
  isNumber?: boolean;
  showTotal?: boolean;
  showAverage?: boolean;
  showCount?: boolean;
  searchableDate?: boolean;
  searchableInput?: boolean;
  hidden?: boolean;
} & ColumnType<T>;

export type TUserDetail = {
  CellNo: string;
  RoleId: number;
  UserId: number;
  RoleName: string;
  UserName: string;
  CompanyId: number;
  TokenData: string;
  BranchesId: number;
  PictureURL: string;
  expires_in: number;
  token_type: string;
  CompanyName: string;
  DisplayName: string;
  LastLoggedIn: string;
  access_token: string;
  CompanyAddress: string;
  OrganizationId: number;
  OrganizationName: string;
  SupplierCustomerId:number;
  '.issued': Date | string;
  '.expires': Date | string;
  IsActive: string | boolean;
  AuthenticationEnabledForUser: number | string;
  IsHeadOffice: boolean;

  PartyGlAccountId: number;

  SupplierCustomerId: number;
};

export type TFinancialYear = {
  Id: number;
  Status: boolean;
  PostUser: number;
  CompanyId: number;
  EntryUser: number;
  ModifyUser: number;
  PostState: boolean;
  OrganizationId: number;
  PostDate: Date | string;
  EntryDate: Date | string;
  End_Period: Date | string;
  FinancialYearCode: string;
  ModifyDate: Date | string;
  Start_Period: Date | string;
};
