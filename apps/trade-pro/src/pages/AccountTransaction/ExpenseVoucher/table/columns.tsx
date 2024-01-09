import { EditFilled, PrinterOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { TExpenseVoucherHistory } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TExpenseVoucherHistory>[] => [
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
    width: 200,
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
    width: 200,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('remarks')}</>,
    width: 200,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('voucher_amount')}</>,
    width: 200,
    dataIndex: 'VoucherAmount',
    showTotal: true,
    render: (_, { VoucherAmount }) => <span>{numberFormatter(VoucherAmount)}</span>,
  },
  {
    title: <>{t('user_name')}</>,
    width: 200,
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
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId(record?.Id), setActiveTab('2');
            }}
          />
          <AntButton type="text" icon={<EyeOutlined style={{ color: 'blue' }} />} />
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', marginLeft: '-1rem' }} />} />
        </Space>
      </Tooltip>
    ),
  },
];

export const columns2 = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<DataType>[] => [
  {
    title: <>{t('debit_account')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    key: 1,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 250,
    searchableInput: true,
    dataIndex: 'JobLotDescription',
    key: 2,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 300,
    key: 3,
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('remarks')}</>,
    width: 350,
    dataIndex: 'Comments',
    key: 4,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title={t('actions')}>
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
