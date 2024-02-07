import { AntColumnType } from '@tradePro/globalTypes';
import { TtrialBalanceAllLevel } from '@tradePro/pages/accountReports/trialBalance/tyes';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
  // Perform any other actions you need with the accountId here
}
export const FourTrialBalanceAllLevelHistoryColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    title: t('account_title'),
    width: 150,
    dataIndex: 'AccountTitle',
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
  },

  {
    title: t('account_type'),
    width: 150,
    dataIndex: 'IsGroupDetail',
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: 'Opening',
    width: 150,
    dataIndex: 'Opening',
  },
  {
    title: 'Debit',
    width: 150,
    dataIndex: 'Debit',
  },
  {
    title: 'Credit',
    width: 150,
    dataIndex: 'Credit',
  },
  {
    title: 'Closing',
    width: 150,
    dataIndex: 'Closing',
  },
];

export const SixTrialBalanceAllLevelHistoryColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    title: t('account_title'),
    width: 150,
    dataIndex: 'AccountTitle',
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
  },

  {
    title: t('account_type'),
    width: 150,
    dataIndex: 'IsGroupDetail',
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: 'Opening Dr',
    width: 150,
    dataIndex: 'OpeningDr',
  },
  {
    title: 'Opening Cr',
    width: 150,
    dataIndex: 'OpeningCr',
  },

  {
    title: 'Debit',
    width: 150,
    dataIndex: 'Debit',
  },
  {
    title: 'Credit',
    width: 150,
    dataIndex: 'Credit',
  },

  {
    title: 'Credit Dr',
    width: 150,
    dataIndex: 'CreditDr',
  },
  {
    title: 'Closing Cr',
    width: 150,
    dataIndex: 'ClosingCr',
  },
];
