import { TPurchaseOrderHistory } from '../../purchaseTrading/purchaseOrder/type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Button, Popconfirm, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
export const columns = (): AntColumnType<TPurchaseOrderHistory>[] => [
  { title: 'Sr#', dataIndex: 'Id', width: 100 },

  {
    width: 150,
    searchableInput: true,
    title: 'Profile Pic',
    dataIndex: '',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    width: 300,
    searchableInput: true,
    title: 'Item Name',
    dataIndex: 'SupplierName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: 'Item Code',
    dataIndex: '',
    width: 100,
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: 'UOM Code',
    dataIndex: '',
    width: 100,
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: 'Type',
    dataIndex: '',
    width: 200,
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: 'Category',
    dataIndex: 'ItemName',
    width: 200,
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: 'Stock GI A/c',
    dataIndex: '',
    width: 120,
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    width: 120,
    title: 'Sale GI A/c',
    dataIndex: '',
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    width: 120,
    title: 'CGS GI A/c',
    dataIndex: '',
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    width: 100,
    title: 'Action',
    dataIndex: '',
    render: (_, record: { key: React.Key }) => (
      <Space size="middle" style={{ marginTop: -15, position: 'absolute', top: 20 }}>
        <Popconfirm title="Sure to Edit?" onConfirm={() => handleEdit(record.key)}>
          <AntButton icon={<EditFilled />} type="default"></AntButton>
        </Popconfirm>
      </Space>
    ),
  },
];
