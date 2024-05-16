import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { saleOrder } from './types';
import { formateDate } from '@tradePro/utils/formateDate';
import React from 'react';

export const Columns = (t: any): AntColumnType<any>[] => [
  {
    title: <>{t('voucher_type')}</>,
    dataIndex: 'VoucherType',
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 150,
  },
  {
    title: <>{t('Voucher_no')}</>,
    dataIndex: 'No',
    width: 130,
  },
  {
    title: <>{t('voucher_date')}</>,
    dataIndex: 'VoucherDate',
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 150,
  },
  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 150,
  },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 150,
  },
  {
    title: <>{t('comments')}</>,
    dataIndex: 'Comments',
    width: 150,
  },
  {
    title: <>{t('debit_amount')}</>,
    dataIndex: 'DebitAmount',
    width: 150,
  },
  {
    title: <>{t('credit_amount')}</>,
    dataIndex: 'CreditAmount',
    width: 150,
  },
  {
    title: <>{t(' cheque_no')}</>,
    dataIndex: 'ChequeNo', // Corrected dataIndex from ' ChequeNo' to 'ChequeNo'
    width: 140,
  },
  {
    title: <>{t('no_of_attatchment')}</>,
    dataIndex: 'NoOfAttatchment',
    width: 200,
  },
  {
    title: <>{t('print')}</>,
    dataIndex: 'print',
    width: 200,
  },
  // Add an expandable column
  {
    title: '',
    dataIndex: 'expand',
    width: 50,
    render: (_, record) => (
      <span onClick={() => record.onExpand(record)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {record.expanded ? '-' : '+'}
      </span>
    ),
  },
  // Add additional columns as needed for the inner table
  {
    title: 'Detail',
    dataIndex: 'detail',
    width: 200,
  },
];
