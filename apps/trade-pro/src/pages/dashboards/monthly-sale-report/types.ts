import dayjs, { Dayjs } from 'dayjs';
export type TMonthlySaleReportCriteria = {
  OrganizationId: number;
  CompanyIds: string | null;
  BranchIds: string | null;
  FromDate: string | Dayjs;
  ToDate: string | Dayjs;
  NoOfRecords: number;
  ReqType: string;
};
