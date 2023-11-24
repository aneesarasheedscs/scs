import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Checkbox, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';

export const columns = (setSelectedRecordId?: any, t?: any): AntColumnType<TItemUOMHistory>[] => [
  { title: <>{t('serial_no')} </>, dataIndex: 'Id', width: 100 },
  {
    title: <>{t('code')}</>,
    dataIndex: 'UOMCode',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UOMCode.localeCompare(b.UOMCode),
  },
  {
    width: 300,
    title: <>{t('equivalent')} </>,
    dataIndex: 'Equivalent',
    sortDirections: ['ascend', 'descend'],
  },
  {
    width: 300,
    title: <>{t('status')} </>,
    dataIndex: 'UOMStatus',
    render: (UOMStatus, record) => (
      <Tooltip title="Status">
        <Checkbox checked={UOMStatus} />
      </Tooltip>
    ),
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
          onClick={() => setSelectedRecordId(record?.Id)}
        />
      </Tooltip>
    ),
  },
];
export type TItemUOMHistory = {
  Id: number;
  UOMCode: string;
  UOMDescription: string;
  UOMSymbol: string;
  Equivalent: number;
  UOMStatus: boolean;
  EntryDate: string;
  EntryUser: number;
  ModifyDate: string;
  ModifyUser: number;
  OrganizationId: number;
  CompanyId: number;
};
