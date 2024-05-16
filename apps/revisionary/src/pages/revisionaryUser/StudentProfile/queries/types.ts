interface TStudentProfile {
  rowVersion: number;
  createdUserId: number;
  lastModifiedUserId: number;
  appUserLogId: number;
  studentProfileId: number;
  registrationNo: string;
  registrationDate: Date | number | string;
  studentCode: string;
  studentName: string;
  studentFatherName: string;
  classId: number;
  classSubDivisionId: number;
  examinationBoardId: number;
  organizationId: number;
  instituteId: number;
  campusId: number;
}
