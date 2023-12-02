import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TAccountReceivablesTable } from './types';

export const columns = (t: any): AntColumnType<TAccountReceivablesTable>[] => [
  {
    title: <>{t('account_code')}</>,
    width: 200,
    dataIndex: 'AccountCode',

    render: (_, { AccountCode }) => <a>{AccountCode}</a>,
  },
  {
    title: <>{t('account_title')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('due_days')}</>,
    width: 180,
    dataIndex: 'DueDays',
    render: (_, { DueDays }) => <span>{numberFormatter(DueDays)}</span>,
    sortDirections: ['ascend', 'descend'],
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
  },
  {
    title: <>{t('credit_amount')}</>,
    dataIndex: 'CreditAmount',
    width: 220,
    showTotal: true,
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: <>{t('due_amount')}</>,
    dataIndex: 'DueAmount',
    width: 220,
    showTotal: true,
    render: (_, { DueAmount }) => <span>{numberFormatter(DueAmount)}</span>,
    sortDirections: ['ascend', 'descend'],
  },
];
