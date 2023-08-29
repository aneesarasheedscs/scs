import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';

export const columns = (handleOpen: (id: number) => void, t: any): AntColumnType<TItemTypeHistory>[] => [
  { title: <>{t('serial_no')} </>, dataIndex: 'Id', width: 100 },
  {
    title: <>{t('code')} </>,
    dataIndex: 'TypeCode',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeCode.localeCompare(b.TypeCode),
  },

  {
    width: 300,
    searchableInput: true,
    title: <>{t('item_description')} </>,
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('item_type')} </>,
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },

  {
    width: 100,
    title: <>{t('action')} </>,
    dataIndex: '',
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'black' }} />}
          onClick={() => handleOpen(record?.Id)}
        />
      </Tooltip>
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
