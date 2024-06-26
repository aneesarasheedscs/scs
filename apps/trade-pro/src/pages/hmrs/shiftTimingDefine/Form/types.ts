import { boolean, number } from 'joi';

export type TDefineItemData = {
  ApplyExciese: boolean;
  ApplyGST: boolean;
  ApplyVAT: boolean;
  ItemStatus: boolean;
  OtherTax: boolean;
  PostState: boolean;
  EntryDate: string | Date;
  ModifyDate: string | Date;
  PostDate: string | Date;
  CostPrice: number;
  MaxStockLevel: number;
  OptimalStockLevel: number;
  MinStockLevel: number;
  PackQty: number;
  PurchasePrice: number;
  ReorderLevel: number;
  RetailPrice: number;
  WholeSalePrice: number;
  BaseUnitId: number;
  BranchesId: number;
  BuyerSupplierId: number;
  COGSGLAC: number;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  ItemCategoryId: number;
  ItemClassId: number;
  ItemTypeId: number;
  ManufactureId: number;
  ModifyUser: number;
  OrganizationId: number;
  PostUser: number;
  ProjectsId: number;
  PurchaseGLAC: number;
  SaleGLAC: number;
  DepreciationExpenseAcId: number;
  accumulatedDepreciationAcId: number;
  CapitalWipAcId: number;
  UOMScheduleIdCostRate: number;
  UOMScheduleIdPurRate: number;
  UOMScheduleIdRetailRate: number;
  UOMScheduleIdWhsRate: number;
  AmountCalcType: string | null;
  BaseCropYear: string | null;
  BuyerPartNo: string | null;
  HSCode: string | null;
  ItemCode: string;
  ItemName: string;
  ManufacturePartNo: string | null;
  Pic1: string | null;
  Pic2: string | null;
  ProductNo: string | null;
  BarcodeImage: string | null;
  BarcodeNo: string;
  ProductType: string | null;
  ItemOriginId: number;
  BaseRateUnitId: number;
  ItemAliasName: string;
  ItemSpecification: string | null;
  UomLookUpId: number;
  MasterItemId: number;
  PurchaseTypeLookUpId: number;
  IsExpirable: boolean;
  IsDiscountable: boolean;
  IsTaxable: boolean;
  ShelfLife: number;
  SaleTaxPurPercent: number;
  AtRetailPriceTax: boolean;
  AtPurcahsePriceTax: boolean;
  SaleTaxSalesPercent: number;
  TaxTypeId: number;
  ItemGroupId: number;
  Equivalent: number;
  RateEquivalent: number;
  AttachmentsList: any | null;
  ItemAllocationlist: any[];
};

export type TDefineItemDataOnAdd = {
  RecordNo: number;
  Id: number;
  ItemCode: string;
  ItemName: string;
  BaseUnitId: number;
  ItemCategoryId: number;
  ItemTypeId: number;
  ItemClassId: number;
  PurchaseGLAC: number;
  SaleGLAC: number;
  COGSGLAC: number;
  HSCode: string;
  PackQty: number;
  ItemStatus: boolean;
  ManufactureId: number;
  ManufacturePartNo: string;
  BuyerSupplierId: number;
  BuyerPartNo: string;
  ProductNo: null | any;
  MinStockLevel: number;
  OptimalStockLevel: number;
  MaxStockLevel: number;
  ReorderLevel: number;
  ItemOriginId: number;
  CostPrice: number;
  UOMScheduleIdCostRate: number;
  PurchasePrice: number;
  UOMScheduleIdPurRate: number;
  RetailPrice: number;
  UOMScheduleIdRetailRate: number;
  WholeSalePrice: number;
  UOMScheduleIdWhsRate: number;
  AmountCalcType: null | any;
  BarcodeImage: string;
  BarcodeNo: string;
  BaseCropYear: string;
  ApplyGST: boolean;
  ApplyVAT: boolean;
  ApplyExciese: boolean;
  OtherTax: boolean;
  Pic1: null | any;
  Pic2: string;
  PostDate: string;
  PostUser: number;
  PostState: boolean;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  ProjectsId: number;
  GlStockAccountTitle: string;
  GlSaleAccountTitle: string;
  GlCgsAccountTitle: string;
  CategoryDescription: string;
  TypeDescription: string;
  UOMCode: string;
  InvParentCateDescription: string;
  ClassGroupName: string;
  ProductType: null | any;
  MasterItemId: number;
  ItemSpecification: string;
  UomLookUpId: number;
  ItemAliasName: string;
  PurchaseTypeLookUpId: number;
  IsExpirable: boolean;
  ShelfLife: number;
  IsDiscountable: boolean;
  SaleTaxPurPercent: number;
  AtRetailPriceTax: boolean;
  AtPurcahsePriceTax: boolean;
  SaleTaxSalesPercent: number;
  IsTaxable: boolean;
  DepreciationExpenseAcId: number;
  accumulatedDepreciationAcId: number;
  CapitalWipAcId: number;
  EntryUserName: string;
  EntryUserId: number;
  EntryDate: string;
  ModifyUserName: string;
  ModifyUser: number;
  ModifyDate: string;
  EntryUserProfileImage: null | any;
  MoidifyUserProfileImage: null | any;
  NoOfAttachments: number;
};

