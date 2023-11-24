export type PayablesAgingSearchCriteria = {
    OrganizationId: number
    CompanyId: number
    FinancialYearId: number
    AgingDays:number
    IntervalDays:number
    EndDate:Date
}
export type PayablesAgingRegisterHistory = {
    AccountId:number
    AccountTitle:string
    Col_01:number
    Col_02:number
    Col_03:number
    Col_04:number
    Col_05:number
    Value_01:number
    Value_02:number
    Value_03:number
    Value_04:number
    Value_05:number
}