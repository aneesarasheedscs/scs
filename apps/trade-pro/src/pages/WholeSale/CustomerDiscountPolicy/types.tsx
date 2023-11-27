export type TCustomerDiscountPolicyHistory = {
  Id: number;
  EffectedDate: Date | string;
  CustomerId: string;
  CustomerName: string;
  DiscountType: string;
  DiscountItem: string;
  DiscountRate: number;
  IsActive: string | boolean;
  'Discount%': string;
};

export type TSaveCustomerDiscountPolicy = {
  CustomerDiscountPolicieslist: CustomerDiscountPolicieslist[];
};
export type CustomerDiscountPolicieslist = {
  Id: number;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  CustomerId: number;
  EffectiveDate: Date | string;
  DiscountType: string | 'Percent';
  DiscountTypeId: number;
  DiscountItemId: number;
  DiscountRate: number;
  IsActive: boolean;
};

export type AllocateDiscountTable = {
  Id: string;
  DiscountItemId: string;
  DiscountCategory: string;
  DiscountTypeId: string;
  DiscountType: string;
  EntryUser: string;
  EntryDate: Date | string;
  IsActive: string | Boolean;
};

export type TSaveCustomerAllocateDiscountPolicy = {
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  ModifyUserId: number;
  EntryDate: string;
  ModifyDate: string;
  DiscountItemId: number;
  DiscountTypeId: number;
  IsActive: boolean;
};
