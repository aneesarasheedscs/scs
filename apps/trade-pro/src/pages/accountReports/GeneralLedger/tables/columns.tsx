import { TGeneralLedgerDetail, TGeneralLedgerSummaryI, TGeneralLedgerSummaryII } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';
import dayjs from 'dayjs';
export const DetailTableColumns = (t: any): AntColumnType<TGeneralLedgerDetail>[] => [
  {
    title: t('date'),
    dataIndex: 'VoucherDate',
    showCount: true,
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },

  {
    width: 150,
    searchableInput: true,
    title: t('voucher_type'),
    dataIndex: 'DocType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocType.localeCompare(b.DocType),
  },
  {
    title: t('vocher_no'),
    dataIndex: 'VoucherNo',
    sorter: (a, b) => a.VoucherNo - b.VoucherNo,
    width: 150,
  },
  {
    width: 150,
    searchableInput: true,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sorter: (a, b) => a.AccountCode - b.AccountCode,
  },

  {
    width: 250,
    searchableInput: true,
    title: t('offset_title'),
    dataIndex: 'OffSetTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OffSetTitle.localeCompare(b.OffSetTitle),
  },
  {
    width: 200,
    title: t('debit'),
    dataIndex: 'Debit',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.Debit - b.Debit,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    width: 200,
    title: t('credit'),
    dataIndex: 'Credit',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.Credit - b.Credit,
    render: (Credit, recorde) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(Credit)}</Space>
    ),
  },
  {
    width: 200,
    title: t('balance'),
    dataIndex: 'Balance',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.Balance - b.Balance,

    render: (Balance, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(Balance)}</Space>
    ),
  },
  {
    width: 150,
    dataIndex: 'Comments',
    title: t('comments'),
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    width: 150,
    title: t('cheque_no'),
    dataIndex: 'ChequeNo',
    sorter: (a, b) => a.ChequeNo - b.ChequeNo,
  },

  {
    title: t('date'),
    dataIndex: 'ChequeDate',
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ChequeDate);
      const dateB = dayjs(b.ChequeDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
  },

  {
    width: 130,
    title: t('manuual_no'),
    dataIndex: 'MannualNo',

    sorter: (a, b) => a.MannualNo - b.MannualNo,
  },
  {
    width: 130,
    title: t('qty_in'),
    dataIndex: 'QtyIn',
    sorter: (a, b) => a.QtyIn - b.QtyIn,
    showTotal: true,
    render: (QtyIn, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(QtyIn)}</Space>
    ),
  },
  {
    width: 130,
    title: t('qty_out'),
    dataIndex: 'QtyOut',
    sorter: (a, b) => a.QtyOut - b.QtyOut,

    showTotal: true,
    render: (QtyOut, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(QtyOut)}</Space>
    ),
  },
  {
    width: 150,
    title: t('item_rate'),
    dataIndex: 'ItemRate',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.ItemRate - b.ItemRate,

    render: (ItemRate, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ItemRate)}</Space>
    ),
  },
  {
    width: 150,
    title: t('no_of_attachments'),

    dataIndex: '',
  },
];

export const SummaryITableColumns = (t: any): AntColumnType<TGeneralLedgerSummaryI>[] => [
  {
    width: 250,
    title: t('vocher_type'),
    searchableDate: true,
    dataIndex: 'DocumentTypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeDescription.localeCompare(b.DocumentTypeDescription),
  },
  {
    title: t('date'),
    dataIndex: 'VoucherDate',
    width: 200,
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },

  {
    title: t('vocher_no'),
    dataIndex: 'VoucherNo',
    width: 200,
  },
  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    width: 250,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('manual_bill_no'),
    dataIndex: 'ManualBillNo',
    width: 150,
  },

  {
    width: 150,
    title: t('debit'),
    dataIndex: 'DebitAmount',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (DebitAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    width: 150,
    title: t('credit'),
    dataIndex: 'CreditAmount',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    render: (CreditAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },
  {
    width: 150,
    title: t('running_balance'),
    dataIndex: 'RunningBalance',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.RunningBalance - b.RunningBalance,
    render: (RunningBalance, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(RunningBalance)}</Space>
    ),
  },
  {
    width: 200,
    title: t('remarks'),
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },

  {
    width: 150,
    title: t('Is_approved'),
    dataIndex: 'IsApproved',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IsApproved.localeCompare(b.IsApproved),
  },
];

export const SummaryIITableColumns = (t: any): AntColumnType<TGeneralLedgerSummaryII>[] => [
  {
    title: t('date'),
    dataIndex: 'VoucherDate',
    width: 200,
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
    showCount: true,
  },
  {
    width: 200,
    searchableInput: true,
    title: t('vocher_type'),
    dataIndex: 'VoucherType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherType.localeCompare(b.VoucherType),
  },
  { title: t('vocher_no'), dataIndex: 'VoucherNo', width: 120 },
  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 200,
    title: t('offset_title'),
    searchableInput: true,
    dataIndex: 'OffSetAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OffSetAccountTitle.localeCompare(b.OffSetAccountTitle),
  },
  {
    width: 200,
    title: t('remarks'),
    searchableInput: true,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    width: 200,
    title: t('debit'),
    dataIndex: 'DebitAmount',
    align: 'right',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    showTotal: true,
    render: (DebitAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    width: 200,
    title: t('credit'),
    dataIndex: 'CreditAmount',
    align: 'right',
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    showTotal: true,
    render: (_, { CreditAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },

  {
    width: 200,
    title: t('running_balance'),
    dataIndex: 'Balance',
    align: 'right',
    sorter: (a, b) => a.Balance - b.Balance,
    showTotal: true,
    render: (Balance, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Balance)}</Space>
    ),
  },
  {
    width: 160,
    title: t('no_of_attachments'),
    dataIndex: '',
  },
];
