import { AntColumnType } from '@tradePro/globalTypes';
import { OpeningBalanceTypes } from '../types';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntButton } from '@scs/ui';

export const OpeningBalanceColumns = (t: any, handleEditButtonChange: any): AntColumnType<OpeningBalanceTypes>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 100,
    fixed: 'left',
    render: (_, __, index) => index + 1,
  },
  {
    width: 200,
    title: <>{t('account_type')}</>,
    searchableDate: true,
    dataIndex: 'AccountType',
  },
  {
    width: 290,
    title: <>{t('parent_account_title')}</>,
    searchableDate: true,
    dataIndex: 'ParentAccountTitle',
  },
  {
    width: 290,
    title: <>{t('account_title')}</>,
    searchableDate: true,
    dataIndex: 'AccountTitle',
  },
  {
    width: 220,
    title: <>{t('debit_balance')}</>,

    dataIndex: 'DebitBalance',
    showTotal: true,
    // align: 'right',
    render: (DebitBalance, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitBalance)}</Space>
    ),
  },
  {
    width: 220,
    title: <>{t('credit_balance')}</>,
    dataIndex: 'CreditBalance',
    showTotal: true,
    // align: 'right',
    render: (CreditBalance, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(CreditBalance)}
      </Space>
    ),
  },
  {
    title: 'Select ',
    dataIndex: 'Id',
    width: 120,
    render: (_, record) => <AntButton onClick={(e) => handleEditButtonChange(record)} label="Edit" size="small" />,
  },
];