export type TDefineItemDataOnSave = {
  ApplyExciese: boolean;
  ApplyGST: boolean;
  ApplyVAT: boolean;
  ItemStatus: boolean;
  OtherTax: boolean;
  PostState: boolean;
  EntryDate: string;
  ModifyDate: string;
  PostDate: string;
  CostPrice: number;
  MaxStockLevel: number;
  OptimalStockLevel: number;
  MinStockLevel: number;
  PackQty: number;
  PurchasePrice: number;
  ReorderLevel: number;
  RetailPrice: number;
  WholeSalePrice: number;
  BaseUnitId: number;
  BranchesId: number;
  BuyerSupplierId: number;
  COGSGLAC: number;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  ItemCategoryId: number;
  ItemClassId: number;
  ItemTypeId: number;
  ManufactureId: number;
  ModifyUser: number;
  OrganizationId: number;
  PostUser: number;
  ProjectsId: number;
  PurchaseGLAC: number;
  SaleGLAC: number;
  DepreciationExpenseAcId: number;
  accumulatedDepreciationAcId: number;
  CapitalWipAcId: number;
  UOMScheduleIdCostRate: number;
  UOMScheduleIdPurRate: number;
  UOMScheduleIdRetailRate: number;
  UOMScheduleIdWhsRate: number;
  AmountCalcType: string | null;
  BaseCropYear: string | null;
  BuyerPartNo: string | null;
  HSCode: string | null;
  ItemCode: string;
  ItemName: string;
  ManufacturePartNo: string | null;
  Pic1: string | null;
  Pic2: string | null;
  ProductNo: string | null;
  BarcodeImage: string | null;
  BarcodeNo: string;
  ProductType: string | null;
  ItemOriginId: number;
  BaseRateUnitId: number;
  ItemAliasName: string;
  ItemSpecification: string | null;
  UomLookUpId: number;
  MasterItemId: number;
  PurchaseTypeLookUpId: number;
  IsExpirable: boolean;
  IsDiscountable: boolean;
  IsTaxable: boolean;
  ShelfLife: number;
  SaleTaxPurPercent: number;
  AtRetailPriceTax: boolean;
  AtPurcahsePriceTax: boolean;
  SaleTaxSalesPercent: number;
  TaxTypeId: number;
  ItemGroupId: number;
  Equivalent: number;
  RateEquivalent: number;
  AttachmentsList: any[] | null;
  ItemAllocationlist: TItemAllocationlist[];
};
export type TItemAllocationlist = {
  IsActive: boolean;
  BranchId: number;
  CompanyId: number;
  OrganizationId: string;
};

export type TDefineItemDataonUpdate = {
  rowVersion: number;
  ItemStatus: boolean;
  EntryDate: string | Date;
  ModifyDate: string | Date;
  PostDate: string | Date;
  PackQty: number;
  PurchasePrice: number;
  WholeSalePrice: number;
  BaseUnitId: number;
  BranchesId: number;
  COGSGLAC: number;
  CompanyId: number;
  EntryUser: number;
  Id: number;
  ItemCategoryId: number;
  ItemClassId: number;
  ItemTypeId: number;
  OrganizationId: number;
  PurchaseGLAC: number;
  SaleGLAC: number;
  UOMScheduleIdCostRate: number;
  UOMScheduleIdPurRate: number;
  UOMScheduleIdRetailRate: number;
  UOMScheduleIdWhsRate: number;
  HSCode: string | null;
  ItemCode: string;
  ItemName: string;
  Pic1: string | null;
  Pic2: string | null;
  ProductNo: string | null;
  BarcodeImage: string | null;
  BarcodeNo: string;
  ItemAliasName: string;
  ItemSpecification: string | null;
  ItemAllocationlist: any | null;
};
export type TItemCode = {
  ItemCode: number;
};

export type TDetailItem = {
  Id: number;
  UOMCode: string;
  ItemName: string;
  ItemUomId: number;
  Equivalent: number;
};
