import dayjs from 'dayjs';
import { Space, Tooltip } from 'antd';
import { DataType, TCashPaymentDetailEntry } from '../form/types';
import { AntButton } from '@tradePro/components';
import { TCashPaymentVoucherTable } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';

export const columns = (
  t: TFunction,
  setSelectedRecordId: (id: number | null) => void,
  setActiveTab: (tab: string) => void,
  setSelectedRecordIdforDetail: (id: number | null) => void
): AntColumnType<TCashPaymentVoucherTable>[] => [
  {
    title: t('code'),
    width: 110,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
    showCount: true,
  },
  {
    title: t('type'),
    width: 110,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: t('voucher_date'),
    width: 160,
    dataIndex: 'VoucherDate',
    searchableDate: true,
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('account_title'),
    width: 200,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    align: 'right',
    title: t('voucher_amount'),
    width: 170,
    showTotal: true,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
  },

  {
    title: t('entry_user'),
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
    width: 160,
  },
  {
    title: t('entry_date'),
    dataIndex: 'EntryDate',
    sortDirections: ['ascend', 'descend'],
    searchableDate: true,
    render: (_, { EntryDate }) => formateDate(EntryDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    width: 160,
  },
  {
    title: t('remarks'),
    width: 260,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('attachments'),
    width: 150,
    dataIndex: 'Attachment',
  },
  {
    title: t('action'),
    width: 100,
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
              icon={<EyeTwoTone style={{ color: 'blue', marginLeft: 4 }} />}
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

export const detailEntrycolumns = (
  t: TFunction,
  handleDeleteRow: (record: TCashPaymentDetailEntry, index: number) => void,
  handleEditRow: (record: TCashPaymentDetailEntry, index: number) => void
): AntColumnType<TCashPaymentDetailEntry>[] => [
  {
    title: t('payment_type'),
    width: 200,
    searchableInput: true,
    showCount: true,
    dataIndex: 'PaymentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentType.localeCompare(b.PaymentType),
  },
  {
    title: t('debit_account'),
    width: 350,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('job_lot'),
    width: 250,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 200,
    dataIndex: 'DebitAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    title: t('remarks'),
    width: 370,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: t('action'),
    width: 100,
    render: (_, record, index) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => handleEditRow(record, index)}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <Space>
            <AntButton
              type="text"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => handleDeleteRow(record, index)}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
