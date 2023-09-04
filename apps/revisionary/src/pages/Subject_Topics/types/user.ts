export type TUser = { username: string; password: string };

export type TAppUserFormData = { LoginId: string; LoginPassword: string };

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
};