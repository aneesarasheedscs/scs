export type TRequisitionOrderforApprovalHistory = {
  Id: number;
  DocNo: number;
  DocDate: Date | string;
  LocationFrom: string;
  LocationTo: string;
  RequestStatus: string;
  EntryUser: string;
  EntryDate: Date | string;
  ModifyUser: string | null;
  ModifyDate: Date | string;
  ApprovedUser: string | null;
  ApprovedDate: Date | string;
  IsApproved: string;
  RemarksHeader: string;
  CompLogoImage: string;
  EntryUserProfileImageUrl: string;
  ModifyUserProfileImageUrl: string;
  ApprovedUserProfileImageUrl: string;
};
export type TAccountsCombo = {
  Id: number;
  AccountTitle: string;
};
export type TDetailItem = {
  Id: number;
  PriceTypeId: number;
  PriceTypeDescription: string;
  ItemPrice: number;
  AddRate: number | null;
  LessRate: number | null;
  ItemId: number;
  ItemName: string;
  ItemUomId: number;
  Equivalent: number;
  UOMCode: string;
  RateUomId: number;
  PreviousRateUom: string;
  BaseRateUom: number | null;
  RateUom: number;
};
export type TDetailPackUom = {
  Id: number;
  ItemId: number;
  Equivalent: number;
  BaseRateUom: false;
  UOMCode: string;
  ItemName: string;
  PriceTypeId: number;
  PriceTypeDescription: string;
  ItemPrice: number;
  AddRate: number | null;
  LessRate: number | null;
  EffectedDate: Date;
  BranchName: string;
  ItemUomId: number;
  RateUomId: number;
  PreviousRateUom: string;
  RateUom: number;
};

export type TRequisitionOrder = {
  PrintPreview: boolean;
  Id: number;
  DocumentTypeId: number;
  DocDate: string;
  DocNo: number;
  SourceLocationId: number; //Branch
  DestinationLocationId: number; // Head Office
  ReqStatus: string; // Pending
  RemarksHeader: string;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  EntryUserId: number;
  EntryDate: Date;
  ModifyDate: Date;
  ModifyUserId: number;
  ApprovedUserId: number;
  ApprovedDate: Date;
  HoApprovalDate: Date;
  IsApproved: boolean;
  HoIsApproved: boolean;
  HoApprovedUserId: number;
  WsRmRequisitionPoDetailsList: TWsRmRequisitionPoDetailsList[];
};
export type TWsRmRequisitionPoDetailsList = {
  Id: number;
  ItemId: number;
  ItemUomId: number;
  ReqQty: number;
  BillWeight: number;
  StockWeight: number;
  ReqRate: number;
  ReqAmount: number;
  RemarksDetail: string;
  ActionTypeId: number;
  ItemName: string;
  ItemUomCode: string;
  WsRmRequisitionPoId: number;
  NetWeight: number;
  LineId: number;
  ItemUom: number;
  PackUom: string;
  PackEquivalent: number;
  ApprovedQty: number;
  DestinationLocationId: number;
};
