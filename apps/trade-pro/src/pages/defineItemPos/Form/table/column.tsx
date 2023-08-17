import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import { TItemHistoryTable } from '../../type';

export const columns = (): AntColumnType<TItemHistoryTable>[] => [
  { title: 'Item Code', dataIndex: 'ItemCode', width: 100 },

  {
    width: 250,
    searchableInput: true,
    title: 'Item Name',
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Item Category',
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Item Type',
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },

  {
    width: 100,
    title: 'Action',
    dataIndex: '',
    render: (_, record) => (
      <Space size="middle" style={{ marginTop: -15, position: 'absolute', top: 20 }}>
        <Popconfirm title="Sure to Edit?">
          <AntButton icon={<EditFilled />} type="default"></AntButton>
        </Popconfirm>
      </Space>
    ),
  },
];
