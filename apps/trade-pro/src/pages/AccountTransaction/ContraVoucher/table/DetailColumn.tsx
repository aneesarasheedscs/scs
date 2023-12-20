import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TContraDetailEntry } from '../form/types';

export const detailColumns = (t?: any): AntColumnType<TContraDetailEntry>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 360,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('remarks')}</>,
    width: 360,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 360,
    showTotal: true,
    dataIndex: 'DebitAmount',
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('credit_amount')}</>,
    width: 360,
    showTotal: true,
    dataIndex: 'CreditAmount',
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
  },
];
