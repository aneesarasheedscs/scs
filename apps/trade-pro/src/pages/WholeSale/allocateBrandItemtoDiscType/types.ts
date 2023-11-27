export type TAllocateBrandItemToDiscType = {
  Id: number;
  BrandItemId: string;
  BrandName: string;
  DiscountTypeId: string;
  DiscountType: string;
  EntryUser: string;
  EntryDate: Date | string;
  IsActive: boolean;
};

export type TAllocateBrandItemToDiscTypeData = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ModifyUserId: number;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  BrandItemId: number;
  DiscountTypeId: number;
  IsActive: boolean;
};
