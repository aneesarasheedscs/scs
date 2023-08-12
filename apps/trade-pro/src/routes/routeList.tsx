import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@tradePro/pages/login'));
const PurchaseOrder = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseOrder'));
const ItemHistory = lazy(() => import('@tradePro/pages/defineItemPos'));

// const PurchaseHistory = lazy(() => import('@tradePro/pages/purchaseHistory'));

export const publicRoutes: RouteObject[] = [{ path: route.LOGIN, element: <Login /> }];

export const protectedRoutes: RouteObject[] = [
  { path: route.PURCHASE_ORDER, element: <PurchaseOrder /> },
  { path: route.DEFINE_ITEM_HISTORY, element: <ItemHistory /> },
];
