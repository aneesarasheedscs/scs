export type TBankPaymentVoucherTable = {
    Id: string;
    VoucherCode: string;
    DocumentTypeId: string;
    DocumentTypeCode: string;
    VoucherDate: string | Date;
    ManualBillNo: string | null;
    AccountTitle: string;
    Remarks: string;
    VoucherAmount: number;
    UserName: string;
    CheqNo: string ;
}