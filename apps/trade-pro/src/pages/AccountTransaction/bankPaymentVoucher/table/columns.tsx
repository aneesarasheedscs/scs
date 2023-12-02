import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { TBankPaymentVoucherTable } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TBankPaymentVoucherTable>[] => [
  {
    title: <>{t('document_type_code')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('voucher_code')}</>,
    width: 190,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('voucher_date')}</>,
    width: 200,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
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
    title: <>{t('remarks')}</>,
    width: 220,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('voucher_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '20%' }}>
        {numberFormatter(VoucherAmount)}
      </span>
    ),
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
    title: <>{t('cheque_no')}</>,
    width: 200,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('attachment')}</>,
    width: 150,
    dataIndex: 'Attachment',
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
              icon={<EyeOutlined style={{ color: 'blue', marginLeft: 4 }} />}
              onClick={() => {
                setSelectedRecordId(record.Id);
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
    title: <>{t('payment_type')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'PaymentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PaymentType.localeCompare(b.PaymentType),
  },
  {
    title: <>{t('debit_account')}</>,
    width: 250,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 130,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 130,
    dataIndex: 'DebitAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    title: <>{t('cheque_date')}</>,
    width: 140,
    dataIndex: 'DCheqDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { DCheqDate }) => formateDate(DCheqDate),
  },
  {
    title: <>{t('cheque_no')}</>,
    width: 100,
    dataIndex: 'CheqNoDetail',
  },
  {
    title: <>{t('payee_title')}</>,
    width: 150,
    dataIndex: 'PayeeTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PayeeTitle.localeCompare(b.PayeeTitle),
  },
  {
    title: <>{t('remarks')}</>,
    width: 220,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
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
