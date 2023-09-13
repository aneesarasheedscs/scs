import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@tradePro/pages/login'));
const CompanyBranchDetail = lazy(() => import('@tradePro/pages/login/CompanyBranchDetails'));
const PurchaseOrder = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseOrder'));
const ItemHistory = lazy(() => import('@tradePro/pages/defineItemPos'));
const ChartOfAccount = lazy(() => import('@tradePro/pages/chartOfAccount'));
const JournalVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/JournalVoucher'));
const AccountOpeningBalance = lazy(() => import('@tradePro/pages/OpeningBalance'));

export const protectedRoutes: RouteObject[] = [
  { path: route.PURCHASE_ORDER, element: <PurchaseOrder /> },
  { path: route.DEFINE_ITEM_HISTORY, element: <ItemHistory /> },
  { path: route.CHART_ACCOUNT, element: <ChartOfAccount /> },
  { path: route.JOURNAL_VOUCHER, element: <JournalVoucher /> },
  { path: route.ACCOUNT_OPENING_BLANCE, element: <AccountOpeningBalance /> },
];
export const publicRoutes: RouteObject[] = [
  { path: route.LOGIN, element: <Login /> },
  { path: route.COMPANY_BRANCH_DETAIL, element: <CompanyBranchDetail /> },
];
