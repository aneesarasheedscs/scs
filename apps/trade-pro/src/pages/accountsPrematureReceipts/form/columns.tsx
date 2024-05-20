import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';
import { TAccountsPrematureReceiptsList } from '../types';
export const columns = (t: TFunction): AntColumnType<TAccountsPrematureReceiptsList>[] => [
  {
    title: t('doc_no'),
    width: 90,
    // searchableInput: true,
    dataIndex: 'DocNo',
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: t('doc_date'),
    width: 110,
    // searchableInput: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),

    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },

  {
    title: t('tracking_slip'),
    width: 110,
    // searchableInput: true,
    dataIndex: 'TrackingSlipRef',
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },

  {
    title: t('slip_amount'),
    align: 'right',
    width: 120,
    dataIndex: 'SlipAmount',
    render: (_, { SlipAmount }) => numberFormatter(SlipAmount),
    // searchableDate: true,
    // render: (_, { VoucherDate }) => formateDate(VoucherDate),
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => {
    //   const dateA = dayjs(a.VoucherDate);
    //   const dateB = dayjs(b.VoucherDate);
    //   return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    // },
  },
  {
    title: t('voucher_type'),
    width: 150,
    dataIndex: 'VoucherType',
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('banck_name'),
    width: 180,
    dataIndex: 'SenderBank',
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('representative_account'),
    width: 200,
    // showTotal: true,
    // searchableInput: true,
    dataIndex: 'RepresentativeAccount',
    //     sortDirections: ['ascend', 'descend'],
    //     sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    //     render: (_, { VoucherAmount }) => (
    //       <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    //     ),
  },
  {
    title: t('sender_account'),
    width: 180,
    // showTotal: true,
    // searchableInput: true,
    dataIndex: 'SenderAccount',
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    // render: (_, { VoucherAmount }) => (
    //   <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    // ),
  },
  {
    title: t('receiver_account'),
    width: 180,
    // showTotal: true,
    // searchableInput: true,
    dataIndex: 'ReceiverAccount',
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    // render: (_, { VoucherAmount }) => (
    //   <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(VoucherAmount)}</span>
    // ),
  },
  {
    title: t('cheque_no'),
    width: 110,
    dataIndex: 'ChequeNo',
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.CheqNo - b.CheqNo,
  },
  {
    title: t('cheque_date'),
    dataIndex: 'ChequeDate',
    width: 110,
    // sortDirections: ['ascend', 'descend'],
    // searchableDate: true,
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
    // sorter: (a, b) => {
    //   const dateA = dayjs(a.ChequeDate);
    //   const dateB = dayjs(b.ChequeDate);
    //   return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    // },
  },
  {
    title: t('amount'),
    align: 'right',
    width: 110,
    dataIndex: 'Amount',
    render: (_, { Amount }) => numberFormatter(Amount),
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('status'),
    width: 110,
    dataIndex: 'EntryStatus',
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('remarks'),
    width: 200,
    dataIndex: 'RemarksHeader',
    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },

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
