import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import { TItemHistoryTable } from '../../type';

export const columns = (): AntColumnType<TItemTypeHistory>[] => [
  { title: 'Sr#', dataIndex: 'Id', width: 100 },
  {
    title: 'Item Code',
    dataIndex: 'TypeCode',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeCode.localeCompare(b.TypeCode),
  },

  {
    width: 300,
    searchableInput: true,
    title: 'Item Description',
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },
  {
    width: 300,
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
export type TItemTypeHistory = {
  Id: number;
  TypeCode: string;
  TypeDescription: string;
  Type: number;
  EntryDate: Date;
  EntryUser: number;
  ModifyDate: Date;
  ModifyUser: number;
  PostDate: number | boolean;
  PostUser: number;
  PostState: boolean | string;
  OrganizationId: number;
  CompanyId: number;
  ItemCategoryId: number;
  LookupName: string;
};
