import { TGeneralLedgerDetail, TGeneralLedgerSummaryI, TGeneralLedgerSummaryII } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';

export const DetailTableColumns = (t: any): AntColumnType<TGeneralLedgerDetail>[] => [
  { title: <>{t('sr#')}</>, dataIndex: '', width: 100, render: (_, __, index) => index + 1 },
  {
    width: 200,
    title: <>{t('vocher_date')}</>,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('voucher_type')}</>,
    dataIndex: 'DocType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocType.localeCompare(b.DocType),
  },
  {
    title: <>{t('vocher_no')}</>,
    dataIndex: 'VoucherNo',
    width: 150,
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
  },

  {
    width: 250,
    searchableInput: true,
    title: <>{t('offset_title')}</>,
    dataIndex: 'OffSetTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OffSetTitle.localeCompare(b.OffSetTitle),
  },
  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    showTotal: true,
    render: (Debit, record) => <Space style={{}}>{numberFormatter(Debit)}</Space>,
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    showTotal: true,
    render: (Credit, recorde) => <Space style={{}}> {numberFormatter(Credit)}</Space>,
  },
  {
    width: 170,
    title: <>{t('balance')}</>,
    dataIndex: 'Balance',
    render: (Balance, recode) => <Space style={{}}> {numberFormatter(Balance)}</Space>,
  },
  {
    width: 200,
    dataIndex: 'Comments',
    title: <>{t('comments')}</>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    width: 150,
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
  },
  {
    width: 200,
    title: <>{t('cheque_date')}</>,
    dataIndex: 'ChequeDate',
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
  },
  {
    width: 130,
    title: <>{t('Mannual No')}</>,
    dataIndex: 'MannualNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.MannualNo.localeCompare(b.MannualNo),
  },
  {
    width: 130,
    title: <>{t('qty_in')}</>,
    dataIndex: 'QtyIn',
    showTotal: true,
    render: (QtyIn, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(QtyIn)}</Space>
    ),
  },
  {
    width: 130,
    title: <>{t('qty_out')}</>,
    dataIndex: 'QtyOut',
    showTotal: true,
    render: (QtyOut, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(QtyOut)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('item_rate')}</>,
    dataIndex: 'ItemRate',
    render: (ItemRate, record) => <Space style={{}}>{numberFormatter(ItemRate)}</Space>,
  },
  {
    width: 150,
    title: <>{t('no_of_attachments')}</>,
    dataIndex: '',
  },
];

export const SummaryITableColumns = (t: any): AntColumnType<TGeneralLedgerSummaryI>[] => [
  { title: <>{t('sr#')}</>, dataIndex: '', width: 100, render: (_, __, index) => index + 1 },
  {
    width: 200,
    title: <>{t('vocher_type')}</>,
    searchableDate: true,
    dataIndex: 'DocumentTypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeDescription.localeCompare(b.DocumentTypeDescription),
  },
  {
    width: 200,
    title: <>{t('vocher_date')}</>,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('vocher_no')}</>,
    dataIndex: 'VoucherNo',
    width: 150,
  },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 300,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('manual_bill_no')}</>,
    dataIndex: 'ManualBillNo',
    width: 150,
  },

  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (DebitAmount, recode) => <Space style={{}}>{numberFormatter(DebitAmount)}</Space>,
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'CreditAmount',
    showTotal: true,
    render: (CreditAmount, recode) => <Space style={{}}>{numberFormatter(CreditAmount)}</Space>,
  },
  {
    width: 200,
    title: <>{t('running_balance')}</>,
    dataIndex: 'RunningBalance',
    render: (RunningBalance, recode) => <Space style={{}}>{numberFormatter(RunningBalance)}</Space>,
  },
  {
    width: 250,
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },

  {
    width: 150,
    title: <>{t('Is_approved')}</>,
    dataIndex: 'IsApproved',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IsApproved.localeCompare(b.IsApproved),
  },
];

export const SummaryIITableColumns = (t: any): AntColumnType<TGeneralLedgerSummaryII>[] => [
  { title: <>{t('sr#')}</>, dataIndex: '', width: 100, render: (_, __, index) => index + 1 },
  {
    width: 200,
    title: <>{t('vocher_date')}</>,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('vocher_type')}</>,
    dataIndex: 'VoucherType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherType.localeCompare(b.VoucherType),
  },
  { title: <>{t('vocher_no')}</>, dataIndex: 'VoucherNo', width: 120 },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 300,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 300,
    title: <>{t('off_set_title')}</>,
    dataIndex: 'OffSetAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OffSetAccountTitle.localeCompare(b.OffSetAccountTitle),
  },
  {
    width: 300,
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (DebitAmount, recode) => <Space style={{}}>{numberFormatter(DebitAmount)}</Space>,
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'CreditAmount',
    showTotal: true,
    render: (_, { CreditAmount }) => <Space style={{}}>{numberFormatter(CreditAmount)}</Space>,
  },

  {
    width: 160,
    title: <>{t('running_balance')}</>,
    dataIndex: 'Balance',
    render: (Balance, recode) => <Space style={{}}>{numberFormatter(Balance)}</Space>,
  },
  {
    width: 160,
    title: <>{t('no_of_attachments')}</>,
    dataIndex: '',
  },
];
