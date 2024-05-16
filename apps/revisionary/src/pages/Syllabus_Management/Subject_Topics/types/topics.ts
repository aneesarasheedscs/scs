export type TTopicsData = {
  unitTopicId: number;
  unitTopicNo: string;
  subjectName: string;
  classSubDivision: string;
  unitTopicDescription: string;
};

export type TTopicFormDataOnAdd = {
  unitTopicNo: number;
  unitTopicDescription: string;
  classesSubDivisionId: number;
  rowVersion: number;
  unitTopicId: number;
  subjectListId: number;
};

export type TTopicFormDataOnUpdate = {
  rowVersion: number;
  unitTopicId: number;
  unitTopicNo: string;
  unitTopicDescription: string;
  classesSubDivisionId: number;
  subjectListId: number;
};
export type TSubjectTopics = {
  ClassId: number;
  OrganizationId: number;
  InstitueId: number;
  CampusId: number;
  ClassSubDivisionId: number;
  LoginId: string;
  LoginAppClientId: number;
  LoginAppClientLocationId: number;
  LoginAppClientConnectionId: number;
  LoginAppUserId: number;
  LoginAppUserLogId: number;
  LoginAppClientProductId: number;
};
