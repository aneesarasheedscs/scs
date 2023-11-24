import { TGeneralLedgerDetail, TGeneralLedgerSummaryI, TGeneralLedgerSummaryII } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';

export const DetailTableColumns = (t: any): AntColumnType<TGeneralLedgerDetail>[] => [
  { title: <>{t('sr#')}</>, dataIndex: '', width: 100, render: (_, __, index) => index + 1 },
  {
    width: 120,
    title: <>{t('vocher_date')}</>,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('doc_type')}</>,
    dataIndex: 'DocType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocType.localeCompare(b.DocType),
  },
  { title: <>{t('vocher_no')}</>, dataIndex: 'VoucherNo', width: 150 },
  { title: <>{t('account_code')}</>, dataIndex: 'AccountCode', width: 150 },
  { title: <>{t('off_set_account')}</>, dataIndex: 'OffSetTitle', width: 150 },
  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    align: 'right',
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    align: 'right',
    render: (Credit, recorde) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Credit)}</Space>
    ),
  },
  {
    width: 170,
    title: <>{t('balance')}</>,
    dataIndex: 'Balance',
    align: 'right',
    render: (Balance, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Balance)}</Space>
    ),
  },
  {
    width: 150,
    dataIndex: 'Comments',
    title: <>{t('comments')}</>,
  },
  {
    width: 120,
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
  },
  {
    width: 130,
    title: <>{t('cheque_date')}</>,
    dataIndex: 'ChequeDate',
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
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
    width: 120,
    title: <>{t('vocher_date')}</>,
    searchableDate: true,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('doc_type')}</>,
    dataIndex: 'DocumentTypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeDescription.localeCompare(b.DocumentTypeDescription),
  },
  { title: <>{t('vocher_no')}</>, dataIndex: 'VoucherNo', width: 120 },
  { title: <>{t('manual_bill_no')}</>, dataIndex: 'ManualBillNo', width: 120 },

  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'DebitAmount',
    align: 'right',
    render: (DebitAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'CreditAmount',
    align: 'right',
    render: (CreditAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },
  {
    width: 200,
    title: <>{t('running_balance')}</>,
    dataIndex: 'RunningBalance',
    align: 'right',
    render: (RunningBalance, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(RunningBalance)}
      </Space>
    ),
  },
  {
    width: 150,
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
  },

  {
    width: 150,
    title: <>{t('Is_approved')}</>,
    dataIndex: 'IsApproved',
  },
];

export const SummaryIITableColumns = (t: any): AntColumnType<TGeneralLedgerSummaryII>[] => [
  { title: <>{t('sr#')}</>, dataIndex: '', width: 100, render: (_, __, index) => index + 1 },
  {
    width: 120,
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
  { title: <>{t('vocher_title')}</>, dataIndex: 'AccountTitle', width: 170 },

  {
    width: 150,
    title: <>{t('off_set_account')}</>,
    dataIndex: 'OffSetAccountTitle',
    render: (_, { DebitAmount }) => numberFormatter(DebitAmount),
  },
  {
    width: 150,
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
  },
  {
    width: 200,
    title: <>{t('debit')}</>,
    dataIndex: 'DebitAmount',
    render: (DebitAmount, recode) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'CreditAmount',
    render: (_, { CreditAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },

  {
    width: 160,
    title: <>{t('running_balance')}</>,
    dataIndex: 'Balance',
  },
  {
    width: 160,
    title: <>{t('no_of_attachments')}</>,
    dataIndex: '',
  },
];
