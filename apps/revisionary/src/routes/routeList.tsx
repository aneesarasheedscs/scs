import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@revisionary/pages/login'));
const SyllabusManagement = lazy(() => import('@revisionary/pages/syllabusManagement'));

export const publicRoutes: RouteObject[] = [{ path: route.LOGIN, element: <Login /> }];

export const protectedRoutes: RouteObject[] = [
  { path: route.SYLLABUS_MANAGEMENT, element: <SyllabusManagement /> },
];
