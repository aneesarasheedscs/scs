import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TWsRmStockTransferNotesDetailsList } from '../types';

export const detailColumns = (t?: any): AntColumnType<TWsRmStockTransferNotesDetailsList>[] => [
  {
    title: <>{t('item_name')}</>,
    width: 380,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('issued_qty')}</>,
    width: 100,
    showTotal: true,
    dataIndex: 'IssuedQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedQty - b.IssuedQty,
    render: (_, { IssuedQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(IssuedQty)}</span>
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
    width: 100,
    showTotal: true,
    dataIndex: 'BillWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BillWeight - b.BillWeight,
    render: (_, { BillWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(BillWeight)}</span>
    ),
  },
  {
    title: <>{t('item_rate')}</>,
    width: 120,
    showTotal: true,
    dataIndex: 'IssuedRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedRate - b.IssuedRate,
    render: (_, { IssuedRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(IssuedRate)}</span>
    ),
  },
  {
    title: <>{t('issued_amount')}</>,
    width: 150,
    showTotal: true,
    dataIndex: 'IssuedAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedAmount - b.IssuedAmount,
    render: (_, { IssuedAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(IssuedAmount)}
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
    width: 120,
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
    width: 350,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
];
