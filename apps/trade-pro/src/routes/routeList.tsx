import { lazy } from 'react';
import { route } from './constant';
import { RouteObject } from 'react-router-dom';

const open = false;
const openItemType = false;
const openItemSchudleUnit = false;
const GeneralLedgerReport = lazy(() => import('@tradePro/pages/accountReports/GeneralLedger'));
const PurchaseActivity = lazy(() => import('@tradePro/pages/purchaseReports/purchaseActivityReport'));
const SalesActivity = lazy(() => import('@tradePro/pages/SaleReports/salesActivityReport'));
const ItemCategory = lazy(
  () => import('@tradePro/pages/inventoryDefination/defineItemPos/Form/definitionScreens/ItemCategory')
);
const ItemType = lazy(
  () => import('@tradePro/pages/inventoryDefination/defineItemPos/Form/definitionScreens/ItemType')
);
const ItemBaseUOM = lazy(
  () => import('@tradePro/pages/inventoryDefination/defineItemPos/Form/definitionScreens/BaseUom')
);
const ItemBaseScheduleUOM = lazy(
  () => import('@tradePro/pages/inventoryDefination/defineItemPos/Form/definitionScreens/BaseScheduleUnit')
);
const DiscountCategory = lazy(() => import('@tradePro/pages/WholeSale/discountCategory'));
const DiscountTypes = lazy(() => import('@tradePro/pages/WholeSale/discountType'));
const AllocateDiscCategoryToDiscType = lazy(() => import('@tradePro/pages/WholeSale/allocateDiscCategoryToDiscType'));
const AllocateBrandItemtoDiscountType = lazy(() => import('@tradePro/pages/WholeSale/allocateBrandItemtoDiscType'));
const CustomerDiscountPolicy = lazy(() => import('@tradePro/pages/WholeSale/CustomerDiscountPolicy'));
const AddTaxType = lazy(() => import('@tradePro/pages/Taxation/AddTaxType/form'));
const AddTaxSheduleScreen = lazy(() => import('@tradePro/pages/Taxation/AddTaxShedule/form'));
const ItemTaxSheduleScreen = lazy(() => import('@tradePro/pages/Taxation/ItemTaxShedule/form'));

const AllReports = lazy(() => import('@tradePro/pages/Reports'));

// Store Management
const StockTransfer = lazy(() => import('@tradePro/pages/StoreManagement/stockTransferWarehouseToWarehouse'));
const StockTransferNoteDirect = lazy(() => import('@tradePro/pages/StoreManagement/StockTransferNoteDirect'));
const RequisitionOrder = lazy(() => import('@tradePro/pages/StoreManagement/RequisitionOrder'));
const StockTranferNotes = lazy(() => import('@tradePro/pages/StoreManagement/StockTransferNotes'));
const StockReceivedNotes = lazy(() => import('@tradePro/pages/StoreManagement/StockReceivedNotes'));

const Login = lazy(() => import('@tradePro/pages/login'));
const CompanyBranchDetail = lazy(() => import('@tradePro/pages/login/CompanyBranchDetails'));
//Dashboards
const AccountDashboard = lazy(() => import('@tradePro/pages/dashboards/accountsDashboard'));
const Approval_dashboard = lazy(() => import('@tradePro/pages/dashboards/approval_dashboard'));
const MonthandQuarterWiseSaleReport = lazy(() => import('@tradePro/pages/dashboards/monthandQuarterWiseSaleReport'));
const SalesComparison = lazy(() => import('@tradePro/pages/dashboards/salesComparisons'));
const SaleAnalytics = lazy(() => import('@tradePro/pages/dashboards/saleAnalytics'));
const MonthlySaleReport = lazy(() => import('@tradePro/pages/dashboards/monthly-sale-report'));

//Account Reports
const ActivitySummary = lazy(() => import('@tradePro/pages/accountReports/ActivitySummary'));
const CashBalances = lazy(() => import('@tradePro/pages/accountReports/CashBalance'));
const BankBalances = lazy(() => import('@tradePro/pages/accountReports/BankBalances'));
const TrialBalance = lazy(() => import('@tradePro/pages/accountReports/TrialBReport'));
const PayablesReceivablesReport = lazy(
  () => import('@tradePro/pages/accountReports/PayablesReceivables/Payables&Receivaables/MainForm')
);
const VoucherReport = lazy(() => import('@tradePro/pages/accountReports/voucher Report/voucher Report'));
const BalanceSheet = lazy(() => import('@tradePro/pages/accountReports/BalanceSheet'));
const ProfitLossReport = lazy(() => import('@tradePro/pages/accountReports/Profit&Loss'));
const BSNotesBreakup = lazy(() => import('@tradePro/pages/accountReports/BalanceSheet/bsNotesBreakup/'));
const PLNotesBreakup = lazy(
  () => import('@tradePro/pages/accountReports/Profit&Loss/profit&lossReport/PLNotesBreakup')
);
const SelectedTrialBalance = lazy(() => import('@tradePro/pages/accountReports/TrialBalaceSelectedReport'));
const TrialBalanceAllLevelReport = lazy(() => import('@tradePro/pages/accountReports/TrialBalanceAllLevel'));

