import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Checkbox, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';

export const columns = (setSelectedRecordId?: any, t?: any): AntColumnType<TItemScheduleUOMHistory>[] => [
  { title: <>{t('serial_no')} </>, dataIndex: 'Id', width: 100 },
  {
    title: <>{t('item_name')} </>,
    dataIndex: 'ItemName',
    width: 350,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('schedule_unit')}</>,
    dataIndex: 'UOMDescription',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UOMDescription.localeCompare(b.UOMDescription),
  },
  {
    width: 180,
    title: <>{t('equivalent')}</>,
    dataIndex: 'Equivalent',
  },
  {
    width: 160,
    title: <>{t('base_pack_uom')}</>,
    dataIndex: 'BaseRateUom',
    render: (BaseRateUom, record) => (
      <Tooltip title="Status">
        <Checkbox checked={BaseRateUom} style={{ marginLeft: '15px' }} />
      </Tooltip>
    ),
  },

  {
    width: 100,
    title: <>{t('action')}</>,
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
export type TItemScheduleUOMHistory = {
  Id: number;
  ItemId: number;
  ScheduleUnitId: number;
  Equivalent: number;
  BaseRateUom: boolean;
  EntryDate: string;
  EntryUser: number;
  ModifyDate: string;
  ModifyUser: number;
  OrganizationId: number;
  CompanyId: number;
  UOMDescription: string;
  ItemName: string;
  UOMCode: string;
};
