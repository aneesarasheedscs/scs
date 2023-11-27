import exp from 'constants';

export type ItemAllocationTypes = {
  Id: number;
  ItemName: string;
  CompanyId: number;
  ItemId: number;
  BranchId: number;
  OrganizationId: number;
  IsActive: boolean;
};

export type TAccountAllocationFilter = {
  Id: number;
  AccountTitle: string;
  FinancialYear: number;
};

export type TaddAllocatedAccounts = {
  OrganizationId: number;
  CompanyId: number;
  BranchId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ChartofAccountId: number;
  AccountTitle: string;
  GLPageNo: string;
  IsActive: boolean;
};

export type TCompanyfilter = {
  Id: number;
  CompCode: string;
  CompName: string;
  CompContactPerson: string;
  CompEmailA: string | null;
  CompEmailB: string | null;
  CompTel: string | null;
  CompMobileA: string;
  CompMobileB: string;
  CompMobileC: string;
  CompAddress: string;
  CompReportingTitle: string;
  CompLogo: string | null;
  CompCountry: string | null;
  CompState: string | null;
  CompBaseCurr: string;
  CompType: string;
  CompLogoImage: string | null;
  OrgCompanyTypeId: number;
  PictureURL: string;
  EntryDate: string | null;
  EntryUser: string | null;
  ModifyDate: string | null;
  ModifyUser: string | null;
};
export type TItemAllocationList = {
  IsActive: boolean;
  CompanyId: number;
  ItemId: number;
  BranchId: number;
  Id: number;
  ItemName: string;
  OrganizationId: number;
};
