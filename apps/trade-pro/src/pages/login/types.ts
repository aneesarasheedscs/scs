export type TUser = { username: string; password: string };

export type TCompanyBranchDetail = {
  BranchId: number;
  CompanyId: number;
  FinancialYearId: number;
};

export type Company = {
  CompanyId: number;
  CompName: string;
  IsHeadOffice: boolean;
};
