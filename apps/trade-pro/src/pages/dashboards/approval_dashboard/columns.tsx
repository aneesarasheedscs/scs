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

import { PrinterFilled, CheckSquareFilled } from '@ant-design/icons';

export const columns = (t: any): AntColumnType<VoucherApprovalHistory>[] => [
  {
    width: 80,
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
    width: 170,
  },
  {
    title: <>{t('voucher_amount')}</>,
    dataIndex: 'VoucherAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => <span style={{ marginLeft: '55%' }}>{numberFormatter(VoucherAmount)}</span>,
    showTotal: true,
    width: 180,
  },
  {
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
    searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.ChequeNo - b.ChequeNo,
    width: 150,
  },
  {
    title: <>{t('cheque_date')}</>,
    dataIndex: 'ChequeDate',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => {
    //   const dateA = dayjs(a.ChequeDate);
    //   const dateB = dayjs(b.ChequeDate);
    //   return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    // },
    // render: (_, { ChequeDate }) => formateDate(ChequeDate),
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
  // {
  //   title: <>{t('pay_title')}</>,
  //   dataIndex: 'PayTitle',
  //   searchableInput: true,
  //   sortDirections: ['ascend', 'descend'],
  //   sorter: (a, b) => a.PayTitle.localeCompare(b.PayTitle),
  //   width: 170,
  // },
  // {
  //   title: <>{t('no of attachments')}</>,
  //   dataIndex: 'NoOfAttachments',
  //   sortDirections: ['ascend', 'descend'],
  //   sorter: (a, b) => a.NoOfAttachments - b.NoOfAttachments,

  //   width: 190,
  // },
  {
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
    width: 150,
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
    width: 130,
  },
  {
    title: <>{t('action')}</>,
    dataIndex: '',
    render: (_, record) => (
      <Space>
        <Tooltip title="Voucher-Slip">
          <PrinterFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#f37daa',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
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
