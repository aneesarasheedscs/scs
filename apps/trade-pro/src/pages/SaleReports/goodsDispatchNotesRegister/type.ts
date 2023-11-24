export type gdnRegisterCriteria ={
    OrganizationId:number
    CompanyId:number
    DocumentTypeId:number
    FromDate:Date
    ToDate:Date
    FromDocNo:number
    ToDocNo:number
    SupplierCustomerId:number
}

export type gdnRegisterHistory ={
GdnId:number
DocDate:Date
DocNo:number
SaleOrderId:number
SaleOrderDate:Date
SaleOrderNo:number
CustomerName:string
TransporterName:string
ItemName:string
PackUom:string
ItemQty:number
ShortWeight:number
StockWeight:number
NetBillWeight:number
WareHouse:string
JobLot:string
VehicleNo:number|string
BiltyNo:number
EntryDate:Date
EntryUser:string
ModifyDate:Date
ModifyUser:string
NoOfAttachments:string

}