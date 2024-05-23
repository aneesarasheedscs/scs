import { TFunction } from 'i18next';
import { TCustomer, TItem, TItemPacks, TPackItem } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const Itemcolumns = (t: TFunction): AntColumnType<TItem>[] => [
  {
    title: t('item'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 350,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },

  {
    width: 150,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 160,
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
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.CustomerName?.localeCompare(b?.CustomerName),
  },

  {
    width: 120,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 120,
    title: t('weight'),
    key: 'Weight',
    dataIndex: 'Weight',
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 120,
    title: t('amount'),
    key: 'Amount',
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
  },
];
export const ItemAndPackcolumns = (t: TFunction): AntColumnType<TItemPacks>[] => [
  {
    title: t('pack'),
    key: 'Pack',
    dataIndex: 'Pack',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.Pack?.localeCompare(b?.Pack),
  },

  {
    width: 120,
    title: t('qty'),
    key: 'Qty',
    dataIndex: 'BalanceQty',
    //    render: (_, { ReqQty }) => numberFormatter(ReqQty),
  },

  {
    width: 120,
    title: t('weight_rate'),
    key: 'ReqAmount',
    dataIndex: 'ReqAmount',
    //    render: (_, { ReqAmount }) => numberFormatter(ReqAmount),
  },
  {
    width: 120,
    title: t('amount'),
    key: 'IssuedQty',
    dataIndex: 'IssuedQty',
    //    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
];
export const PackAndItemcolumns = (t: TFunction): AntColumnType<TPackItem>[] => [
  {
    title: t('item'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    //    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },

  {
    width: 120,
    title: t('qty'),
    key: 'ReqQty',
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
  },

  {
    width: 120,
    title: t('weight_rate'),
    key: 'Weight',
    dataIndex: 'Weight',
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    width: 120,
    title: t('amount'),
    key: 'Amount',
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
  },
];
