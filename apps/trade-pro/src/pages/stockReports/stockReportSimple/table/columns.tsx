import { AntColumnType } from '@tradePro/globalTypes';
import { TStockReportTable } from './types';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Link } from 'react-router-dom';

export const columns = (t: any): AntColumnType<TStockReportTable>[] => [
  {
    title: <>{t('item_name')}</>,
    width: 250,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.ItemName);
      const dateB = dayjs(b.ItemName);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ItemName }) => <Link to={`/inventory-transaction-report-retail`}>{ItemName}</Link>,
  },

  {
    title: <>{t('pack_uom')}</>,
    width: 210,
    dataIndex: 'PackUom',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.PackUom);
      const dateB = dayjs(b.PackUom);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('total_qty')}</>,
    width: 210,
    dataIndex: 'TotalQty',
    showTotal: true,
    render: (_, { TotalQty }) => <span>{numberFormatter(TotalQty)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.TotalQty);
      const dateB = dayjs(b.TotalQty);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('op_weight')}</>,
    dataIndex: 'OpWeight',
    width: 210,
    render: (_, { OpWeight }) => <span>{numberFormatter(OpWeight)}</span>,
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.OpWeight);
      const dateB = dayjs(b.OpWeight);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('weight_in')}</>,
    dataIndex: 'WeightIn',
    width: 210,
    render: (_, { WeightIn }) => <span>{numberFormatter(WeightIn)}</span>,
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.WeightIn);
      const dateB = dayjs(b.WeightIn);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('weight_out')}</>,
    dataIndex: 'WeightOut',
    width: 210,
    render: (_, { WeightOut }) => <span>{numberFormatter(WeightOut)}</span>,
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.WeightOut);
      const dateB = dayjs(b.WeightOut);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('bal_weight')}</>,
    dataIndex: 'BalWeight',
    width: 210,
    showTotal: true,
    render: (_, { BalWeight }) => <span>{numberFormatter(BalWeight)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.BalWeight);
      const dateB = dayjs(b.BalWeight);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
];
