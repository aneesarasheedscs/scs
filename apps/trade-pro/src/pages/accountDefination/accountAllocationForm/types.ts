import exp from 'constants';



export type TAccountAllocationFilter = {
  Id: number;
  AccountTitle: string;
  FinancialYear: number;
};



export type AccountAllocationTypes = {
  OrganizationId: number;
  CompanyId: number;
  BranchId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ChartofAccountId: number;
  AccountTitle: string;
  GLPageNo: string;
  IsActive: boolean;
  Id: number;
  DocumentTypeId: number;
  AccountTypeId: number;
};
export type TaddAllocatedAccounts = {
  OrganizationId: number; // user account OrganizationId
  CompanyId: number; // Selected Company
  BranchId: number; // User account BranchId
  FinancialYearId: number; // Selected Financial Id
  EntryUserId: number; // User account Id
  ChartofAccountId: number; // From Grid
  AccountTitle: string; // From Grid
  GLPageNo: string; // Empty
  IsActive: boolean; // tick
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
};
export type TAddCOAAllocation = {
  IsActive: boolean;
  ChartofAccountId: number;
  CompanyId: number;
  Id: number;
  BranchId: number;
  GLPageNo: string;
  AccountTitle: string;
  OrganizationId: number;
  DocumentTypeId: number;
  AccountTypeId: number;
  EntryUserId: number;
  FinancialYearId: number;
  COAAllocationlist: TAddCOAAllocationList[];
};
export type TAddCOAAllocationList = {
  IsActive: boolean;
  ChartofAccountId: number;
  CompanyId: number;
  Id: number;
  BranchId: number;
  GLPageNo: string;
  AccountTitle: string;
  OrganizationId: number;
  DocumentTypeId: number;
  AccountTypeId: number;
  EntryUserId: number;
  FinancialYearId: number;
};