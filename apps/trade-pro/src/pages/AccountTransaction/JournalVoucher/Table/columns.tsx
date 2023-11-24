import { EditFilled, PrinterOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Button, Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TJournalVoucherHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TJournalVoucherHistory>[] => [
  {
    title: <>{t('document_type_code')}</>,
    width: 200,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('voucher_code')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: <>{t('voucher_date')}</>,
    width: 200,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    title: <>{t('voucher_amount')}</>,
    width: 160,
    dataIndex: 'VoucherAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => <span>{numberFormatter(VoucherAmount)}</span>,
  },
  {
    title: <>{t('user_name')}</>,
    width: 220,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },

  {
    title: <>{t('attachment')}</>,
    width: 150,
    dataIndex: 'CheqNo',
    searchableInput: true,
  },
  {
    title: <>{t('action')}</>,
    width: 150,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
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
        <Tooltip title="View Detail">
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
        <Tooltip title="Delete">
          <Space>
            <AntButton type="text" icon={<DeleteOutlined style={{ color: 'red', marginLeft: 4 }} />} />
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
