export type TSubjectListData = {
    isActive: string;
    className: string;
    campusName: string;
    subjectCode: number;
    subjectName: string;
    createdUser: string;
    subjectListId: number;
    instituteName: string;
    subjectCategory: string;
    createdOn: string | Date;
    syllabusAuthorityName: string;
  };
  
  export type TSubjectListFormDataOnAdd = {
    classId: number;
    subjectCode: string;
    subjectName: string;
    subjectCategoryId: number;
    syllabusAuthorityId: number;
  };
  
  export type TSubjectListFormDataOnUpdate = {
    rowVersion: number;
    appUserLogId: number;
    createdUserId: number;
    subjectCategoryId: number;
    lastModifiedUserId: number;
    subjectCategoryCode: number;
    subjectCategoryDescription: number;
  };