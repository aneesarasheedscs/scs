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
    width: 260,
    title: <>{t('customer_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 130,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => numberFormatter(SaleQty),
  },
  {
    width: 130,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => numberFormatter(SaleWeight),
  },
  {
    width: 130,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => numberFormatter(SaleAmount),
  },
  {
    width: 150,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, { PercentOfTopBottom }) => numberFormatter(PercentOfTopBottom),
  },
];

export const column = (t?: any): AntColumnType<TSalesComparisonforItem>[] => [
  {
    width: 260,
    title: <>{t('item_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 130,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => numberFormatter(SaleQty),
  },
  {
    width: 130,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => numberFormatter(SaleWeight),
  },
  {
    width: 130,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => numberFormatter(SaleAmount),
  },
  {
    width: 150,
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
    width: 260,
    title: <>{t('city_name')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 130,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => numberFormatter(SaleQty),
  },
  {
    width: 130,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => numberFormatter(SaleWeight),
  },
  {
    width: 130,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => numberFormatter(SaleAmount),
  },
  {
    width: 150,
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
    width: 260,
    title: <>{t('pack_uom')}</>,
    searchableInput: true,
    dataIndex: 'GroupTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GroupTitle.localeCompare(b.GroupTitle),
  },

  {
    width: 130,
    title: <>{t('sale_quantity')}</>,
    dataIndex: 'SaleQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleQty - b.SaleQty,
    render: (_, { SaleQty }) => numberFormatter(SaleQty),
  },
  {
    width: 130,
    title: <>{t('sale_weight')}</>,
    dataIndex: 'SaleWeight',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleWeight - b.SaleWeight,
    render: (_, { SaleWeight }) => numberFormatter(SaleWeight),
  },
  {
    width: 130,
    title: <>{t('sale_amount')}</>,
    dataIndex: 'SaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SaleAmount - b.SaleAmount,
    render: (_, { SaleAmount }) => numberFormatter(SaleAmount),
  },
  {
    width: 150,
    title: <>{t('percent_of_top')}</>,
    dataIndex: '%OfTopBottom',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.PercentOfTopBottom - b.PercentOfTopBottom,
    // render: (_, { PercentOfTopBottom }) => numberFormatter(PercentOfTopBottom),
  },
];
