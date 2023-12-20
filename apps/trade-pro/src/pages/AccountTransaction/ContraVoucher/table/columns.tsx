import { EditFilled, PrinterOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { TContraVoucherHistory } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TContraVoucherHistory>[] => [
  {
    title: <>{t('type')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('code')}</>,
    width: 120,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('voucher_date')}</>,
    width: 160,
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
    width: 190,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('voucher_amount')}</>,
    width: 160,
    dataIndex: 'VoucherAmount',
    showTotal: true,
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
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
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('attachment')}</>,
    width: 160,
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
              icon={<EyeOutlined style={{ color: 'blue' }} />}
              onClick={() => {
                setSelectedRecordId(record.Id);
              }}
            />
          </Space>
        </Tooltip>
        <Tooltip title="Print">
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red' }} />} />
        </Tooltip>
      </>
    ),
  },
];

export const columns2 = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<any>[] => [
  {
    title: <>{t('debit_account')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 300,
    searchableInput: true,
    dataIndex: 'JobLotDescription',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotId.localeCompare(b.JobLotId),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 300,

    showTotal: true,
    dataIndex: 'DebitAmount',
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('remarks')}</>,
    width: 350,
    dataIndex: 'Comments',

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
