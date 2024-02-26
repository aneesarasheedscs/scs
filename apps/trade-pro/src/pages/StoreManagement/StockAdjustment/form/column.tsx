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
    title: t('item_name'),
    width: 320,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    showCount: true,
  },
  {
    title: t('where_house'),
    width: 250,
    searchableInput: true,
    dataIndex: 'WareHouseName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
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
    dataIndex: 'Qty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Qty - b.Qty,
    render: (_, { Qty }) => <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Qty)}</span>,
  },

  {
    align: 'right',
    title: t('weight'),
    width: 150,
    showTotal: true,
    dataIndex: 'NetWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NetWeight - b.NetWeight,
    render: (_, { NetWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(NetWeight)}</span>
    ),
  },
  {
    align: 'right',
    title: t('item_price'),
    width: 150,
    showTotal: true,
    dataIndex: 'ItemRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemRate - b.ItemRate,
    render: (_, { ItemRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ItemRate)}</span>
    ),
  },
  {
    title: t('rate_uom'),
    width: 160,
    searchableInput: true,
    dataIndex: 'RateUom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RateUom.localeCompare(b.RateUom),
  },
  {
    align: 'right',
    title: t('amount'),
    width: 150,
    showTotal: true,
    dataIndex: 'Amount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Amount - b.Amount,
    render: (_, { Amount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Amount)}</span>
    ),
  },
  {
    title: t('account_title'),
    width: 300,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
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
