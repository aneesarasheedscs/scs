export type TSaveChequeBook = {
  Id: number;
  BankId: number;
  DocDate: Date | string;
  EntryDate: Date | string;
  ModifyDate: Date | string;
  PostDate: Date | string;
  DocNo: number;
  CbPrefix: string;
  CbSrFrom: string;
  CbSrTo: string;
  Remarks: string;
  ChartOfAccountId: number;
  CompanyId: number;
  OrganizationId: number;
  EntryUser: number;
  Cheqbookdetaillist: TCheqbookdetaillist[];
};

export type TCheqbookdetaillist = {
  CheqNo: string;
  CheqStatus: string;
  OtherRemarks: string;
};
