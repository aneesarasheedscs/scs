export type TStockTransferNoteDirectTable = {
  Id: string;
  DocNo: number;
  DocDate: string;
  LocationFrom: string;
  LocationTo: string;
  RequestStatus: string;
  IssuedQty: number;
  IssuedAmount: number;
  ReceivedNo: null | string;
  ReceivedDate: string;
  IsReffered: string;
  EntryUser: string;
  RemarksHeader: string;
};

export type TStockTransferNoteDirectHistory = {
  DocumentTypeId: number;
  OrganizationId: number;
  CompanyId: number;
  BranchesId: number;
  FinancialYearId: number;
  CanViewAllRecord: boolean;
  EntryUser?: number;
  NoOfRecords: number;
  ApprovedFilter: string;
};
export type Twarehouse = {
  Id: number;
  WareHouseName: string;
};
