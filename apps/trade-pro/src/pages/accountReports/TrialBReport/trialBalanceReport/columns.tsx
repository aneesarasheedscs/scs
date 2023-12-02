import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TrialBalanceHistory, TrialBalanceSixCol } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const SixColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceSixCol>[] => [
  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 200,
  },
  {
    title: <>{t('Opening Dr')}</>,
    showTotal: true,
    dataIndex: 'OpeningDr',
    width: 200,

    render: (OpeningDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningDr)}</Space>
    ),
  },
  {
    title: <>{t('Opening Cr')}</>,
    showTotal: true,
    dataIndex: 'OpeningCr',
    width: 200,

    render: (OpeningCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningCr)}</Space>
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
    title: <>{t('Closing Cr')}</>,
    dataIndex: 'ClosingCr',
    showTotal: true,
    width: 200,
    render: (ClosingCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingCr)}</Space>
    ),
  },
  {
    title: <>{t('Closing Dr')}</>,
    dataIndex: 'ClosingDr',
    showTotal: true,
    width: 200,
    render: (ClosingDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingDr)}</Space>
    ),
  },
];

export const FourColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceHistory>[] => [
  // {
  //   title: <>{t('sr#')}</>,
  //   dataIndex: '',
  //   width: 100,
  //   render: (_, __, index) => index + 1,
  // },

  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 200,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 250,
  },
  {
    title: <>{t('opening')}</>,
    showTotal: true,
    dataIndex: 'Opening',
    width: 300,

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
