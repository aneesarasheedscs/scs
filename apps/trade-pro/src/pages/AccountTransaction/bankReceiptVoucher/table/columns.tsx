import { EditFilled, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { TBankReceiptVoucherTable } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';
import dayjs from 'dayjs';
export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TBankReceiptVoucherTable>[] => [
  {
    title: <>{t('code')}</>,
    width: 120,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('type')}</>,
    width: 120,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('voucher_date')}</>,
    width: 200,
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
    title: <>{t('account_title')}</>,
    width: 180,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('voucher_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
  },
  {
    title: <>{t('cheque_no')}</>,
    width: 120,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('remarks')}</>,
    width: 220,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('entry_user')}</>,
    width: 160,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: <>{t('entry_date')}</>,
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
    width: 160,
  },
  {
    title: <>{t('status')}</>,
    dataIndex: 'IsApproved',
    render: (IsApproved) => (
      <Space
        style={{
          backgroundColor: IsApproved ? '#00A148' : '#f37daa',
          color: 'white',
          borderRadius: '5px',
          width: '95%',
          paddingLeft: 8,
          border: '1px ridge white',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
          position: 'absolute',
          top: 8,
          left: 0,
        }}
      >
        {IsApproved ? 'Approved' : 'Not Approved'}
      </Space>
    ),
    width: 120,
  },
  {
    title: <>{t('attachment')}</>,
    width: 180,
    dataIndex: 'Attachment',
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId(record?.Id), setActiveTab('2');
            }}
          />
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', marginLeft: '-1rem' }} />} />
        </Space>
      </Tooltip>
    ),
  },
];

export const column2 = (t: any, handleDeleteRow?: any, handleEditRow?: any): AntColumnType<DataType>[] => [
  {
    title: <>{t('payment_type')}</>,
    width: 260,
    searchableInput: true,
    dataIndex: 'PaymentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentType.localeCompare(b.PaymentType),
  },
  {
    title: <>{t('credit_account')}</>,
    width: 260,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 260,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: <>{t('remarks')}</>,
    width: 260,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: <>{t('amount')}</>,
    width: 260,
    dataIndex: 'CreditAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('action')}</>,
    width: 150,
    render: (_, record) => (
      <Tooltip title="Delete">
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            onClick={() => handleDeleteRow(record)}
          />
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'blue' }} />}
            onClick={() => handleEditRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];
