type StockTransferNoteRegisterHistory ={
    TransferId: number;
    TransFerDetailId: number;
    DocumentTypeId: number;
    DocumentTypeDescription: string;
    DispatchedQty:number;
    DispatchedAmount:number;
    NetAmount:number;
    DocNo: number;
    DocDate: string;
    SourceLocation: string;
    DestinationLocation: string;
    RemarksHeader: string;
    ReqStatus: string;
    IsApproved: string;
    EntryDate: string;
    EntryUser: string;
    ModifyDate: string ;
    ModifyUser: string ;
    ApprovedDate: Date ;
    ApprovedUser: string ;
    ItemType: string;
    ItemCode: string;
    ItemName: string;
    ItemUom: string;
    IssuedQty: number;
    IssuedRate: number;
    IssuedAmount: number;
    BillWeight: number;
    ExpenseAmount: number;
    ItemNetAmount: number;
    ReqOrderQty: number;
    ReqOrderWeight: number;
    ReqOrderAmount: number;
    ReceivedQty: number;
    ReceivedWeight: number;
    ReceivedAmount: number;

}

type TSearchCriteria  ={
    OrganizationId: number;
    CompanyId: number;
    FromDate: Date;
    ToDate: Date;
    FromDocNo: number;
    ToDocNo: number;
    SourceId: number;
    DestinationId: number;
    InventoryParentCategories: number;
    ItemCategoryId: number;
    ItemTypeId: number;
    ItemId: number;
    ReqTypeId: number | any;
    ReqType?: number; // Assuming ReqType is a property of the object
    IsApproved?: boolean;
    ApprovedFilter?: string;
    Activity: string;
}