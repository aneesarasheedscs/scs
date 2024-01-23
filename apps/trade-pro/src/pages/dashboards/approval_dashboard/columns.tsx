import {
  CashInHand,
  SaleOrder,
  SaleOrderCard,
  EmptyBags,
  SaleInvoice,
  ChargeToProduct,
  Voucher,
  VoucherApprovalHistory,
} from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Checkbox, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { PrinterTwoTone } from '@ant-design/icons';

export const columns = (
  t?: any,
  handleCheckboxChange?: any,
  selectedRowKeys?: any,
  handleSelectAllRecords?: any
): AntColumnType<VoucherApprovalHistory>[] => [
  {
    title: (
      <Checkbox
        onChange={(e) => {
          if (e.target.checked) {
            console.log('select all');
            handleSelectAllRecords(e.target.checked);
          } else {
            console.log('un select all');
            handleSelectAllRecords(e.target.checked);
          }
        }}
        name="IsActive"
        style={{ marginLeft: '10px' }}
      />
    ),
    dataIndex: 'VoucherHeadId',
    width: 60,
    render: (_, record) => (
      <Checkbox
        name="IsActive"
        onChange={(e) => handleCheckboxChange(record, e.target.checked)}
        checked={selectedRowKeys?.includes(record.VoucherHeadId)}
      />
    ),
  },
  {
    width: 60,
    title: <>{t('sr')}</>,
    dataIndex: 'RecordNo',
    showCount: true,
  },
  {
    title: <>{t('code')}</>,
    dataIndex: 'VoucherCode',
    render: (_, { VoucherCode }) => numberFormatter(VoucherCode),
    width: 80,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: <>{t('type')}</>,
    dataIndex: 'DocumentType',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentType.localeCompare(b.DocumentType),
    width: 100,
  },
  {
    title: <>{t('voucher_date')}</>,
    dataIndex: 'VoucherDate',
    searchableDate: true,
    width: 150,
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
    dataIndex: 'HeaderAccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.HeaderAccountTitle.localeCompare(b.HeaderAccountTitle),
    width: 250,
  },
  {
    align: 'right',
    title: <>{t('voucher_amount')}</>,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '1%' }}>
        {numberFormatter(VoucherAmount)}
      </span>
    ),
    showTotal: true,
    width: 180,
  },
  {
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ChequeNo - b.ChequeNo,
    render: (_, { ChequeNo }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '6%' }}>{numberFormatter(ChequeNo)}</span>
    ),
    width: 150,
  },
  {
    title: <>{t('cheque_date')}</>,
    searchableDate: true,
    dataIndex: 'ChequeDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.ChequeDate);
      const dateB = dayjs(b.ChequeDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
    width: 150,
  },
  {
    title: <>{t('entry_user')}</>,
    dataIndex: 'EntryUserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUserName.localeCompare(b.EntryUserName),
    width: 160,
  },

  {
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
    width: 180,
  },
  {
    title: <>{t('status')}</>,
    dataIndex: 'IsApproved',
    render: (IsApproved) => (
      <Space
        style={{
          color: IsApproved ? '#00A148' : 'red',

          borderRadius: '5px',
          width: '98%',
          height: '75%',
          fontSize: 14,
          fontWeight: 'bolder',
          paddingLeft: 8,
          border: '1px ridge white',
          position: 'absolute',
          top: 5,
          left: 0,
        }}
      >
        {IsApproved ? 'Approved' : 'Not Approved'}
      </Space>
    ),
    width: 120,
  },
  {
    align: 'center',
    title: <>{t('action')}</>,
    dataIndex: 'Actions',
    render: (_, record) => (
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip title="Voucher-Slip">
          <PrinterTwoTone
            style={{
              fontSize: 18,
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </Space>
    ),
    width: 100,
  },
];

export const columnss = (t: any): AntColumnType<CashInHand>[] => [
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 150,
  },

  {
    title: <>{t('offset_account')}</>,
    dataIndex: 'OffsetAccount',

    width: 150,
  },
  {
    title: <div style={{ textAlign: 'right' }}>{t('debit_amount')}</div>,
    dataIndex: 'DebitAmount',
    render: (_, { DebitAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 0 }}>
        <span style={{ marginRight: '5px' }}>{numberFormatter(DebitAmount)}</span>
      </Space>
    ),
    width: 100,
  },
  {
    title: <div style={{ textAlign: 'right' }}>{t('credit_amount')}</div>,
    dataIndex: 'CreditAmount',
    render: (_, { CreditAmount }) => (
      <div style={{ textAlign: 'right', paddingRight: 'px' }}>{numberFormatter(CreditAmount)}</div>
    ),
    width: 100,
  },
];

export const columnsss = (): AntColumnType<SaleOrder>[] => [
  {
    title: 'Sr#',
    dataIndex: 'ocumentTypeId',
    render: (_, __, index) => index + 1,
    width: 50,
  },
  {
    title: 'Doc No',
    dataIndex: '',

    width: 100,
  },

  {
    title: 'Doc Date',
    dataIndex: '',

    width: 150,
  },
  {
    title: 'Supplier Name',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Category',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Payment Term',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Delivery Term',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Due Date',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Commission Agent',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Commission Amount',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Brokery Amount',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Broker Agent',

    dataIndex: '',

    width: 150,
  },
  {
    title: 'Entry User',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Entry Date',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Modify User',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Modify Date',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Order Status',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Action',

    dataIndex: '',

    width: 100,
  },
];
export const columnssss = (): AntColumnType<SaleOrderCard>[] => [
  {
    title: 'Item Name',
    dataIndex: '',

    width: 150,
  },

  {
    title: 'Qty',
    dataIndex: '',

    width: 100,
  },
  {
    title: 'UOM',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Net Weight',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Rate',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Rate UOM',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Amount',

    dataIndex: '',

    width: 100,
  },
];
export const columnEmpty = (): AntColumnType<EmptyBags>[] => [
  {
    title: 'Item',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Rate',

    dataIndex: '',

    width: 100,
  },
  {
    title: '	Wt. Cut',

    dataIndex: '',

    width: 100,
  },
];
export const columnsaleInvoice = (): AntColumnType<SaleInvoice>[] => [
  {
    title: 'Item Name',
    dataIndex: '',

    width: 150,
  },
  {
    title: 'WareHouse',
    dataIndex: '',

    width: 100,
  },

  {
    title: 'Qty',
    dataIndex: '',

    width: 100,
  },
  {
    title: 'UOM',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Net Weight',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Rate',

    dataIndex: '',

    width: 100,
  },

  {
    title: 'Amount',

    dataIndex: '',

    width: 100,
  },
];
export const columnproduct = (): AntColumnType<ChargeToProduct>[] => [
  {
    title: 'Account',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Amount',

    dataIndex: '',

    width: 100,
  },
  {
    title: 'Remarks',

    dataIndex: '',

    width: 100,
  },
];
