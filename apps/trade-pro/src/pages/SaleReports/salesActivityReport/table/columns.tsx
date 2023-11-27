import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { formateDate } from '@tradePro/utils/formateDate';
import {
  TItemPurchaseAndSaleSummary,
  TSalesByCategory,
  TSalesByCategoryAndPackSize,
  TSalesByCustomer,
  TSalesByCustomerItemAndInvoice,
  TSalesByCustomerandItem,
  TSalesByInvoices,
  TSalesByItemCategoryandItemType,
  TSalesByItemType,
  TSalesByPaymentTerm,
  TsaleByDetail,
  commontype,
} from '../types';
import { Space } from 'antd';

export const columnscommon = (t: any): AntColumnType<commontype>[] => [
  {
    title: <>{t('sale_qty')}</>,
    dataIndex: 'SaleQty',
    render: (SaleQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(SaleQty)}</Space>
    ),
    width: 100,
    showTotal: true,
  },
  {
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    render: (NetWeight, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(NetWeight)}</Space>
    ),

    width: 100,
    showTotal: true,
  },

  {
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    render: (ItemNetAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(ItemNetAmount)}
      </Space>
    ),
    width: 200,
  },

  {
    title: <>{t('cgs_amount')}</>,
    dataIndex: 'CgsAmount',
    showTotal: true,
    render: (ItemNetAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(ItemNetAmount)}
      </Space>
    ),
    width: 200,
  },

  {
    title: <>{t('gross_profit_loss')}</>,
    dataIndex: 'GrossProfitLoss',
    showTotal: true,
    render: (ItemNetAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(ItemNetAmount)}
      </Space>
    ),
    width: 200,
  },

  {
    title: <>{t('prcnt_of_total')}</>,
    dataIndex: 'PrcntOfTotal',
    render: (_, { PrcntOfTotal }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 0 }}>
        <span style={{ marginRight: '5px' }}>{numberFormatter(PrcntOfTotal)}</span>
      </div>
    ),
    width: 200,
    showTotal: true,
  },
  {
    title: <>{t('prct_of_total_weight')}</>,
    dataIndex: 'PrctofTotalWeight',
    render: (PrctofTotalWeight, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(PrctofTotalWeight)}
      </Space>
    ),
    width: 200,
    showTotal: true,
  },
];

export const ColumnsSaleDetail = (t: any): AntColumnType<TsaleByDetail>[] => [
  {
    title: <>{t('invoice_date')}</>,
    dataIndex: 'InvoiceDate',
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),
    width: 120,
  },
  {
    title: <>{t('invoice_no')}</>,
    dataIndex: 'InvoiceNo',
    width: 100,
  },
  {
    title: <>{t('customer')}</>,
    dataIndex: 'Customer',
    width: 100,
  },

  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 250,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 120,
  },

  ...(columnscommon(t) as AntColumnType<TsaleByDetail>[]),
];

export const columnsTSalesByInvoices = (t: any): AntColumnType<TSalesByInvoices>[] => [
  {
    title: <>{t('invoice_date')}</>,
    dataIndex: 'InvoiceDate',
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),
    width: 150,
  },
  {
    title: <>{t('invoice_no')}</>,
    dataIndex: 'InvoiceNo',
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByInvoices>[]),
];

export const columnsSalesByCustomer = (t: any): AntColumnType<TSalesByCustomer>[] => [
  {
    title: <>{t('customer')}</>,
    dataIndex: 'Customer',
    searchableInput: true,
    width: 250,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 120,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByCustomer>[]),
];

export const columnsSalesByCustomerandItem = (t: any): AntColumnType<TSalesByCustomerandItem>[] => [
  {
    title: <>{t('customer')}</>,
    dataIndex: 'Customer',
    searchableInput: true,
    width: 250,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 150,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 100,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByCustomerandItem>[]),
];

export const columnsSalesByCustomerItemAndInvoice = (t: any): AntColumnType<TSalesByCustomerItemAndInvoice>[] => [
  {
    title: <>{t('invoice_date')}</>,
    dataIndex: 'InvoiceDate',
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),
    width: 120,
  },
  {
    title: <>{t('invoice_no')}</>,
    dataIndex: 'InvoiceNo',
    width: 100,
  },
  {
    title: <>{t('customer')}</>,
    dataIndex: 'Customer',
    searchableInput: true,
    width: 250,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 300,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByCustomerItemAndInvoice>[]),
];
export const columnsSalesByItemCategoryandItemType = (t: any): AntColumnType<TSalesByItemCategoryandItemType>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },

  {
    title: <>{t('type_description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },

  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    width: 250,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 100,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByItemCategoryandItemType>[]),
];
export const columnsSalesByCategory = (t: any): AntColumnType<TSalesByCategory>[] => [
  {
    title: <>{t('category-description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 270,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByCategory>[]),
];
export const columnsSalesByItemType = (t: any): AntColumnType<TSalesByItemType>[] => [
  {
    title: <>{t('type_description')}</>,
    dataIndex: 'TypeDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
    width: 300,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByItemType>[]),
];

export const columnsSalesByPaymentTerm = (t: any): AntColumnType<TSalesByPaymentTerm>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'TermsDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentTerm.localeCompare(b.PaymentTerm),
    width: 300,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByPaymentTerm>[]),
];

export const columnsSalesByCategoryAndPackSize = (t: any): AntColumnType<TSalesByCategoryAndPackSize>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 100,
  },

  ...(columnscommon(t) as AntColumnType<TSalesByCategoryAndPackSize>[]),
];

export const columnsItemPurchaseAndSaleSummary = (t: any): AntColumnType<TItemPurchaseAndSaleSummary>[] => [
  {
    title: <>{t('ware_house_name')}</>,
    dataIndex: 'WareHouseName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
    width: 200,
  },
  {
    title: <>{t('category')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    width: 150,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    width: 200,
  },
  {
    title: <>{t('purchase_qty')}</>,
    dataIndex: 'PurchaseQty',
    searchableInput: true,
    width: 100,
    render: (PurchaseQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(PurchaseQty)}</Space>
    ),
  },
  {
    title: <>{t('bal_qty')}</>,
    dataIndex: 'BalQty',
    searchableInput: true,
    width: 100,
    render: (BalQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(BalQty)}</Space>
    ),
  },
  {
    title: <>{t('avg_rate')}</>,
    dataIndex: 'AvgRate',
    searchableInput: true,
    width: 100,
    render: (AvgRate, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(AvgRate)}</Space>
    ),
  },

  ...(columnscommon(t) as AntColumnType<TItemPurchaseAndSaleSummary>[]),
];
