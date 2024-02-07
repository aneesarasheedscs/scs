import dayjs from 'dayjs';
import { Space, Tooltip } from 'antd';
import { DataType } from '../form/types';
import { AntButton } from '@tradePro/components';
import { TCashPaymentVoucherTable } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordIdforDetail?: any
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
  // {
  //   title: t('status'),
  //   dataIndex: 'IsApproved',
  //   render: (IsApproved) => (
  //     <Space
  //       style={{
  //         color: IsApproved === 'True' ? '#5A54F9' : 'red',
  //         fontWeight: 'bold',
  //         width: '80%',
  //         position: 'absolute',
  //         top: 10,
  //         right: 5,
  //         textAlign: 'center',
  //         fontSize: 16,
  //         paddingLeft: 8,
  //       }}
  //     >
  //       {IsApproved === 'True' ? 'Active' : 'In-active'}
  //     </Space>
  //   ),
  //   width: 130,
  // },
  {
    title: t('remarks'),
    width: 240,
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
    width: 120,
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
                setSelectedRecordIdforDetail(record.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];

export const column2 = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<DataType>[] => [
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
    width: 350,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: t('action'),
    width: 120,
    render: (_, record, index) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'blue' }} />}
              onClick={() => handleEditRow(record)}
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
