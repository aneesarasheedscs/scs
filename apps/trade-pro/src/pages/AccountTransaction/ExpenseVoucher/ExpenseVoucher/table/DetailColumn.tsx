import { TFunction } from 'i18next';
import { TExpenseDetailEntry } from '../form/types';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const detailColumns = (t: TFunction): AntColumnType<TExpenseDetailEntry>[] => [
  {
    title: t('account_title'),
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('job_lot'),
    width: 270,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 250,
    showTotal: true,
    dataIndex: 'DebitAmount',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    align: 'right',
    title: t('credit_amount'),
    width: 250,
    showTotal: true,
    dataIndex: 'CreditAmount',
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</span>
    ),
  },
  {
    title: t('remarks'),
    width: 400,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
];
