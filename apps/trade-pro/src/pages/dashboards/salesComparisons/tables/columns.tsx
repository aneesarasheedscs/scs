import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import {
  TSalesComparisonforCities,
  TSalesComparisonforCustomer,
  TSalesComparisonforItem,
  TSalesComparisonforPackingSize,
} from '../types';
import _ from 'lodash';

export const columns = (t?: any): AntColumnType<TSalesComparisonforCustomer>[] => [
  {
    width: 50,
    title: t('sr'), 
    dataIndex: 'serialNumber', 
    render: (_, __, index) => index + 1, 
  },
  {
    width: 200,
    title: t('customer_name'),
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 120,
    title: t('sale_quantity'),
    dataIndex: 'SaleQty',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 120,
    title: t('sale_weight'),
    dataIndex: 'SaleWeight',
    showTotal: true,
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 120,
    title: t('sale_amount'),
    dataIndex: 'SaleAmount',
    showTotal: true,
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 100,
    title: t('percent_of_top'),
    dataIndex: '%OfTopBottom',
    align: 'center',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => <span>{numberFormatter(record['%OfTopBottom'])}</span>,
  },
];

export const column = (t?: any): AntColumnType<TSalesComparisonforItem>[] => [
  {
    width: 50,
    title: t('sr'),
    dataIndex: 'serialNumber',
    render: (__, _, index) => index + 1,
  },
  {
    width: 254,
    title: t('item_name'),
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 117,
    title: t('sale_quantity'),
    dataIndex: 'SaleQty',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 116,
    title: t('sale_weight'),
    dataIndex: 'SaleWeight',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 116,
    title: t('sale_amount'),
    dataIndex: 'SaleAmount',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 100,
    title: t('percent_of_top'),
    align: 'center',
    dataIndex: '%OfTopBottom',
    showTotal: true,

    sortDirections: ['ascend', 'descend'],
    render: (text, record) => <span>{numberFormatter(record['%OfTopBottom'])}</span>,
  },
];
export const columnforCity = (t?: any): AntColumnType<TSalesComparisonforCities>[] => [
  {
    width: 50,
    title: t('sr'),
    dataIndex: 'serialNumber',
    render: (__, _, index) => index + 1,
  },
  {
    width: 200,
    title: t('city_name'),
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 120,
    title: t('sale_quantity'),
    align: 'right',
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 120,
    title: t('sale_weight'),
    dataIndex: 'SaleWeight',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 120,
    align: 'right',
    title: t('sale_amount'),
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 120,
    title: t('percent_of_top'),
    align: 'center',
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => <span>{numberFormatter(record['%OfTopBottom'])}</span>,
  },
];
export const columnforPackingSize = (t?: any): AntColumnType<TSalesComparisonforPackingSize>[] => [
  {
    title: t('sr'),
    dataIndex: 'serialNumber',
    width: 50,
    render: (__, _, index) => index + 1,
  },
  {
    width: 100,
    title: t('pack_uom'),
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 120,
    title: t('sale_quantity'),
    dataIndex: 'SaleQty',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 120,
    title: t('sale_weight'),
    dataIndex: 'SaleWeight',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 120,
    title: t('sale_amount'),
    dataIndex: 'SaleAmount',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 120,
    title: t('percent_of_top'),
    dataIndex: '%OfTopBottom',
    align: 'center',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    render: (text, record) => <span>{numberFormatter(record['%OfTopBottom'])}</span>,
  },
];
