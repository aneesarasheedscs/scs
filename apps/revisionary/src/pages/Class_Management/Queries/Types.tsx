import ClassDivision from '../ClassDivision/ClassDivision';
// Class
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
//  ClassDivision
export type TClassDivisionData = {
  className: string;
  classSubDivisionId: number;
  divisionDescription: string;
  classSubDivisionCode: string;
};

export type TClassDivisionFormDataOnAdd = {
  classId: number;
  classSubDivisionCode: string;
  effectiveFrom: Date | string;
  classSubDivisionDescription: string;
};

export type TClassDivisionFormDataOnUpdate = {
  classId: number;
  rowVersion: number;
  classSubDivisionId: number;
  classSubDivisionCode: string;
  effectiveFrom: Date | string;
  classSubDivisionDescription: string;
};
