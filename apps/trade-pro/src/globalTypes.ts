import { ColumnType } from 'antd/es/table/interface';

export type AntColumnType<T> = {
  searchableDate?: boolean;
  searchableInput?: boolean;
} & ColumnType<T>;

export type TUserDetail = {
  CellNo: string;
  RoleId: number;
  UserId: number;
  RoleName: string;
  UserName: string;
  CompanyId: number;
  TokenData: string;
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
  '.issued': Date | string;
  '.expires': Date | string;
  IsActive: string | boolean;
  AuthenticationEnabledForUser: number | string;
};
