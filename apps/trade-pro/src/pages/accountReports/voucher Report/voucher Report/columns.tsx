import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { TVoucherReport } from '../types';
import { Space } from 'antd';
import dayjs from 'dayjs';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const columnsVoucherReport = (t: any): AntColumnType<TVoucherReport>[] => [
  {
    title: t('type'),
    dataIndex: 'DocumentTypeCode',
    showCount: true,
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
    width: 120,

  },

  {
    title: t('v_code'),
    dataIndex: 'VoucherCode',
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
    width: 120,
  },
  {
    title: t('date'),
    dataIndex: 'voucherdate',
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.voucherdate);
      const dateB = dayjs(b.voucherdate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },

  {
    title: t('manual_bill_no'),
    dataIndex: 'ManualBillNo',
    sorter: (a, b) => a.ManualBillNo - b.ManualBillNo,
    width: 150,
  },

  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 150,
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode }) => <a>{AccountCode}</a>,
  },

  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 250,
  },

  {
    title: t('cheque'),
    dataIndex: 'ChequeNo',
    sorter: (a, b) => a.ChequeNo - b.ChequeNo,
    width: 120,
  },

  {
    title: t('comments'),
    dataIndex: 'Comments',
    searchableInput: true,
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
    width: 160,
  },

  {
    title: t('debit'),
    dataIndex: 'DebitAmount',
    width: 130,
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
    width: 130,
    render: (CreditAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</Space>
    ),
  },
];
