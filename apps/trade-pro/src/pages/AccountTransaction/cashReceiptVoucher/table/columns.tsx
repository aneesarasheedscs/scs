import dayjs from 'dayjs';
import { Space, Tooltip } from 'antd';
import { DataType } from '../form/types';
import { AntButton } from '@tradePro/components';
import { TCashReceiptVoucherTable } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordIdforDetail?: any
): AntColumnType<TCashReceiptVoucherTable>[] => [
  {
    title: t('code'),
    width: 110,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
    showCount: true,
  },
  {
    title: t('type'),
    width: 120,
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
    width: 250,
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
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
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
    title: t('entry_user'),
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
    width: 150,
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
    width: 150,
  },
  // {
  //   title: t('status'),
  //   dataIndex: 'IsApproved',
  //   render: (IsApproved) => (
  //     <Space
  //       style={{
  //         backgroundColor: IsApproved ? '#00A148' : '#f37daa',
  //         color: 'white',
  //         borderRadius: '5px',
  //         width: '95%',
  //         paddingLeft: 8,
  //         border: '1px ridge white',
  //         boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
  //         position: 'absolute',
  //         top: 8,
  //         left: 0,
  //       }}
  //     >
  //       {IsApproved ? 'Approved' : 'Not Approved'}
  //     </Space>
  //   ),
  //   width: 120,
  // },

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
          <Space style={{ position: 'absolute', top: 5, left: 10 }}>
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
          <Space style={{ position: 'absolute', top: 5, right: 10 }}>
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
    width: 300,
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
    width: 300,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    align: 'right',
    title: t('credit_amount'),
    width: 300,
    dataIndex: 'CreditAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</span>
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
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteRow(record)} />}
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
