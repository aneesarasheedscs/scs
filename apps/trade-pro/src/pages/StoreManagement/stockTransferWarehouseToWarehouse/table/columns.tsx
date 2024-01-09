import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TStockTransferHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TStockTransferHistory>[] => [
  {
    title: <>{t('doc_no')}</>,
    dataIndex: 'DocNo',
    searchableInput: true,
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    title: <>{t('doc_date')}</>,
    dataIndex: 'DocDate',
    searchableDate: true,
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('entry_user')}</>,
    dataIndex: 'EntryUser',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('entry_date')}</>,
    dataIndex: 'EntryDate',
    searchableDate: true,
    render: (_, { EntryDate }) => formateDate(EntryDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('modify_user')}</>,
    dataIndex: 'ModifyUser',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ModifyUser.localeCompare(b.ModifyUser),
  },
  {
    title: <>{t('modify_date')}</>,
    searchableDate: true,
    dataIndex: 'ModifyDate',
    render: (_, { ModifyDate }) => formateDate(ModifyDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ModifyDate);
      const dateB = dayjs(b.ModifyDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('approved_user')}</>,
    dataIndex: ' ApprovedUser',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ApprovedUser.localeCompare(b.ApprovedUser),
  },
  {
    title: <>{t('approval_status')}</>,
    dataIndex: 'ApprovalStatus',

    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ApprovalStatus.localeCompare(b.ApprovalStatus),
  },
  {
    title: <>{t('approved_date')}</>,
    searchableDate: true,
    dataIndex: 'ApprovedDate',
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ApprovedDate);
      const dateB = dayjs(b.ApprovedDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',

    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('attachment')}</>,
    dataIndex: '',
    width: 150,
  },
  {
    title: <>{t('action')}</>,
    width: 130,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'black' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id), setActiveTab('2');
              }}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('detail')}>
          <Space>
            <AntButton
              type="text"
              icon={
                <EyeOutlined
                  style={{ color: 'blue', marginLeft: 4 }}
                  onClick={() => {
                    setSelectedRecordId(record?.Id);
                  }}
                />
              }
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
export const columns2 = (t: any, handleDeleteRow: any): AntColumnType<any>[] => [
  {
    title: <>{t('debit_amount')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    key: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 300,
    searchableInput: true,
    dataIndex: 'JobLotDescription',
    key: 'JobLotDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotId.localeCompare(b.JobLotId),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 300,
    key: 'DebitAmount',
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('remarks')}</>,
    width: 350,
    dataIndex: 'Remarks',
    key: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title={t('actions')}>
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'black' }} />}
            onClick={() => handleDeleteRow(record.key)}
          />
        </Space>
      </Tooltip>
    ),
  },
];
