export type TSaveChequeStatus = {
  Id: number;
  OrganizationId: number;
  CompanyId: number;
  EntryUser: number;
  DocDate: string;
  EntryDate: string | Date;
  ModifyDate: string | Date;
  PostDate: string;
  BankId: number;
  Cheqbookdetaillist: TChequeDetail[];
};

export type TChequeDetail = {
  Id: number; // Cheque No Id To Cancel The Cheque
  OtherRemarks: string;
  CheqCancelStatus: string; // It appears to be a string in your data, you can adjust the type if it's supposed to be boolean
  StatusChangeUserId: number;
};
