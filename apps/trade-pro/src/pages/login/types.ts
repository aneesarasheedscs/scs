export type TUser = { username: string; password: string };

export type TLoggedInUserDetail = {
  CellNo: string;
  RoleName: string;
  UserName: string;
  TokenData: string;
  PictureURL: string;
  expires_in: number;
  token_type: string;
  CompanyName: string;
  DisplayName: string;
  LastLoggedIn: string;
  access_token: string;
  CompanyAddress: string;
  RoleId: string | number;
  UserId: string | number;
  '.issued': string | Date;
  OrganizationName: string;
  '.expires': string | Date;
  CompanyId: string | number;
  IsActive: boolean | string;
  OrganizationId: number | string;
  AuthenticationEnabledForUser: string | number;
};