const AccountPayables = lazy(() => import('@tradePro/pages/accountReports/accountPayables'));
const AccountReceivables = lazy(() => import('@tradePro/pages/accountReports/accountReceivables'));
const ChartOfAccountReportTable = lazy(() => import('@tradePro/pages/accountReports/COA&LangTitle/COAReportTable'));
const PayablesTable = lazy(() => import('@tradePro/pages/accountReports/Payables/payablesTable'));
const PayableAgingRegisterTable = lazy(() => import('@tradePro/pages/accountReports/PayablesAging/payablesAgingTable'));
const ReceivablesAgingRegisterTable = lazy(
  () => import('@tradePro/pages/accountReports/ReceivablesAging/receivablesAging')
);
const ReceivableReport = lazy(() => import('@tradePro/pages/accountReports/ReceivableReport/receivableTable'));

//Stock Reports
const StockReportSimple = lazy(() => import('@tradePro/pages/stockReports/stockReportSimple'));
const StockReportswithValues = lazy(() => import('@tradePro/pages/stockReports/stockReportwithValues'));
const InventryTransactions = lazy(() => import('@tradePro/pages/stockReports/InventryTransaction'));
const InventoryEvaluationItemLedger = lazy(() => import('@tradePro/pages/stockReports/inventoryEvaluationItemLedger'));
// Purcahse Trading
const PurchaseOrder = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseOrder'));
const GRNRetailRegister = lazy(() => import('@tradePro/pages/purchaseReports/grnRetailRegister'));
const GoodsReceivedNotes = lazy(() => import('@tradePro/pages/purchaseTrading/goodsReceivedNotes'));
const PurchaseInvoice = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseInvoice'));
// Purchase Reports
const PurchaseInvoiceAgainstGrn = lazy(() => import('@tradePro/pages/purchaseTrading/purchaseInvoiceAgainstGrn'));
const PurchaseOrderRetailRegister = lazy(() => import('@tradePro/pages/purchaseReports/purchaseOrderRetailRegister'));

//Inventory Definition
const ItemAllocationForm = lazy(() => import('@tradePro/pages/inventoryDefination/itemAllocationForm'));
const PosDefineItem = lazy(() => import('@tradePro/pages/inventoryDefination/defineItemPos'));
const DefineJobLots = lazy(() => import('@tradePro/pages/inventoryDefination/defineJobLots'));
const DefineWareHouse = lazy(() => import('@tradePro/pages/inventoryDefination/defineWareHouse'));
//Account Definition
const ChartOfAccount = lazy(() => import('@tradePro/pages/accountDefination/chartOfAccount'));
const ChequeBookForm = lazy(() => import('@tradePro/pages/accountDefination/chequeBookRegistration'));
const AccountAllocation = lazy(
  () => import('@tradePro/pages/accountDefination/accountAllocationForm/accoutAllocation')
);
const PosItemAllocation = lazy(() => import('@tradePro/pages/inventoryDefination/itemAllocationForm'));
const OpeningBalance = lazy(() => import('@tradePro/pages/accountDefination/openingBalance'));

//Account Transaction
const ContraVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/ContraVoucher/ContraVoucher'));
const ExpenseVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/ExpenseVoucher/ExpenseVoucher'));
const BankReceiptVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/bankReceiptVoucher'));
const BankPaymentVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/bankPaymentVoucher'));
const CashPaymentVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/cashPaymentVoucher'));
const CashReceiptVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/cashReceiptVoucher'));
const JournalVoucher = lazy(() => import('@tradePro/pages/AccountTransaction/JournalVoucher'));

//Sale Trading
const SaleOrder = lazy(() => import('@tradePro/pages/SaleTrading/saleOrder'));
const SaleInvoiceDirect = lazy(() => import('@tradePro/pages/SaleTrading/saleInvoiceDirect'));
//Sale Reports
const SaleOrderRegisterTable = lazy(
  () => import('@tradePro/pages/SaleReports/sale_order_register/saleOrderRegisterTable')
);
const GdnRegisterTable = lazy(() => import('@tradePro/pages/SaleReports/goodsDispatchNotesRegister/gdntable'));
const EmployeeRegistration = lazy(() => import('@tradePro/pages/hmrs/employeeRegistration'));
const AppMenu = lazy(() => import('@tradePro/pages/MainMenu'));
const ShiftTimingDefine = lazy(() => import('@tradePro/pages/hmrs/shiftTimingDefine'));
const DutyRoaster = lazy(() => import('@tradePro/pages/hmrs/dutyRoaster'));
const RoadMap = lazy(() => import('@tradePro/pages/roadMap'));
const DefineDivision = lazy(() => import('@tradePro/pages/defineDivision'));

