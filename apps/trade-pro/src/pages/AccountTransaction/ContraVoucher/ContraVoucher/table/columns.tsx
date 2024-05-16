import dayjs from 'dayjs';
import { Space, Tooltip } from 'antd';
import { TContraVoucherHistory } from './types';
import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditFilled, DeleteOutlined, EyeOutlined, EyeTwoTone } from '@ant-design/icons';
import { TFunction } from 'i18next';

export const columns = (
  t: TFunction,
  setSelectedRecordId: (Id: number | null) => void,
  setSelectedRecordIdforDetail: (Id: number | null) => void,
  setActiveTab: (tab: string) => void
): AntColumnType<TContraVoucherHistory>[] => [
  {
    title: t('code'),
    width: 100,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: t('type'),
    width: 100,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },

  {
    title: t('voucher_date'),
    width: 150,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: t('account_title'),
    width: 240,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    align: 'right',
    title: t('voucher_amount'),
    width: 160,
    dataIndex: 'VoucherAmount',
    showTotal: true,
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
  },
  {
    title: t('user_name'),
    width: 160,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: t('cheque_no'),
    width: 150,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo - b.CheqNo,
  },
  {
    title: t('remarks'),
    width: 250,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('attachment'),
    width: 150,
    dataIndex: 'Attachment',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Attachment - b.Attachment,
  },
  {
    fixed: 'right',
    title: t('action'),
    width: 90,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
          <Space style={{ position: 'absolute', top: 10, left: 10 }}>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id), setActiveTab('2');
              }}
            />
          </Space>
        </Tooltip>
        <Tooltip title="View Detail">
          <Space style={{ position: 'absolute', top: 10, right: 10 }}>
            <AntButton
              type="text"
              icon={<EyeTwoTone style={{}} />}
              onClick={() => {
                setSelectedRecordIdforDetail(record.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];

export const columns2 = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<any>[] => [
  {
    title: t('debit_account'),
    width: 410,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('job_lot'),
    width: 300,
    searchableInput: true,
    dataIndex: 'JobLotDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotId.localeCompare(b.JobLotId),
  },
  {
    title: t('debit_amount'),
    width: 300,
    align: 'right',
    showTotal: true,
    dataIndex: 'DebitAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    title: t('remarks'),
    width: 430,
    dataIndex: 'Comments',

    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: t('action'),
    width: 100,

    render: (_, record) => (
      <Tooltip title={t('actions')}>
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: '#006640' }} />}
            onClick={() => handleEditRow(record)}
          />
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            onClick={() => handleDeleteRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];
