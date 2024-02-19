import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';
import dayjs from 'dayjs';
import { TBillsPayableAccountsHistory } from '../types';
export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordDetailId?: any
): AntColumnType<TBillsPayableAccountsHistory>[] => [
  {
    title: t('code'),
    width: 120,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
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
    width: 140,
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
    width: 230,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    align: 'right',
    title: t('voucher_amount'),
    width: 150,
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
    width: 170,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  // {
  //   title: t('cheque_date'),
  //   dataIndex: 'ChequeDate',
  //   sortDirections: ['ascend', 'descend'],
  //   searchableDate: true,
  //   render: (_, { ChequeDate }) => formateDate(ChequeDate),
  //   sorter: (a, b) => {
  //     const dateA = dayjs(a.ChequeDate);
  //     const dateB = dayjs(b.ChequeDate);
  //     return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
  //   },
  //   width: 140,
  // },
  {
    title: t('remarks'),
    width: 220,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('user_name'),
    width: 200,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },

  {
    title: t('attachments'),
    width: 150,
    dataIndex: 'Attachment',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t('action'),
    width: 91,
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
                setSelectedRecordDetailId(record.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];

export const column2 = (t: any, handleDeleteRow?: any, handleEditRow?: any): AntColumnType<DataType>[] => [
  {
    title: t('payment_type'),
    width: 150,
    showCount: true,
    searchableInput: true,
    dataIndex: 'PaymentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentType.localeCompare(b.PaymentType),
  },
  {
    title: t('debit_account'),
    width: 250,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('job_lot'),
    width: 150,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 130,
    dataIndex: 'DebitAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    title: t('cheque_date'),
    width: 140,
    dataIndex: 'DCheqDate',
    searchableDate: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DCheqDate);
      const dateB = dayjs(b.DCheqDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { DCheqDate }) => formateDate(DCheqDate),
  },
  {
    title: t('cheque_no'),
    width: 120,
    dataIndex: 'CheqNoDetail',
    sorter: (a, b) => a.CheqNoDetail - b.CheqNoDetail,
    render: (_, { CheqNoDetail }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CheqNoDetail)}</span>
    ),
  },
  {
    title: t('payee_title'),
    width: 230,
    dataIndex: 'PayeeTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PayeeTitle.localeCompare(b.PayeeTitle),
  },
  {
    title: t('remarks'),
    width: 211,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: t('action'),
    width: 90,
    render: (_, record) => (
      <Tooltip title="Delete">
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
