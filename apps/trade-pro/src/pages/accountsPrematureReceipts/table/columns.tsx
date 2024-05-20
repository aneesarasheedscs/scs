import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
// import { TBankPaymentVoucherTable } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
// import { DataType, TBankPaymentDetailEntry } from '../form/types';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
export const columns = (
  t: TFunction
  //   setSelectedRecordId: (id: number | null) => void,
  //   setActiveTab: (tab: string) => void,
  //   setSelectedRecordDetailId: (id: number | null) => void
): AntColumnType<any>[] => [
  // {
  //   title: t('doc_date'),
  //   width: 150,
  //   searchableInput: true,
  //   dataIndex: 'VoucherCode',
  //   sortDirections: ['ascend', 'descend'],
  //   sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  //   showCount: true,
  // },
  {
    title: t('doc_no'),
    width: 120,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: t('tracking_slip'),
    width: 150,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },

  {
    title: t('slip_amount'),
    align: 'right',
    width: 180,
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
    title: t('voucher_type'),
    width: 200,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('banck_name'),
    width: 200,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('representative_account'),
    width: 200,
    showTotal: true,
    searchableInput: true,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
  },
  {
    title: t('sender_account'),
    width: 180,
    showTotal: true,
    searchableInput: true,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    ),
  },
  {
    title: t('receiver_account'),
    width: 180,
    showTotal: true,
    searchableInput: true,
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
    sorter: (a, b) => a.CheqNo - b.CheqNo,
  },
  {
    title: t('cheque_date'),
    dataIndex: 'ChequeDate',
    sortDirections: ['ascend', 'descend'],
    searchableDate: true,
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.ChequeDate);
      const dateB = dayjs(b.ChequeDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    width: 180,
  },
  {
    title: t('amount'),
    align: 'right',
    width: 180,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('status'),
    width: 180,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('remarks'),
    width: 250,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  //   {
  //     title: t('entry_date'),
  //     dataIndex: 'EntryDate',

  //     sortDirections: ['ascend', 'descend'],
  //     searchableDate: true,
  //     render: (_, { EntryDate }) => formateDate(EntryDate),
  //     sorter: (a, b) => {
  //       const dateA = dayjs(a.EntryDate);
  //       const dateB = dayjs(b.EntryDate);
  //       return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
  //     },
  //     width: 150,
  //   },
  //   {
  //     title: t('pay_title'),
  //     width: 200,
  //     dataIndex: 'PayeeTitle',
  //     searchableInput: true,
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => a.PayeeTitle.localeCompare(b.PayeeTitle),
  //   },

  //   {
  //     title: t('attachments'),
  //     width: 150,
  //     dataIndex: 'Attachment',
  //     sortDirections: ['ascend', 'descend'],
  //   },
  {
    fixed: 'right',
    title: t('action'),
    width: 95,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
          <Space style={{ position: 'absolute', top: 10, left: 10 }}>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => {
                // setSelectedRecordId(record?.Id), setActiveTab('2');
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
                // setSelectedRecordDetailId(record.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
