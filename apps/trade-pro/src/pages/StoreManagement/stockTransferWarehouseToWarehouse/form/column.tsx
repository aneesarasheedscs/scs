import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { Popconfirm, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TJournalVoucherData, TVoucherDetailList, TWsRmWareHouseToWareHouseStocTransferDetailList } from '../types';

export const columns = (
  t: any,
  handleDeleteRow: any,
  handleEditRow: any
): AntColumnType<TWsRmWareHouseToWareHouseStocTransferDetailList>[] => [
  {
    title: t('item_name'),
    width: 250,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: t('ware_house_from'),
    width: 200,
    searchableInput: true,
    dataIndex: 'WarehouseFromName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WarehouseFromName.localeCompare(b.WarehouseFromName),
  },
  {
    title: t('item_qty'),
    width: 150,
    showTotal: true,
    dataIndex: 'NetWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NetWeight - b.NetWeight,
    render: (_, { NetWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '20%' }}>{numberFormatter(NetWeight)}</span>
    ),
  },
  {
    title: t('pack_uom'),
    width: 130,
    searchableInput: true,
    dataIndex: 'ItemUomCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemUomCode.localeCompare(b.ItemUomCode),
  },
  {
    title: t('weight'),
    width: 130,
    showTotal: true,
    dataIndex: 'NetWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NetWeight - b.NetWeight,
    render: (_, { NetWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(NetWeight)}</span>
    ),
  },
  {
    title: t('item_rate'),
    width: 130,
    dataIndex: 'ItemRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemRate - b.ItemRate,
    render: (_, { ItemRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ItemRate)}</span>
    ),
  },
  {
    title: t('item_amount'),
    width: 130,
    showTotal: true,
    dataIndex: 'ItemAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemAmount - b.ItemAmount,
    render: (_, { ItemAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ItemAmount)}</span>
    ),
  },
  {
    title: t('ware_house_to'),
    width: 150,
    dataIndex: 'WarehouseToName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WarehouseToName.localeCompare(b.WarehouseToName),
  },
  {
    title: t('remarks'),
    width: 150,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
  {
    title: t('action'),
    width: 120,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'blue' }} />}
              onClick={() => handleEditRow(record)}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <Space>
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
