export type ReceivablesAgingSearchCriteria = {
    CompanyId:number
    EndDate:Date
    IntervalDays:number
    FinancialYearId:number
    OrganizationId:number
}
export type ReceivablesAgingRegisterHistory = {
Id:number
AccountTitle:string
Opening:number
"1stInterval": number
"2ndInterval": number
"3rdInterval": number
IntervalAbove: number
Closing: number
}

