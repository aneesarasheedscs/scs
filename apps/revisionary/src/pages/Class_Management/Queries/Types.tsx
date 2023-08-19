export type TClassData = {
    classId: number;
    classCode: string;
    className: string;
    campusName: string;
    createdUser: string;
    instituteName: string;
    organizationName: string;
    createdOn: string | Date;
  };
  
  export type TClassFormDataOnAdd = {
    classCode: string;
    className: string;
  };
  
  export type TClassFormDataOnUpdate = {
    classId: number;
    classCode: string;
    className: string;
    rowVersion: number;
  };
  