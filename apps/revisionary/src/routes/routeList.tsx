import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@revisionary/pages/login'));
const SyllabusManagement = lazy(() => import('@revisionary/pages/Syllabus_Management/Tab'));
const SignForm = lazy(() => import('@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Comp/SignForm'))
const StudentProfile = lazy(()=> import('@revisionary/pages/Syllabus_Management/Revisionary_ui/StudentProfile'))
const StudentSyllabus = lazy(()=> import('@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Comp/StudentSyllabus'))
const  SyllabusStatus = lazy(()=> import('@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/MainSyllabusFile'))
const   Assessment = lazy(()=> import('@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Assessment'))
const    Subject1 = lazy(()=> import('@revisionary/pages/Syllabus_Management/Revisionary_ui/Subject1'))
const LoginForm = lazy(() => import('@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Comp/LoginForm'))

export const publicRoutes: RouteObject[] = [{ path: route.LOGIN, element: <Login /> }];

export const protectedRoutes: RouteObject[] = [
  { path: route.SYLLABUS_MANAGEMENT, element: <SyllabusManagement /> },
   {path: route.SIGN_fORM, element: <SignForm />},
   {path: route.STUDENT_PROFILE, element: <StudentProfile />},
   {path: route.STUDENT_SYLLABUS, element: <StudentSyllabus />},
   {path: route.SYLLABUS_STATUS, element: <SyllabusStatus />},
   {path: route.ASSESSMENT, element: <Assessment />},
   {path: route.SUBJECT1, element: <Subject1 />},
   {path: route.LOGIN_FORM, element: <LoginForm />}
   
];
