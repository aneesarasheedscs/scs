export type TTopicsData = {
    unitTopicId: number;
    unitTopicNo: string;
    subjectName: string;
    classSubDivision: string;
    unitTopicDescription: string;
  };
  
  export type TTopicFormDataOnAdd = {
    unitTopicNo: string;
    unitTopicDescription: string;
    classesSubDivisionId: number;
  };
  
  export type TTopicFormDataOnUpdate = {
    rowVersion: number;
    unitTopicId: number;
    unitTopicNo: string;
    unitTopicDescription: string;
    classesSubDivisionId: number;
  };
  