export type TAllocateDiscCategoryToDiscTypeHistory = {
  Id: string;
  DiscountItemId: string;
  DiscountCategory: string;
  DiscountTypeId: string;
  DiscountType: string;
  EntryUser: string;
  EntryDate: string;
  IsActive: boolean;
};

export type TAllocateDiscCategoryToDiscTypeData = {
  Id: string;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ModifyUserId: number;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  DiscountItemId: number;
  DiscountTypeId: number;
  IsActive: boolean;
};
