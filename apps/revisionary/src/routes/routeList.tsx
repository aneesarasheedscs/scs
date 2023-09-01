import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';
// import Dashboard from '@revisionary/pages/revisionaryUser/SyllabusStatus/Dashboard/Dashboard';

const Login = lazy(() => import('@revisionary/pages/login'));
const SyllabusManagement = lazy(() => import('@revisionary/pages/Syllabus_Management'));
const ClassManagement = lazy(() => import('@revisionary/pages/Class_Management/Index'));
const ClassSyllabusDivisionByTopic = lazy(
  () => import('@revisionary/pages/Class_Management/ClassSyllabusDivisionByTopic/index')
);
const SignForm = lazy(() => import('@revisionary/pages/revisionaryUser/Forms/SignForm'));
const StudentProfile = lazy(() => import('@revisionary/pages/revisionaryUser/StudentProfile/StudentProfile'));
const StudentSyllabus = lazy(() => import('@revisionary/pages/revisionaryUser/Student Syllabus'));
const SyllabusStatus = lazy(() => import('@revisionary/pages/revisionaryUser/SyllabusStatu'));
// const Assessment = lazy(() => import('@revisionary/pages/revisionaryUser/Assessment/Assessment'));
const Subject1 = lazy(
  () => import('@revisionary/pages/revisionaryUser/Student Syllabus/AddSubject/AddSubject')
);
const LoginForm = lazy(() => import('@revisionary/pages/revisionaryUser/Forms/LoginForm'));
const Dashboard = lazy(() => import('@revisionary/pages/revisionaryUser/Dashboard/Index'));
const DashboardSubTopic = lazy(
  () => import('@revisionary/pages/revisionaryUser/Dashboard/DashboardSubTopic')
);

export const publicRoutes: RouteObject[] = [{ path: route.LOGIN, element: <Login /> }];

export const protectedRoutes: RouteObject[] = [
  { path: route.SYLLABUS_MANAGEMENT, element: <SyllabusManagement /> },
  { path: route.CLASS_MANAGEMENT, element: <ClassManagement /> },
  { path: route.SIGN_fORM, element: <SignForm /> },
  { path: route.STUDENT_PROFILE, element: <StudentProfile /> },
  { path: route.STUDENT_SYLLABUS, element: <StudentSyllabus /> },
  { path: route.SYLLABUS_STATUS, element: <SyllabusStatus /> },
  // { path: route.ASSESSMENT, element: <Assessment /> },
  { path: route.SUBJECT1, element: <Subject1 /> },
  { path: route.LOGIN_FORM, element: <LoginForm /> },
  { path: route.DASHBOARD, element: <Dashboard /> },
  { path: route.DASHBOARD_SUB_TOPIC, element: <DashboardSubTopic /> },
  { path: route.CLASS_SYLLABUS_BY_TOPIC, element: <ClassSyllabusDivisionByTopic /> },
];
