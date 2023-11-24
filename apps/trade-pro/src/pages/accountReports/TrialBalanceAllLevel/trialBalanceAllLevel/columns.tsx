import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TtrialBalanceAllLevel, TtrialBalanceSelectedHistory } from '@tradePro/pages/accountReports/trialBalance/tyes';
import { TrialBalanceHistory } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
  // Perform any other actions you need with the accountId here
}
export const TrialBalanceAllLevelHistoryColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 150,
    dataIndex: 'AccountTitle',
  },
  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: <>{t('account_level')}</>,
    width: 150,
    dataIndex: 'AcLevel',
  },
  {
    title: 'Is Group Detail',
    width: 150,
    dataIndex: 'IsGroupDetail',
  },
  {
    title: 'Opening',
    width: 150,
    dataIndex: 'IsGroupDetail',
  },
  {
    title: 'Debit',
    width: 150,
    dataIndex: 'IsGroupDetail',
  },
  {
    title: 'Credit',
    width: 150,
    dataIndex: 'IsGroupDetail',
  },
  {
    title: 'Closing',
    width: 150,
    dataIndex: 'IsGroupDetail',
  },
];

// function handleRowClick(AccountId: number) {
//   console.log('Clicked on accountId:', AccountId);
// Perform any other actions you need with the accountId here
// }

export const ColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceHistory>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 100,
    render: (_, __, index) => index + 1,
  },

  {
    title: <>{t('accountcode')}</>,
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: <>{t('AccountTitle')}</>,
    dataIndex: 'AccountTitle',
    width: 250,
  },
  {
    title: <>{t('opening')}</>,
    showTotal: true,
    dataIndex: 'Opening',
    width: 250,

    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },

  {
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    showTotal: true,
    width: 200,

    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    showTotal: true,
    width: 200,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    title: <>{t('closing')}</>,
    dataIndex: 'Closing',
    showTotal: true,
    width: 200,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
];

export const TrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  {
    title: <>{t('sr')}</>,
    dataIndex: '',
    width: 100,
    render: (_, __, index) => index + 1,
  },
  {
    title: <>{t('class_name')}</>,
    width: 150,
    dataIndex: 'ClassName',
    searchableInput: true,
  },
  {
    title: <>{t('account_level')}</>,
    width: 150,
    dataIndex: 'AcLevel',
  },
  {
    title: <>{t('account_type')}</>,
    width: 150,
    dataIndex: 'AccountType',
  },
  {
    title: <>{t('account_code')}</>,
    width: 150,
    dataIndex: 'AccountCode',
  },
  {
    title: <>{t('account_title')}</>,
    width: 150,
    dataIndex: 'AccountTitle',
  },
  {
    title: <>{t('opening')}</>,
    width: 200,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: <>{t('debit')}</>,
    width: 200,
    dataIndex: 'Debit',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: <>{t('credit')}</>,
    width: 200,
    dataIndex: 'Credit',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    title: <>{t('closing')}</>,
    width: 200,
    dataIndex: 'Closing',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
