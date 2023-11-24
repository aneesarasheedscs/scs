import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Tooltip } from 'antd';
import { TJobLotHistory } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (setSelectedRecordId?: any, t?: any): AntColumnType<TJobLotHistory>[] => [
  {
    title: <>{t('job_type')}</>,
    width: 190,
    searchableInput: true,
    dataIndex: 'JobType',
  },
  {
    title: <>{t('job_lot_code')}</>,
    width: 190,
    searchableInput: true,
    dataIndex: 'JobLotCode',
  },
  {
    title: <>{t('job_lot_description')}</>,
    width: 190,
    searchableInput: true,
    dataIndex: 'JobLotDescription',
  },
  {
    title: <>{t('start_date')}</>,
    width: 230,
    dataIndex: 'StartDate',
    render: (_, { StartDate }) => formateDate(StartDate),
  },
  {
    title: <>{t('end_date')}</>,
    width: 230,
    dataIndex: 'EndDate',
    render: (_, { EndDate }) => formateDate(EndDate),
  },
  {
    title: <>{t('job_status')}</>,
    width: 180,
    searchableInput: true,
    dataIndex: 'JobStatus',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobStatus.localeCompare(b.JobStatus),
  },
  {
    title: <>{t('entry_user')}</>,
    width: 180,
    dataIndex: 'EntryUser',
  },
  {
    title: <>{t('entry_date')}</>,
    width: 200,
    dataIndex: 'EntryDate',
    render: (_, { EntryDate }) => formateDate(EntryDate),
  },
  {
    title: <>{t('modify_user')}</>,
    width: 180,
    dataIndex: 'ModifyUser',
    searchableInput: true,
  },
  {
    title: <>{t('modify_date')}</>,
    width: 200,
    dataIndex: 'ModifyDate',
    render: (_, { ModifyDate }) => formateDate(ModifyDate),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => {
            setSelectedRecordId(record?.Id);
          }}
        />
      </Tooltip>
    ),
  },
];
