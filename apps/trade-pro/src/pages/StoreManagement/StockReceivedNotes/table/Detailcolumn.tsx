import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TWsRmStockReceivedNotesDetailList } from '../types';

export const detailColumns = (t?: any): AntColumnType<TWsRmStockReceivedNotesDetailList>[] => [
  {
    title: <>{t('item_name')}</>,
    width: 360,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('rec_qty')}</>,
    width: 120,
    showTotal: true,

    dataIndex: 'ReceivedQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedQty - b.ReceivedQty,
    render: (_, { ReceivedQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ReceivedQty)}</span>
    ),
  },
  {
    title: <>{t('pack_uom')}</>,
    width: 140,
    searchableInput: true,
    dataIndex: 'UOMCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UOMCode.localeCompare(b.UOMCode),
  },
  {
    title: <>{t('weight')}</>,
    width: 120,
    showTotal: true,

    dataIndex: 'BillWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BillWeight - b.BillWeight,
    render: (_, { BillWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(BillWeight)}</span>
    ),
  },
  {
    title: <>{t('rec_rate')}</>,
    width: 130,
    showTotal: true,
    dataIndex: 'ReceivedRate',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedRate - b.ReceivedRate,
    render: (_, { ReceivedRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ReceivedRate)}
      </span>
    ),
  },
  {
    title: <>{t('rec_amount')}</>,
    width: 140,
    showTotal: true,
    dataIndex: 'ReceivedAmount',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedAmount - b.ReceivedAmount,
    render: (_, { ReceivedAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ReceivedAmount)}
      </span>
    ),
  },
  {
    title: <>{t('expense')}</>,
    width: 110,
    showTotal: true,

    dataIndex: 'ExpenseAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ExpenseAmount - b.ExpenseAmount,
    render: (_, { ExpenseAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ExpenseAmount)}
      </span>
    ),
  },
  {
    title: <>{t('net_amount')}</>,
    width: 140,
    showTotal: true,

    dataIndex: 'ItemNetAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemNetAmount - b.ItemNetAmount,
    render: (_, { ItemNetAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ItemNetAmount)}
      </span>
    ),
  },

  {
    title: <>{t('remarks')}</>,
    width: 300,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
];
