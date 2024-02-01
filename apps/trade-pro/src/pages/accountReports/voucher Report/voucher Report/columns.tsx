import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { TVoucherReport } from '../types';
import { Space } from 'antd';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const columnsVoucherReport = (t: any): AntColumnType<TVoucherReport>[] => [
  {
    title: t('type'),
    dataIndex: 'DocumentTypeCode',
    width: 80,
  },

  {
    title: t('voucher_code'),
    dataIndex: 'VoucherCode',
    width: 120,
  },

  {
    title: t('voucher_date'),
    dataIndex: 'voucherdate',
    width: 200,
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },

  {
    title: t('manual_bill_no'),
    dataIndex: 'ManualBillNo',
    width: 110,
  },

  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 120,
    render: (_, { AccountCode }) => <a>{AccountCode}</a>,
  },

  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    width: 250,
  },

  {
    title: t('cheque'),
    dataIndex: 'ChequeNo',
    width: 100,
  },

  {
    title: t('comments'),
    dataIndex: 'Comments',
    width: 160,
  },

  {
    title: t('debit'),
    dataIndex: 'DebitAmount',
    width: 190,
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },

  {
    title: t('credit'),
    dataIndex: 'CreditAmount',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    width: 190,
    render: (CreditAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },
];
