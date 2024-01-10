import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { DataType } from '../form/types';

export const detailColumns = (t?: any): AntColumnType<DataType>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 350,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 200,
    dataIndex: 'JobLotDescription',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'DebitAmount',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '15%' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    title: <>{t('credit_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'CreditAmount',
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '15%' }}>
        {numberFormatter(CreditAmount)}
      </span>
    ),
  },
  {
    title: <>{t('remarks')}</>,
    width: 260,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
];
