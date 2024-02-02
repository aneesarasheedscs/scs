import { numberFormatter } from '@tradePro/utils/numberFormatter';

import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { TCashAndBankBalancesSummary } from '../../types';

export const BankBalancesSummaryBank = (
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
    searchableDate: true,
    dataIndex: 'Opening',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 250,
    title: t('current_credit'),
    searchableDate: true,
    showTotal: true,
    dataIndex: 'CurrCredit',
    align: 'right',
    sorter: (a, b) => a.CurrCredit - b.CurrCredit,
    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },
  {
    width: 250,
    title: t('current_debit'),
    showTotal: true,
    searchableDate: true,
    dataIndex: 'CurrDebit',
    align: 'right',
    sorter: (a, b) => a.CurrDebit - b.CurrDebit,
    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 250,
    title: t('closing'),
    showTotal: true,
    searchableDate: true,
    dataIndex: 'Closing',
    align: 'right',
    sorter: (a, b) => a.Closing - b.Closing,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
