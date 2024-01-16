import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TWsRmWareHouseToWareHouseStocTransferDetailList } from '../types';

export const detailColumns = (t?: any): AntColumnType<TWsRmWareHouseToWareHouseStocTransferDetailList>[] => [
  {
    title: t('item_name'),
    width: 280,
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
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(NetWeight)}</span>
    ),
  },
  {
    title: t('pack_uom'),
    width: 150,
    searchableInput: true,
    dataIndex: 'ItemUomCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemUomCode.localeCompare(b.ItemUomCode),
  },
  {
    title: t('net_weight'),
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
    width: 180,
    dataIndex: 'WarehouseToName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WarehouseToName.localeCompare(b.WarehouseToName),
  },
  {
    title: t('remarks'),
    width: 170,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
];
