import { AntColumnType } from '@tradePro/globalTypes';
import { TStockReportTable } from './types';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

export const columns = (t: any): AntColumnType<TStockReportTable>[] => [
  {
    title: t('item_name'),
    width: 250,
    dataIndex: 'ItemName',
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    render: (_, { ItemName }) => <Link to={`/inventory-transaction-report-retail`}>{ItemName}</Link>,
  },

  {
    title: t('pack_uom'),
    width: 150,
    dataIndex: 'PackUom',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom - b.PackUom,
  },
  {
    title: t('total_qty'),
    width: 220,
    dataIndex: 'TotalQty',
    align: 'right',
    showTotal: true,
    render: (_, { TotalQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(TotalQty)}</Space>
    ),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TotalQty - b.TotalQty,
  },
  {
    title: t('op_weight'),
    dataIndex: 'OpWeight',
    width: 220,
    align: 'right',
    render: (_, { OpWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpWeight)}</Space>
    ),
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OpWeight - b.OpWeight,
  },
  {
    title: t('weight_in'),
    dataIndex: 'WeightIn',
    align: 'right',
    width: 230,
    render: (_, { WeightIn }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(WeightIn)}</Space>
    ),
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WeightIn - b.WeightIn,
  },
  {
    title: t('weight_out'),
    dataIndex: 'WeightOut',
    width: 230,
    render: (_, { WeightOut }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(WeightOut)}</Space>
    ),
    showTotal: true,
    align: 'right',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WeightOut - b.WeightOut,
  },
  {
    title: t('bal_weight'),
    dataIndex: 'BalWeight',
    width: 230,
    align: 'right',
    showTotal: true,
    render: (_, { BalWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalWeight)}</Space>
    ),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalWeight - b.BalWeight,
  },
];
