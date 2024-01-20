import { numberFormatter } from '@tradePro/utils/numberFormatter';

import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { TCashAndBankBalancesSummary } from '../../types';

export const BankBalancesSummaryBank = (
  t: any,
  handleAccountCodeClick: any
): AntColumnType<TCashAndBankBalancesSummary>[] => [
  {
    width: 130,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 250,
    title: t('account_title'),
    searchableInput: true,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('opening'),
    searchableDate: true,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: t('current_credit'),
    searchableDate: true,
    showTotal: true,
    dataIndex: 'CurrCredit',

    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },
  {
    width: 150,
    title: t('current_debit'),
    showTotal: true,
    searchableDate: true,
    dataIndex: 'CurrDebit',

    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 150,
    title: t('closing'),
    showTotal: true,
    searchableDate: true,
    dataIndex: 'Closing',

    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
