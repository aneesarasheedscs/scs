import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { formateDate } from '@tradePro/utils/formateDate';
import {
  PurchaseByCategory,
  PurchaseByInvoicesSupplier,
  PurchaseByItemCategoryItemType,
  PurchaseByItemType,
  PurchaseByPaymentTerms,
  PurchaseBySupplier,
  PurchaseBySupplierItem,
  commontype,
  purchasebyDetail,
} from '../types';
import { Space } from 'antd';

export const columnscommon = (t: any): AntColumnType<commontype>[] => [
  {
    title: <>{t('item_qty')}</>,
    dataIndex: 'ItemQty',
    render: (ItemQty, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ItemQty)}</Space>
    ),
    width: 150,
    showTotal: true,
  },
  {
    title: <>{t('net_weight')}</>,
    dataIndex: 'NetWeight',
    render: (NetWeight, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(NetWeight)}</Space>
    ),

    width: 150,
    showTotal: true,
  },

  {
    title: <>{t('item_net_amount')}</>,
    dataIndex: 'ItemNetAmount',
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

export const ColumnsDetail = (t: any): AntColumnType<purchasebyDetail>[] => [
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
    title: <>{t('type')}</>,
    dataIndex: 'Type',
    width: 100,
  },
  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    width: 250,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 200,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 120,
  },

  {
    title: <>{t('item_rate')}</>,
    dataIndex: 'ItemRate',
    render: (ItemRate, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ItemRate)}</Space>
    ),
    width: 150,
    showTotal: true,
  },
  ...(columnscommon(t) as AntColumnType<purchasebyDetail>[]),
];

export const columnsPurchaseByInvoicesSupplier = (t: any): AntColumnType<PurchaseByInvoicesSupplier>[] => [
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

  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    width: 250,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseByInvoicesSupplier>[]),
];

export const columnsPurchaseBySupplier = (t: any): AntColumnType<PurchaseBySupplier>[] => [
  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    width: 450,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseBySupplier>[]),
];

export const columnsPurchaseBySupplierItem = (t: any): AntColumnType<PurchaseBySupplierItem>[] => [
  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    width: 250,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    width: 200,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 150,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseBySupplierItem>[]),
];

export const columnsPurchaseByItemCategoryItemType = (t: any): AntColumnType<PurchaseByItemCategoryItemType>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'CategoryDescription',

    width: 200,
  },
  {
    title: <>{t('type_description')}</>,
    dataIndex: 'TypeDescription',

    width: 150,
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

  ...(columnscommon(t) as AntColumnType<PurchaseByItemCategoryItemType>[]),
];
export const columnsPurchaseByCategory = (t: any): AntColumnType<PurchaseByCategory>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
    width: 450,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseByCategory>[]),
];
export const columnsPurchaseByItemType = (t: any): AntColumnType<PurchaseByItemType>[] => [
  {
    title: <>{t('type-description')}</>,
    dataIndex: 'TypeDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
    width: 470,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseByItemType>[]),
];
export const columnsPurchaseByPaymentTerms = (t: any): AntColumnType<PurchaseByPaymentTerms>[] => [
  {
    title: <>{t('terms_description')}</>,
    dataIndex: 'TermsDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TermsDescription.localeCompare(b.TermsDescription),
    width: 470,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseByPaymentTerms>[]),
];

export const columnsPurchaseByCategoryandPackSize = (t: any): AntColumnType<PurchaseByPaymentTerms>[] => [
  {
    title: <>{t('category_description')}</>,
    dataIndex: 'CategoryDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TermsDescription.localeCompare(b.TermsDescription),
    width: 400,
  },
  {
    title: <>{t('pack_uom')}</>,
    dataIndex: 'PackUom',

    width: 200,
  },

  ...(columnscommon(t) as AntColumnType<PurchaseByPaymentTerms>[]),
];
