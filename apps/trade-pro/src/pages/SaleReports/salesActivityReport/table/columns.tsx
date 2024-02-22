import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { TSalesReportsByActivity } from '../types';
import { Space } from 'antd';

export const columnscommon = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('sale_qty'),
    dataIndex: 'SaleQty',
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    align: 'right',
    render: (SaleQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(SaleQty)}</Space>
    ),
    width: 150,
    showTotal: true,
  },
  {
    title: t('sale_weight'),
    dataIndex: 'SaleWeight',
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (SaleWeight, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(SaleWeight)}</Space>
    ),

    width: 150,
    showTotal: true,
    align: 'right',
  },

  {
    title: t('sale_amount'),
    dataIndex: 'SaleAmount',
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    showTotal: true,
    render: (SaleAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(SaleAmount)}</Space>
    ),
    width: 200,
    align: 'right',
  },

  {
    title: t('cgs_amount'),
    dataIndex: 'CgsAmount',
    showTotal: true,
    sorter: (a, b) => a.CgsAmount - b.CgsAmount,
    render: (CgsAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CgsAmount)}</Space>
    ),
    width: 200,
    align: 'right',
  },

  {
    title: t('gross_profit_loss'),
    dataIndex: 'GrossProfitLoss',
    showTotal: true,
    sorter: (a, b) => a.GrossProfitLoss - b.GrossProfitLoss,
    render: (GrossProfitLoss, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(GrossProfitLoss)}</Space>
    ),
    width: 200,
    align: 'right',
  },

  {
    title: t('prcnt_of_total'),
    dataIndex: 'PrcntOfTotal',
    sorter: (a, b) => a.PrcntOfTotal - b.PrcntOfTotal,
    render: (_, { PrcntOfTotal }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(PrcntOfTotal)}</Space>
      </div>
    ),
    align: 'right',
    width: 200,
    showTotal: true,
  },
  {
    title: t('prct_of_total_weight'),
    dataIndex: 'PrctofTotalWeight',
    sorter: (a, b) => a.PrctofTotalWeight - b.PrctofTotalWeight,
    align: 'right',
    render: (PrctofTotalWeight, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(PrctofTotalWeight)}</Space>
    ),
    width: 200,
    showTotal: true,
  },
];

export const ColumnsSaleDetail = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('invoice_date'),
    dataIndex: 'InvoiceDate',
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.InvoiceDate);
      const dateB = dayjs(b.InvoiceDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),

    width: 150,
  },
  {
    title: t('invoice_no'),
    dataIndex: 'InvoiceNo',
    sorter: (a, b) => a.InvoiceNo - b.InvoiceNo,
    render: (_, { InvoiceNo }) => numberFormatter(InvoiceNo),
    width: 150,
  },
  {
    title: t('customer'),
    dataIndex: 'Customer',
    sorter: (a, b) => a.Customer.localeCompare(b.Customer),
    width: 150,
  },

  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 250,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsTSalesByInvoices = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('invoice_date'),
    dataIndex: 'InvoiceDate',
    showCount: true,
    sorter: (a, b) => {
      const dateA = dayjs(a.InvoiceDate);
      const dateB = dayjs(b.InvoiceDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),
    width: 150,
  },
  {
    title: t('invoice_no'),
    dataIndex: 'InvoiceNo',
    sorter: (a, b) => a.InvoiceNo - b.InvoiceNo,
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsSalesByCustomer = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('customer'),
    dataIndex: 'Customer',
    showCount: true,
    searchableInput: true,
    sorter: (a, b) => a.Customer.localeCompare(b.Customer),
    width: 250,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    searchableInput: true,
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsSalesByCustomerandItem = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('customer'),
    dataIndex: 'Customer',
    searchableInput: true,
    showCount: true,
    width: 250,
    sorter: (a, b) => a.Customer.localeCompare(b.Customer),
  },
  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 150,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsSalesByCustomerItemAndInvoice = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('invoice_date'),
    dataIndex: 'InvoiceDate',
    showCount: true,
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.InvoiceDate);
      const dateB = dayjs(b.InvoiceDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { InvoiceDate }) => formateDate(InvoiceDate),
  },
  {
    title: t('invoice_no'),
    dataIndex: 'InvoiceNo',
    width: 150,
    sorter: (a, b) => a.InvoiceNo - b.InvoiceNo,
  },
  {
    title: t('customer'),
    dataIndex: 'Customer',
    searchableInput: true,
    sorter: (a, b) => a.Customer.localeCompare(b.Customer),
    width: 250,
  },
  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 300,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    searchableInput: true,
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];
export const columnsSalesByItemCategoryandItemType = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('category_description'),
    dataIndex: 'CategoryDescription',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },

  {
    title: t('type_description'),
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },

  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    searchableInput: true,
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 250,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 100,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];
export const columnsSalesByCategory = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('category-description'),
    dataIndex: 'CategoryDescription',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 270,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];
export const columnsSalesByItemType = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('type_description'),
    dataIndex: 'TypeDescription',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
    width: 300,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsSalesByPaymentTerm = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('category_description'),
    dataIndex: 'TermsDescription',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentTerm.localeCompare(b.PaymentTerm),
    width: 300,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsSalesByCategoryAndPackSize = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('category_description'),
    dataIndex: 'CategoryDescription',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 200,
  },
  {
    title: t('pack_uom'),
    dataIndex: 'PackUom',
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];

export const columnsItemPurchaseAndSaleSummary = (t: any): AntColumnType<TSalesReportsByActivity>[] => [
  {
    title: t('ware_house_name'),
    dataIndex: 'WareHouseName',
    searchableInput: true,
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
    width: 200,
  },
  {
    title: t('category'),
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 150,
  },
  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    searchableInput: true,
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 200,
  },
  {
    title: t('purchase_qty'),
    dataIndex: 'PurchaseQty',
    sorter: (a, b) => a.PurchaseQty - b.PurchaseQty,
    showTotal: true,
    width: 100,
    align: 'right',
    render: (PurchaseQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(PurchaseQty)}</Space>
    ),
  },
  {
    title: t('bal_qty'),
    dataIndex: 'BalQty',
    sorter: (a, b) => a.BalQty - b.BalQty,
    showTotal: true,
    width: 150,
    align: 'right',
    render: (BalQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(BalQty)}</Space>
    ),
  },
  {
    title: t('avg_rate'),
    dataIndex: 'AvgRate',
    sorter: (a, b) => a.AvgRate - b.BalQty,
    showTotal: true,
    width: 150,
    align: 'right',
    render: (AvgRate, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(AvgRate)}</Space>
    ),
  },

  ...(columnscommon(t) as AntColumnType<TSalesReportsByActivity>[]),
];
