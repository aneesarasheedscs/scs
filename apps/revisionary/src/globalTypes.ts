import { ColumnType } from 'antd/es/table/interface';

export type AntColumnType<T> = { searchableInput?: boolean } & ColumnType<T>;
export type TAppUserData = {
  loginId: string;
  campusId: number;
  appUserId: number;
  rowVersion: number;
  instituteId: number;
  appUserName: string;
  appUserLogId: number;
  createdUserId: number;
  loginPassword: string;
  organizationId: number;
  lastModifiedUserId: number;
  loginSessionKey: null;
  loginAppClientId: number;
  loginClientName: string;
  loginClientLocationName: string | null;
  loginAppClientLocationId: number;
  loginAppClientProductId: number;
  loginAppClientConnectionId: number;
  loginAppClientFiscalYearId: number;
  loginText: string;
  loginAppUserId: number;
  loginDomain: string;
  loginName: string;
  loginDatetime: Date | string;
  loginTerminal: null;
  loginAppUserLogId: number;
  isUserValidate: boolean;
  isSuperUser: boolean;
  isMultiLocationUser: boolean;
  serverDatetime: Date | string;
  // loginUserModules: loginUserModules[];
  // loginUserMenus: TLoginUserMenus[];
};
