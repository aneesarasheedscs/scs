export type TSalesDashboardCriteria = {
  OrganizationId: number;
  CompanyIds: string;
  BranchIds: string;
  FromDate: string | Date;
  ToDate: string | Date;
};
