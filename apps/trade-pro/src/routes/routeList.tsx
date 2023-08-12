import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@tradePro/pages/login'));
const PurchaseOrder = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseOrder'));

export const publicRoutes: RouteObject[] = [{ path: route.LOGIN, element: <Login /> }];

export const protectedRoutes: RouteObject[] = [{ path: route.PURCHASE_ORDER, element: <PurchaseOrder /> }];
