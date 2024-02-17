import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TVoucherDetailList } from '../../types';

export const detailColumns = (t?: any): AntColumnType<TVoucherDetailList>[] => [
  {
    title: t('account_title'),
    width: 280,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('against_ac'),
    width: 250,
    searchableInput: true,
    dataIndex: 'AgainstAccount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AgainstAccount.localeCompare(b.AgainstAccount),
  },
  {
    title: t('cheque no'),
    width: 150,
    searchableInput: true,
    dataIndex: 'CheqNoDetail',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNoDetail.localeCompare(b.CheqNoDetail),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 145,
    showTotal: true,
    dataIndex: 'DebitAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,

    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    align: 'right',
    title: t('credit_amount'),
    width: 145,
    showTotal: true,
    dataIndex: 'CreditAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,

    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</span>
    ),
  },
  {
    title: t('remarks'),
    width: 200,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
];
