import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TInventoryEvaluationLedger } from '../types';
import dayjs from 'dayjs';
import { Space } from 'antd';

export const columns = (t?: any): AntColumnType<TInventoryEvaluationLedger>[] => [
  {
    title: t('document_no'),
    dataIndex: 'DocNo',
    width: 140,
  },
  {
    title: t('transaction_date'),
    dataIndex: 'TranDate',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    render: (_, { TranDate }) => formateDate(TranDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.TranDate);
      const dateB = dayjs(b.TranDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 300,
    title: t('document_type'),
    dataIndex: 'DocumentTypeDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeDescription.localeCompare(b.DocumentTypeDescription),
  },

  {
    title: t('party_name'),
    dataIndex: 'PartyName',

    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PartyName.localeCompare(b.PartyName),
  },

  {
    width: 250,
    searchableInput: true,
    title: t('ware_house_code'),
    dataIndex: 'WareHouseCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseCode.localeCompare(b.WareHouseCode),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('item_category'),
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 180,
    title: t('item_type'),
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },
  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    width: 150,
    title: t('pack_size'),
    dataIndex: 'PackSize',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackSize.localeCompare(b.PackSize),
  },
  {
    width: 150,
    showTotal: true,
    title: t('quantity_in'),
    showAverage: true,
    dataIndex: 'QtyIn',
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
    width: 160,
    showTotal: true,
    title: t('balance_quantity'),
    dataIndex: 'BalQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalQty - b.BalQty,
    render: (_, { BalQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalQty)}</Space>
    ),
  },
  {
    width: 140,
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
    showTotal: true,
    title: t('weight_out'),
    dataIndex: 'WeightOut',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WeightOut - b.WeightOut,
    render: (_, { WeightOut }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(WeightOut)}</Space>
    ),
  },
  {
    width: 180,
    showTotal: true,
    title: t('balance_weight'),
    dataIndex: 'BalWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalWeight - b.BalWeight,
    render: (_, { BalWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BalWeight)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    title: t('item_rate'),
    dataIndex: 'ItemRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemRate - b.ItemRate,
    render: (_, { ItemRate }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ItemRate)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    title: t('amount_in'),
    dataIndex: 'AmountIn',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AmountIn - b.AmountIn,
    render: (_, { AmountIn }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(AmountIn)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    title: t('amount_out'),
    dataIndex: 'AmountOut',
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
