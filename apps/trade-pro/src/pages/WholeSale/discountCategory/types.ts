export type TDiscountCategory = {
  Id: string;
  EntryUser: string;
  EntryDate: Date;
  IsActive: boolean;
  DiscountCategory: string;
  Percentage: number;
};

export type TDiscountCategoryData = {
  Id: string;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ModifyUserId: number;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  DiscountItemName: string;
  DiscPerncentage: string;
  IsActive: boolean;
};
