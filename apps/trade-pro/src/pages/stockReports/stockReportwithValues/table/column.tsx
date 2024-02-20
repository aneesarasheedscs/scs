import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TStockReportDetail } from '../types';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

export const columns = (t?: any, handleItemNameClick?: any): AntColumnType<TStockReportDetail>[] => [
  {
    width: 300,
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    render: (_, { AccountTitle }) => <Link to="/Inventory-Evaluation-Item-Ledger">{AccountTitle}</Link>,
  },
  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    width: 300,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    // render: (_, { ItemName }) => <Link to={`/Inventory-Evaluation-Item-Ledger`}>{ItemName}</Link>,
    render: (_, { ItemName, ItemId }) => (
      <>
        <a onClick={() => handleItemNameClick(ItemId)}>{ItemName}</a>
      </>
    ),
  },
  {
    title: t('opening_quantity'),
    showTotal: true,
    dataIndex: 'OpQty',
    width: 200,
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OpQty - b.OpQty,
    render: (_, { OpQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpQty)}</Space>
    ),
  },
  {
    title: t('quantity_in'),
    dataIndex: 'QtyIn',
    showTotal: true,
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.QtyIn - b.QtyIn,
    render: (_, { QtyIn }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(QtyIn)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    title: t('quantity_out'),
    dataIndex: 'QtyOut',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.QtyOut - b.QtyOut,
    render: (_, { QtyOut }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(QtyOut)}</Space>
    ),
  },
  {
    width: 180,
    title: t('balance_quantity'),
    dataIndex: 'BalQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalQty - b.BalQty,
    render: (_, { BalQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalQty)}</Space>
    ),
  },
  {
    width: 180,
    showTotal: true,
    title: t('opening_weight'),
    dataIndex: 'OpWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OpWeight - b.OpWeight,
    render: (_, { OpWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpWeight)}</Space>
    ),
  },
  {
    width: 150,
    title: t('weight_in'),
    dataIndex: 'WeightIn',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WeightIn - b.WeightIn,
    render: (_, { WeightIn }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(WeightIn)}</Space>
    ),
  },
  {
    width: 150,
    title: t('weight_out'),
    dataIndex: 'WeightOut',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WeightOut - b.WeightOut,
    render: (_, { WeightOut }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(WeightOut)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    title: t('balance_weight'),
    showAverage: true,
    dataIndex: 'BalWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalWeight - b.BalWeight,
    render: (_, { BalWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalWeight)}</Space>
    ),
  },
  {
    width: 180,
    showTotal: true,
    title: t('opening_amount'),
    dataIndex: 'OpAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OpAmount - b.OpAmount,
    render: (_, { OpAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpAmount)}</Space>
    ),
  },
  {
    width: 150,
    title: t('amount_in'),
    dataIndex: 'AmountIn',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AmountIn - b.AmountIn,
    render: (_, { AmountIn }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(AmountIn)}</Space>
    ),
  },
  {
    width: 150,
    title: t('amount_out'),
    dataIndex: 'AmountOut',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AmountOut - b.AmountOut,
    render: (_, { AmountOut }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(AmountOut)}</Space>
    ),
  },
  {
    width: 180,
    showTotal: true,
    title: t('balance_amount'),
    dataIndex: 'BalAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalAmount - b.BalAmount,
    render: (_, { BalAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalAmount)}</Space>
    ),
  },
];
