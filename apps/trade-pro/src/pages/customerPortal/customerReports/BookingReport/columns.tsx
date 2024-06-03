import { TFunction } from 'i18next';
import { TCustomer, TItem, TItemPacks, TPackItem } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const Itemcolumns = (t: TFunction): AntColumnType<TItem>[] => [
  {
    title: t('item'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 450,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },

  {
    width: 200,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 200,
    title: t('weight'),
    key: 'Weight',
    dataIndex: 'Weight',
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 200,
    title: t('amount'),
    key: 'Amount',
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const Customercolumns = (t: TFunction): AntColumnType<TCustomer>[] => [
  {
    title: t('customer'),
    key: 'CustomerName',
    dataIndex: 'CustomerName',
    width: 450,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.CustomerName?.localeCompare(b?.CustomerName),
  },

  {
    width: 200,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 200,
    title: t('weight'),
    key: 'Weight',
    dataIndex: 'Weight',
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 200,
    title: t('amount'),
    key: 'Amount',
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const ItemAndPackcolumns = (t: TFunction): AntColumnType<TItemPacks>[] => [
  {
    title: t('pack'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 450,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.PackUom?.localeCompare(b?.PackUom),
  },

  {
    width: 200,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 200,
    title: t('weight_rate'),
    key: 'Weight',
    dataIndex: 'Weight',
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 200,
    title: t('amount'),
    key: 'Amount',
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const PackAndItemcolumns = (t: TFunction): AntColumnType<TPackItem>[] => [
  {
    title: t('item'),
    key: 'PackUom',
    dataIndex: 'PackUom',
    width: 340,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.PackUom?.localeCompare(b?.PackUom),
  },

  {
    width: 150,
    title: t('qty'),
    key: 'Qty',
    align: 'right',
    dataIndex: 'Qty',
    // showTotal: true,
    isNumber: true,
    render: (_, { Qty }) => '',
    // render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 150,
    title: t('weight_rate'),
    key: 'Weight',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Weight',
    // render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 150,
    title: t('amount'),
    key: 'Amount',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Amount',
    // render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const ItemAndCustomercolumns = (t: TFunction): AntColumnType<TPackItem>[] => [
  {
    title: t('customer'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 340,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.PackUom?.localeCompare(b?.PackUom),
  },

  {
    width: 150,
    title: t('qty'),
    key: 'Qty',
    align: 'right',
    dataIndex: 'Qty',
    // showTotal: true,
    isNumber: true,
    render: (_, { Qty }) => '',
    // render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 150,
    title: t('weight_rate'),
    key: 'Weight',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Weight',
    // render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 150,
    title: t('amount'),
    key: 'Amount',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Amount',
    // render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const CustomerAndItemscolumns = (t: TFunction): AntColumnType<TPackItem>[] => [
  {
    title: t('item'),
    key: 'CustomerName',
    dataIndex: 'CustomerName',
    width: 340,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.PackUom?.localeCompare(b?.PackUom),
  },

  {
    width: 150,
    title: t('qty'),
    key: 'Qty',
    align: 'right',
    dataIndex: 'Qty',
    // showTotal: true,
    isNumber: true,
    render: (_, { Qty }) => '',
    // render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 150,
    title: t('weight_rate'),
    key: 'Weight',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Weight',
    // render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 150,
    title: t('amount'),
    key: 'Amount',
    // showTotal: true,
    align: 'right',
    isNumber: true,
    // dataIndex: 'Amount',
    // render: (_, { Amount }) => numberFormatter(Amount),
  },
];
