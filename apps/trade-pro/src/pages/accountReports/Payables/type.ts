export type PayablesSearchCriteria = {
    OrganizationId: number
    CompanyId: number
    FinancialYearId: number
    FromDate: Date
    ToDate: Date
    AccountId: number
    FromDocNo: number
    ToDocNo: number
    Status: string
}
export type PayablesReportHistory = {
    AccountId: string
    AccountTitle: string
    AccountClass: string
    AccountTypeId: number
    AccountGroup: string
    ObDebit: number
    ObCredit: number
    CurrDebit: number
    CurrCredit: number
    ClDebit: number
    OrganizationId: number
    CompanyId: number
    FinancialYearId: number
    CityName: number
    DecimalPointsAmount: number
}
