export type TDiscountType = {
  Id: string;
  DiscountTypeCode: string;
  Description: string;
  EntryUser: string;
  EntryDate: Date;
  IsActive: boolean;
};

export type TDiscountTypeData = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ModifyUserId: number;
  EntryDate: Date | string;
  Id: number;
  ModifyDate: Date | string;
  DiscountTypeCode: string;
  DiscountTypeDescription: string;
  IsActive: boolean;
};
