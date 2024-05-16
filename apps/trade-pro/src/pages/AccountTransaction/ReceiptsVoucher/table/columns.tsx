import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { Space, Tooltip } from 'antd';
import { DataType, TReceiptsDetailEntry } from '../form/types';
import { TBankReceiptVoucherTable } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';

export const columns = (
  t: TFunction,
  setSelectedRecordId: (id: number | null) => void,
  setActiveTab: (tab: string) => void,
  setSelectedRecordDetailId: (id: number | null) => void
): AntColumnType<TBankReceiptVoucherTable>[] => [
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
    width: 110,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: t('voucher_date'),
    width: 150,
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
    title: t('cheque_no'),
    width: 140,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo - b.CheqNo,
  },
  {
    title: t('remarks'),
    width: 200,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('entry_user'),
    width: 160,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: t('entry_date'),
    dataIndex: 'EntryDate',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    searchableDate: true,
    render: (_, { EntryDate }) => formateDate(EntryDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    width: 150,
  },

  {
    title: t('attachment'),
    width: 100,
    dataIndex: 'Attachment',
  },
  {
    title: t('action'),
    width: 80,
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
                setSelectedRecordDetailId(record.Id);
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
  handleDeleteRow: (record: TReceiptsDetailEntry) => void,
  handleEditRow: (record: TReceiptsDetailEntry, index: number) => void
): AntColumnType<TReceiptsDetailEntry>[] => [
  {
    title: t('payment_type'),
    width: 250,
    searchableInput: true,
    dataIndex: 'PaymentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentType.localeCompare(b.PaymentType),
  },
  {
    title: t('credit_account'),
    width: 300,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('job_lot'),
    width: 200,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: t('remarks'),
    width: 420,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    align: 'right',
    title: t('amount'),
    width: 200,
    dataIndex: 'CreditAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</span>
    ),
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
              onClick={() => handleDeleteRow(record)}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
