import { TFunction } from 'i18next';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { InvStockAdjustmentDetail } from '../types';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (
  t: TFunction,
  handleDeleteRow: (record: InvStockAdjustmentDetail) => void,
  handleEditRow: (record: InvStockAdjustmentDetail) => void
): AntColumnType<InvStockAdjustmentDetail>[] => [
  {
    title: t('where_house'),
    width: 320,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    showCount: true,
  },
  {
    title: t('item_name'),
    width: 320,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    showCount: true,
  },
  {
    title: t('pack_uom'),
    width: 160,
    searchableInput: true,
    dataIndex: 'PackUom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    align: 'right',
    title: t('item_qty'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqQty - b.ReqQty,
    render: (_, { ReqQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ReqQty)}</span>
    ),
  },

  {
    align: 'right',
    title: t('weight'),
    width: 150,
    showTotal: true,
    dataIndex: 'BillWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BillWeight - b.BillWeight,
    render: (_, { BillWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BillWeight)}</span>
    ),
  },
  {
    align: 'right',
    title: t('item_price'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqRate - b.ReqRate,
    render: (_, { ReqRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ReqRate)}</span>
    ),
  },
  {
    title: t('rate_uom'),
    width: 160,
    searchableInput: true,
    dataIndex: 'PackUom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    align: 'right',
    title: t('amount'),
    width: 150,
    showTotal: true,
    dataIndex: 'ReqAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReqAmount - b.ReqAmount,
    render: (_, { ReqAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ReqAmount)}</span>
    ),
  },
  {
    title: t('account_title'),
    width: 160,
    searchableInput: true,
    dataIndex: 'PackUom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: t('comments'),
    width: 350,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
  {
    title: t('action'),
    width: 96,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <Space style={{ position: 'absolute', top: 10, left: 15 }}>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => handleEditRow(record)}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <Space style={{ position: 'absolute', top: 10, right: 10 }}>
            <AntButton
              type="text"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => handleDeleteRow(record)}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
