export interface TJobLotHistory {
  jobType: string;
  JobLotCode: string | number;
  JobLotDescription: string | number;
  StartDate: string | Date;
  EndDate: string | Date;
  JobStatus: string;
  EntryUser: number;
  EntryDate: string | Date;
  ModifyUser: null | number;
  ModifyDate: string | Date;
  Id: number;
}
export interface TDefineJobLotOnAdd {
  Id: number;
  IsApproved: boolean;
  PostState: boolean;
  StartDate: string;
  EntryDate: string;
  EntryUser: number;
  ModifyDate: string;
  ModifyUser: number;
  EndDate: string;
  OrganizationId: number;
  CompanyId: number;
  JobLotCode: string;
  JobLotDescription: string;
  JobTypeId: number;
  JobStatus: string;
}
