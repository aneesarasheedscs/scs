import { AntButton } from '@scs/ui';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';

export const AccountOpeningBalanceColumns = (t: any): AntColumnType<AccountOpeningBalance>[] => [
  {
    title: <>{t('account_type')}</>,
    dataIndex: 'AccountType',
    width: 200,
  },

  {
    title: <>{t('parent_account_title')}</>,
    dataIndex: 'ParentAccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 350,
  },

  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 350,
  },
  {
    title: <>{t('debit_balance')}</>,
    dataIndex: 'DebitBalance',
    searchableInput: true,
    width: 350,
  },
  {
    title: <>{t('credit_balance')}</>,
    dataIndex: 'CreditBalance',
    width: 350,
  },
];
