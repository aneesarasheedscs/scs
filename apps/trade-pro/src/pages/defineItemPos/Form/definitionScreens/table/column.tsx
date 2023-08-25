import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';

export const columns = (): AntColumnType<TItemCategoryTable>[] => [
  { title: 'Sr#', dataIndex: 'Id', width: 50 },

  {
    width: 200,
    searchableInput: true,
    title: 'Category Code',
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Description',
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 150,
    searchableInput: true,
    title: 'Serial From',
    dataIndex: 'SerialFrom',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.SerialFrom.localeCompare(b.SerialFrom),
  },
  {
    width: 150,
    searchableInput: true,
    title: 'Serial To',
    dataIndex: 'SerialTo',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.SerialTo.localeCompare(b.SerialTo),
  },
  {
    width: 250,
    searchableInput: true,
    title: 'Purchase Account',
    dataIndex: 'InventoryAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.InventoryAccountTitle.localeCompare(b.InventoryAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Sale Account',
    dataIndex: 'RevenueAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RevenueAccountTitle.localeCompare(b.RevenueAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'CGS Account',
    dataIndex: 'CGSAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CGSAccountTitle.localeCompare(b.CGSAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Parent Category',
    dataIndex: 'InvParentCateDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.InvParentCateDescription.localeCompare(b.InvParentCateDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Class Group',
    dataIndex: 'ClassGroupName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ClassGroupName.localeCompare(b.ClassGroupName),
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

export type TItemCategoryTable = {
  Id: number;
  CategoryCode: string;
  CategoryDescription: string;
  SerialFrom: number;
  SerialTo: number;
  InventoryParentCategoriesId: number;
  CategoryStatus: string;
  InvParentCateDescription: string;
  RevenueAccountId: number;
  InventoryAccountId: number;
  CGSAccountId: number;
  CGSAccountTitle: string;
  RevenueAccountTitle: string;
  InventoryAccountTitle: string;
  ClassGroupName: string;
};
