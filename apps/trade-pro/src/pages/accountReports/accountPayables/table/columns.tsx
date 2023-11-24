import { AntColumnType } from '@tradePro/globalTypes';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesTable } from './types';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Link } from 'react-router-dom';

export const columns = (t: any): AntColumnType<TAccountPayablesTable>[] => [
  {
    title: <>{t('account_code')}</>,
    width: 200,
    dataIndex: 'AccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.AccountCode);
      const dateB = dayjs(b.AccountCode);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { AccountCode }) => <Link to={`/general-ledger`}>{AccountCode}</Link>,
  },
  {
    title: <>{t('account_title')}</>,
    width: 220,
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
    width: 180,
    dataIndex: 'DueDays',
    render: (_, { DueDays }) => <span>{numberFormatter(DueDays)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DueDays);
      const dateB = dayjs(b.DueDays);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('due_date')}</>,
    dataIndex: 'DueDate',
    width: 210,
    searchableDate: true,
    render: (_, { DueDate }) => formateDate(DueDate),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DueDate);
      const dateB = dayjs(b.DueDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('debit_amount')}</>,
    dataIndex: 'DebitAmount',
    width: 220,
    showTotal: true,
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DebitAmount);
      const dateB = dayjs(b.DebitAmount);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('credit_amount')}</>,
    dataIndex: 'CreditAmount',
    width: 220,
    showTotal: true,
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.CreditAmount);
      const dateB = dayjs(b.CreditAmount);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('due_amount')}</>,
    dataIndex: 'DueAmount',
    width: 220,
    showTotal: true,
    render: (_, { DueAmount }) => <span>{numberFormatter(DueAmount)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DueAmount);
      const dateB = dayjs(b.DueAmount);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
];

export const columns2 = (t: any): AntColumnType<TAccountPayablesBetweenPeriodTable>[] => [
  {
    title: <>{t('account_code')}</>,
    width: 250,
    dataIndex: 'AccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.AccountCode);
      const dateB = dayjs(b.AccountCode);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { AccountCode }) => <Link to={`/general-ledger`}>{AccountCode}</Link>,
  },
  {
    title: <>{t('account_title')}</>,
    width: 350,
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
    title: <>{t('total_balance')}</>,
    width: 300,
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
    width: 300,
    showTotal: true,
    render: (_, { Debit }) => <span>{numberFormatter(Debit)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.Debit);
      const dateB = dayjs(b.Debit);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    width: 300,
    showTotal: true,
    render: (_, { Credit }) => <span>{numberFormatter(Credit)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.Credit);
      const dateB = dayjs(b.Credit);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
];
