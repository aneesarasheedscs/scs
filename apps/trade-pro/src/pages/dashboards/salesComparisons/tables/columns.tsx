import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import {
  TSalesComparisonforCities,
  TSalesComparisonforCustomer,
  TSalesComparisonforItem,
  TSalesComparisonforPackingSize,
} from '../types';

export const columns = (t?: any): AntColumnType<TSalesComparisonforCustomer>[] => [
  {
    width: 350,
    title: <>{t('customer_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 160,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 160,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 160,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 160,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, {PercentOfTopBottom}) => numberFormatter(PercentOfTopBottom),
  },
];

export const column = (t?: any): AntColumnType<TSalesComparisonforItem>[] => [
  {
    width: 350,
    title: <>{t('item_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 150,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 200,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, { PercentOfTopBottom }) => numberFormatter(PercentOfTopBottom),
  },
];
export const columnforCity = (t?: any): AntColumnType<TSalesComparisonforCities>[] => [
  {
    width: 350,
    title: <>{t('city_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 150,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '-2%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 200,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, { PercentOfTopBottom }) => numberFormatter(PercentOfTopBottom),
  },
];
export const columnforPackingSize = (t?: any): AntColumnType<TSalesComparisonforPackingSize>[] => [
  {
    width: 350,
    title: <>{t('pack_uom')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 150,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleQty)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleWeight)}</span>
    ),
  },
  {
    width: 150,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(SaleAmount)}</span>
    ),
  },
  {
    width: 200,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, { PercentOfTopBottom }) => numberFormatter(PercentOfTopBottom),
  },
];
