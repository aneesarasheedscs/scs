import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';

export const columns = (setSelectedRecordId?: any, t?: any): AntColumnType<TItemCategoryTable>[] => [
  { title: t('serial_no'), dataIndex: 'Id', width: 100 },

  {
    width: 200,
    searchableInput: true,
    title: t('item_category'),
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('item_description'),
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 150,
    searchableInput: true,
    title: t('serial_from'),
    dataIndex: 'SerialFrom',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.SerialFrom.localeCompare(b.SerialFrom),
  },
  {
    width: 150,
    searchableInput: true,
    title: t('serial_to'),
    dataIndex: 'SerialTo',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.SerialTo.localeCompare(b.SerialTo),
  },
  {
    width: 250,
    searchableInput: true,
    title: t('purchase_account_GL'),
    dataIndex: 'InventoryAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.InventoryAccountTitle.localeCompare(b.InventoryAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('sale_account_GL'),
    dataIndex: 'RevenueAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RevenueAccountTitle.localeCompare(b.RevenueAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('cgs_account_GL'),
    dataIndex: 'CGSAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CGSAccountTitle.localeCompare(b.CGSAccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('parent_category'),
    dataIndex: 'InvParentCateDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.InvParentCateDescription.localeCompare(b.InvParentCateDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('item_class_group'),
    dataIndex: 'ClassGroupName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ClassGroupName.localeCompare(b.ClassGroupName),
  },
  {
    width: 100,
    title: t('action'),
    dataIndex: '',
    render: (_, record) => (
      <Tooltip title={t('edit')}>
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'black' }} />}
          onClick={() => setSelectedRecordId(record?.Id)}
        />
      </Tooltip>
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
