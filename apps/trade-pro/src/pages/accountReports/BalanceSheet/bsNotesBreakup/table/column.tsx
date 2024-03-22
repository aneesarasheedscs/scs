import { Link } from 'react-router-dom';
import { TAccountsData } from '../../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t?: any): AntColumnType<TAccountsData>[] => [
  {
    width: 200,
    title: <>{t('account_code')}</>,
    dataIndex: 'ParentAccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ParentAccountCode.localeCompare(b.ParentAccountCode),
    render: (_, { ParentAccountCode }) => <Link to="/Inventory-EvaluationI-tem-Ledger">{ParentAccountCode}</Link>,
  },
  {
    width: 300,
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    render: (_, { AccountTitle }) => <Link to="/Inventory-EvaluationI-tem-Ledger">{AccountTitle}</Link>,
  },

  {
    title: <>{t('account_notes_id')}</>,
    dataIndex: 'AccountNoteId',
    searchableInput: true,
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountNoteId - b.AccountNoteId,
    render: (_, { AccountNoteId }) => <span style={{ marginLeft: '20%' }}>{numberFormatter(AccountNoteId)}</span>,
  },
  {
    title: <>{t('account_notes')}</>,
    dataIndex: 'AccountsNotes',
    searchableInput: true,
    width: 300,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountsNotes.localeCompare(b.AccountsNotes),
    render: (_, { AccountsNotes }) => AccountsNotes,
  },
  {
    title: <>{t('amount')}</>,
    showTotal: true,
    dataIndex: 'Amount',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Amount - b.Amount,
    render: (_, { Amount }) => <span style={{ marginLeft: '20%' }}>{numberFormatter(Amount)}</span>,
  },
];
