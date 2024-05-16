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
  