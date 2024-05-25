import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TCashAndBankBalancesSummary } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';

export const CashBalancesSummaryCash = (
  t: any,
  handleAccountCodeClick: any
): AntColumnType<TCashAndBankBalancesSummary>[] => [
  {
    width: 220,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    showCount: true,
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 270,
    title: t('account_title'),

    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 250,
    title: t('opening'),
    dataIndex: 'Opening',
    align: 'right',
    sorter: (a, b) => a.Opening - b.Opening,
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '4%' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 250,
    title: t('current_debit'),
    dataIndex: 'CurrDebit',
    align: 'right',
    sorter: (a, b) => a.CurrDebit - b.CurrDebit,
    showTotal: true,
    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '4%' }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 250,
    title: t('current_credit'),
    dataIndex: 'CurrCredit',
    align: 'right',
    sorter: (a, b) => a.CurrCredit - b.CurrCredit,
    showTotal: true,
    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '4%' }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },
  {
    width: 200,
    title: t('closing'),
    dataIndex: 'Closing',
    align: 'right',
    sorter: (a, b) => a.Closing - b.Closing,
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '4%' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
