import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';

export const detailColumns = (t?: any): AntColumnType<DataType>[] => [
  {
    title: t('account_title'),
    width: 320,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('job_lot'),
    width: 300,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: t('remarks'),
    width: 320,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 250,
    showTotal: true,
    dataIndex: 'DebitAmount',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(DebitAmount)}</span>
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
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(CreditAmount)}</span>
    ),
  },
];
