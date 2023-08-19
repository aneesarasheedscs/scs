export type TSubjectCategoryData = {
    createdUser: string;
    createdOn: string | Date;
    subjectCategoryId: number;
    subjectCategoryCode: string;
    subjectCategoryDescription: string;
  };
  
  export type TSubjectCategoryFormDataOnAdd = {
    subjectCategoryCode: number;
    subjectCategoryDescription: number;
  };
  
  export type TSubjectCategoryFormDataOnUpdate = {
    rowVersion: number;
    subjectCategoryId: number;
    subjectCategoryCode: number;
    subjectCategoryDescription: number;
  };
  export type TUser = { username: string; password: string };

export type TAppUserFormData = { LoginId: string; LoginPassword: string };

export type TAppUserData = {
  loginId: string;
  campusId: number;
  appUserId: number;
  rowVersion: number;
  instituteId: number;
  appUserName: string;
  appUserLogId: number;
  createdUserId: number;
  loginPassword: string;
  organizationId: number;
  lastModifiedUserId: number;
};
export type TSyllabusAuthorityData = {
  createdUser: string;
  createdOn: string | Date;
  syllabusAuthorityId: number;
  syllabusAuthorityCode: string;
  syllabusAuthorityName: string;
};

export type TSyllabusAuthorityFormDataOnAdd = {
  syllabusAuthorityCode: number;
  syllabusAuthorityName: number;
};

export type TSyllabusAuthorityFormDataOnUpdate = {
  rowVersion: number;
  syllabusAuthorityId: number;
  syllabusAuthorityCode: number;
  syllabusAuthorityName: number;
};
// Table 
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
