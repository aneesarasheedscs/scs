interface TClassSyllabus {
  classSubDivisionId: string;
  classSyllabusId: number;
  syllabusAuthorityId: number;
  classId: number;
  subjectListId: number;
  organizationId: number;
  instituteId: number;
  campusId: number;
  effectiveFrom: string;
  createdOn: string;
  createdUserId: number;
  lastModifiedOn: string;
  lastModifiedUserId: number;
  rowVersion: number;
  appActionId: number;
  appUserLogId: number;
}
interface SaveClassSyllabusData {
  lst: any[]; // Replace 'any[]' with the actual type of your class syllabus data
  // Add other fields if necessary
}