export const protectedRoutes: RouteObject[] = [
  { path: route.APP_MENU, element: <AppMenu /> },
  //Dashboards
  { path: route.ACCOUNTS_DASHBOARD, element: <AccountDashboard /> },
  { path: route.APPROVAL_DASHBOARD, element: <Approval_dashboard /> },
  { path: route.MONTH_QUARTER_WISE_SALE_REPORT, element: <MonthandQuarterWiseSaleReport /> },
  { path: route.SALES_COMPARISON, element: <SalesComparison /> },
  { path: route.SALE_ANALYTICS, element: <SaleAnalytics /> },
  { path: route.MONTHLY_DATE_REPORT, element: <MonthlySaleReport /> },

  //Account Definitions
  { path: route.CHART_ACCOUNT, element: <ChartOfAccount /> },
  { path: route.CHEQUE_BOOK_REGISTRATION, element: <ChequeBookForm /> },
  { path: route.ACCOUNT_ALLOCATION, element: <AccountAllocation /> },
  { path: route.OPENING_BALANCE, element: <OpeningBalance /> },

  //Account Tranaction
  { path: route.CONTRA_VOUCHER, element: <ContraVoucher /> },
  { path: route.EXPENSE_VOUCHER, element: <ExpenseVoucher /> },
  { path: route.BANK_RECEIPT_VOUCHER, element: <BankReceiptVoucher /> },
  { path: route.BANK_PAYMENT_VOUCHER, element: <BankPaymentVoucher /> },
  { path: route.CASH_PAYMENT_VOUCHER, element: <CashPaymentVoucher /> },
  { path: route.CASH_RECEIPT_VOUCHER, element: <CashReceiptVoucher /> },
  { path: route.JOURNAL_Voucher, element: <JournalVoucher /> },

  //Account Reports
  { path: route.ACTIVITY_SUMMARY, element: <ActivitySummary /> },
  { path: route.CASH_BALANCES, element: <CashBalances /> },
  { path: route.BANK_BALANCES, element: <BankBalances /> },
  { path: route.TRADE_DEBITORS_REPORT, element: <PayablesReceivablesReport AccountClassId={2} /> },
  { path: route.TRADE_CREDITORS_REPORT, element: <PayablesReceivablesReport AccountClassId={3} /> },
  { path: route.TRIAL_BALANCE, element: <TrialBalance /> },
  { path: route.BALANCE_SHEET, element: <BalanceSheet /> },
  { path: route.VOUCHER_REPORT, element: <VoucherReport /> },
  { path: route.ACCOUNT_PAYABLES, element: <AccountPayables /> }, // By Due Date
  { path: route.ACCOUNT_RECEIVABLES, element: <AccountReceivables /> }, // By Due Date
  { path: route.SELECTED_TRIAL_BALANCE, element: <SelectedTrialBalance /> },
  { path: route.TRIAL_BALANCE_ALL_LEVEL, element: <TrialBalanceAllLevelReport /> },
  { path: route.PROFIT_LOSS, element: <ProfitLossReport /> },
  { path: route.PL_NOTES_BREAKUP, element: <PLNotesBreakup /> },
  { path: route.BS_NOTES_BREAKUP, element: <BSNotesBreakup /> },
  { path: route.CHART_OF_ACCOUNT_TITLE_UPDATE, element: <ChartOfAccountReportTable /> },
  { path: route.GENERAL_LEDGER, element: <GeneralLedgerReport /> },
  { path: route.PAYABLES, element: <PayablesTable /> },
  { path: route.PAYABLES_AGING_REPORT, element: <PayableAgingRegisterTable /> },
  { path: route.RECEIVABLES, element: <ReceivablesAgingRegisterTable /> },
  { path: route.RECEIVABLES_AGING_REPORT, element: <ReceivableReport /> },

  //Stock Reports
  { path: route.STOCK_REPORT_SIMPLE, element: <StockReportSimple /> },
  { path: route.STOCK_REPORT_WITH_VALUE, element: <StockReportswithValues /> },
  { path: route.INVENTRY_TRANSACTION, element: <InventryTransactions /> },
  { path: route.INVENTORY_EVALUATION_LEDGER, element: <InventoryEvaluationItemLedger /> },

  // Inventory Definintion
  { path: route.ITEM_ALLOCATION_FORM, element: <ItemAllocationForm /> },
  { path: route.DEFINE_ITEM_HISTORY, element: <PosDefineItem /> },
  { path: route.DEFINE_WAREHOUSE, element: <DefineWareHouse /> },
  { path: route.DEFINE_JOBLOTS, element: <DefineJobLots /> },
  { path: route.ITEM_CATEGORY, element: <ItemCategory open={open} /> },
  { path: route.ITEM_TYPE, element: <ItemType openItemType={openItemType} /> },
  { path: route.UOM_DEFINE, element: <ItemBaseUOM open={open} /> },
  { path: route.UOM_SCHEDULE, element: <ItemBaseScheduleUOM openItemSchudleUnit={openItemSchudleUnit} /> },
  { path: route.DISCOUNT_CATEGORY, element: <DiscountCategory /> },
  { path: route.DISCOUNT_TYPE, element: <DiscountTypes /> },
  { path: route.ALLOCATE_DISC_CATEGORY_TODISC_TYPE, element: <AllocateDiscCategoryToDiscType /> },
  { path: route.ALLOCATE_BRAND_ITEM_TO_DISC_TYPE, element: <AllocateBrandItemtoDiscountType /> },
  { path: route.CUSTOMER_DISCOUNT_POLICY, element: <CustomerDiscountPolicy /> },
  { path: route.POS_ITEM_ALLOCATION, element: <ItemAllocationForm /> },
  { path: route.DISCOUNT_POLICY_FOR_PARTY, element: <ItemBaseScheduleUOM /> },
  { path: route.SALE_PRICING_SCHEDULE, element: <ItemBaseScheduleUOM /> },

  //Purchase Trading
  { path: route.PURCHASE_ORDER, element: <PurchaseOrder /> },
  { path: route.PURCHASE_INVOICE, element: <PurchaseInvoice /> },
  { path: route.PURCHASE_INVOICE_AGAINST_GRN, element: <PurchaseInvoiceAgainstGrn /> },
  { path: route.GOODS_RECEIVED_NOTES, element: <GoodsReceivedNotes /> },

  //Purchase Reports
  { path: route.PURCHASE_ORDER_RETAIL_REGISTER, element: <PurchaseOrderRetailRegister /> },
  { path: route.GRN_RETAIL_REGISTER, element: <GRNRetailRegister /> },
  { path: route.PURCHASE_REPORT_ACTIVITY_WISE, element: <PurchaseActivity /> },

  //Sale Trading
  { path: route.SALE_ORDER, element: <SaleOrder /> },
  { path: route.SALE_INVOICE_DIRECT, element: <SaleInvoiceDirect /> },

  //ALL Reports
  { path: route.ALL_REPORTS, element: <AllReports /> },

  //Sale Reports
  { path: route.SALE_ORDER_REGISTER, element: <SaleOrderRegisterTable /> },
  { path: route.GDN_REGISTER, element: <GdnRegisterTable /> },
  { path: route.SALE_REPORT_ACTIVITY_WISE, element: <SalesActivity /> },

  //Taxation
  { path: route.TAX_TYPE, element: <AddTaxType /> },
  { path: route.TAX_SCHEDULE, element: <AddTaxSheduleScreen /> },
  { path: route.ITEM_TAX_SCHEDULE, element: <ItemTaxSheduleScreen /> },

  //Store Management
  { path: route.REQUISITION_ORDER, element: <RequisitionOrder /> },
  { path: route.STOCK_TRANSFER_NOTE, element: <StockTranferNotes /> },
  { path: route.STOCK_RECEIVING_NOTE, element: <StockReceivedNotes /> },
  { path: route.STOCK_TRANSFER_WAREHOUSE, element: <StockTransfer /> },
  { path: route.STOCK_TRANSFER_NOTE_DIRECT, element: <StockTransferNoteDirect /> },

  // { path: route.STOCK_TRANSFER_NOTE, element: <ItemBaseScheduleUOM /> },
  // { path: route.STOCK_RECEIVING_NOTE, element: <ItemBaseScheduleUOM /> },
  // { path: route.STOCK_ADJUSTMENT, element: <ItemBaseScheduleUOM /> },

  //Hrm + system Utilities
  { path: route.DEFINE_DIVISION, element: <DefineDivision /> },
  { path: route.SHIFT_TIMING_DEFINE, element: <ShiftTimingDefine /> },
  { path: route.DISTRICT, element: <RoadMap /> },
  { path: route.DUTY_ROASTER, element: <DutyRoaster /> },
  { path: route.EMPLOYEE_REGISTRATION, element: <EmployeeRegistration /> },
];

export const publicRoutes: RouteObject[] = [
  { path: route.LOGIN, element: <Login /> },
  { path: route.COMPANY_BRANCH_DETAIL, element: <CompanyBranchDetail /> },
];
