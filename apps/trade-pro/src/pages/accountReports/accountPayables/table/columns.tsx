import { AntColumnType } from '@tradePro/globalTypes';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesTable } from './types';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Link } from 'react-router-dom';

export const columns = (t: any): AntColumnType<TAccountPayablesTable>[] => [
  {
    title: <>{t('account_code')}</>,
    width: 150,
    dataIndex: 'AccountCode',

    render: (_, { AccountCode }) => <Link to={`/general-ledger`}>{AccountCode}</Link>,
  },
  {
    title: <>{t('account_title')}</>,
    width: 270,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.AccountTitle);
      const dateB = dayjs(b.AccountTitle);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('due_days')}</>,
    width: 150,
    dataIndex: 'DueDays',
    render: (_, { DueDays }) => <span>{numberFormatter(DueDays)}</span>,
  },
  {
    title: <>{t('due_date')}</>,
    dataIndex: 'DueDate',
    width: 210,
    searchableDate: true,
    render: (_, { DueDate }) => formateDate(DueDate),
  },
  {
    title: <>{t('debit_amount')}</>,
    dataIndex: 'DebitAmount',
    width: 210,
    showTotal: true,
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('credit_amount')}</>,
    dataIndex: 'CreditAmount',
    width: 210,
    showTotal: true,
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
  },
  {
    title: <>{t('due_amount')}</>,
    dataIndex: 'DueAmount',
    width: 210,
    showTotal: true,
    render: (_, { DueAmount }) => <span>{numberFormatter(DueAmount)}</span>,
  },
];

export const columns2 = (t: any): AntColumnType<TAccountPayablesBetweenPeriodTable>[] => [
  {
    title: <>{t('account_code')}</>,
    width: 250,
    dataIndex: 'AccountCode',

    render: (_, { AccountCode }) => <a>{AccountCode}</a>,
  },
  {
    title: <>{t('account_title')}</>,
    width: 350,
    searchableInput: true,
    dataIndex: 'AccountTitle',
  },
  {
    title: <>{t('total_balance')}</>,
    width: 270,
    dataIndex: 'Opening',
    showTotal: true,
    render: (_, { Opening }) => <span>{numberFormatter(Opening)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.Opening);
      const dateB = dayjs(b.Opening);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    width: 270,
    showTotal: true,
    render: (_, { Debit }) => <span>{numberFormatter(Debit)}</span>,
  },
  {
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    width: 270,
    showTotal: true,
    render: (_, { Credit }) => <span>{numberFormatter(Credit)}</span>,
  },
];
