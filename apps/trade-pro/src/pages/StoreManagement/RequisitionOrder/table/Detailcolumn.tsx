import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TWsRmRequisitionPoDetailsList } from '../types';

export const detailColumns = (t?: any): AntColumnType<TWsRmRequisitionPoDetailsList>[] => [
  {
    title: t('item_name'),
    width: 400,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: t('item_qty'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqQty - b.ReqQty,
    render: (_, { ReqQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ReqQty)}</span>
    ),
  },
  {
    title: t('pack_uom'),
    width: 150,
    searchableInput: true,
    dataIndex: 'PackUom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: t('weight'),
    width: 150,
    showTotal: true,
    dataIndex: 'BillWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BillWeight - b.BillWeight,
    render: (_, { BillWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(BillWeight)}</span>
    ),
  },
  {
    title: t('item_rate'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqRate - b.ReqRate,
    render: (_, { ReqRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ReqRate)}</span>
    ),
  },
  {
    title: t('amount'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqAmount - b.ReqAmount,
    render: (_, { ReqAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ReqAmount)}</span>
    ),
  },

  {
    title: t('remarks'),
    width: 420,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
];
