export type AttachmentUploaderModel = {
    Id: number;
    FolderId: number;
    Tags: string;
    ReferenceDocumentTypeId: number;
    ReferenceDocumentId: number;
    ScreenName: string;
    UploadedFileName: string;
    UploadedFileType: string;
    UploadedFileSize_Mb: number;
    UploadedFileLastModifiedDate: Date;
    UploadedFileCustomName: string;
    IsSelected: boolean;
    IsCompressed: boolean;
    CompressionPercent: number;
    CompressedFileSize_Mb: number;
    UploadUserId: number;
    UploadDate: Date;
    ModifyUserId: number;
    ModifyDate: Date;
    IsRequested: boolean;
    RequestedUserId: number;
    RequestedDate: Date;
    OrganizationId: number;
    CompanyId: number;
    BranchesId: number;
    ProjectId: number;
    FinancialYearId: number;
    ActionTypeId: number;
    AttachmentHistoryList?: Array<AttachmentUploaderModel>;
    //---------------------------
  
    UploadedFile: File;
    DisplayURL: any;
  
  }
  export type AttachmentsTotalsInfoModel= {
    Files: number ;
    Size_Mb: number ;
    Pdf_Files: number ;
    DocX_Files: number ;
    Image_Files: number ;
    Excel_Files: number ;
  }
  export const AlphabetsArray: Array<string> = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  export const NumbersArray: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  export const FileTypes = /(\.doc|\.docx|\.pdf|\.tex|\.txt|\.wpd|\.jpg|\.jpeg|\.png|\.xls|\.xlsx|\.zip)$/i;
  