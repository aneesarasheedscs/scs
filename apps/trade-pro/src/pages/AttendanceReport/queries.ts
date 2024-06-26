import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

import dayjs from 'dayjs';
const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetMenualAttendanceStatusByDate = (startDate?: Date) => {
  return useQuery(
    ['attendance_status_datewise', startDate],
    () => {
      return requestManager.get('/api/hrmManualAttendance/EmployeeAttendenceStatusByDate', {
        params: {
          ...params,
          Date: dayjs(startDate).startOf('day'),
          DepartmentId: 0,
        },
      });
    },
    { cacheTime: 5000, enabled: !!startDate }
  );
};
export const useGetMenualAttendanceStatusByDepartmentWise = (startDate?: Date) => {
  return useQuery(
    ['attendance_status_department_wise', startDate],
    () => {
      return requestManager.get('/api/hrmManualAttendance/EmployeeAttendenceStatusByDate', {
        params: {
          ...params,
          Date: dayjs(startDate).startOf('day'),

          Activity: 'DepartmentWise',
        },
      });
    },
    { cacheTime: 5000, enabled: !!startDate }
  );
};
export const useGetMenualAttendanceSummaryStatusByAll = (startDate?: Date) => {
  return useQuery(
    ['attendance_status_by_all', startDate],
    () => {
      return requestManager.get('/api/hrmManualAttendance/EmployeeAttandanceSummaryStatus', {
        params: {
          ...params,
          Date: dayjs(startDate).startOf('day'),
          DepartmentId: 0,
        },
      });
    },
    { cacheTime: 5000, enabled: !!startDate }
  );
};
export const useGetMenualAttendanceSummaryStatusByDepartment = (startDate?: Date, departmentId?: number) => {
  return useQuery(
    ['attendance_status_by_department', startDate, departmentId],
    () => {
      return requestManager.get('/api/hrmManualAttendance/EmployeeAttandanceSummaryStatus', {
        params: {
          ...params,
          Date: dayjs(startDate).startOf('day'),
          DepartmentId: departmentId,
        },
      });
    },
    { cacheTime: 5000, enabled: !!startDate && !!departmentId }
  );
};
export const useGetMenualAttendanceSummaryStatusByMonthly = (startDate?: Date) => {
  return useQuery(
    ['attendance_status_by_month', startDate],
    () => {
      return requestManager.get('/api/hrmManualAttendance/EmployeeAttandanceStatusMonthly', {
        params: {
          ...params,
          Date: dayjs(startDate).startOf('day'),
          EmployeeId: 19,
          DepartmentId: 0,
        },
      });
    },
    { cacheTime: 5000, enabled: !!startDate }
  );
};
