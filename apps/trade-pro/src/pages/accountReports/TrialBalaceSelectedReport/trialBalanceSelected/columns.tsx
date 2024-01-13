import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TtrialBalanceSelectedHistory } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const CommonTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  // {
  //   title: t('sr#'),
  //   dataIndex: '',
  //   width: 100,
  //   render: (_, __, index) => index + 1,
  // },
  {
    title: t('class_name'),
    width: 120,
    dataIndex: 'ClassName',
    searchableInput: true,
  },
  {
    title: t('account_level'),
    width: 120,
    dataIndex: 'AcLevel',
  },
  {
    title: t('account_type'),
    width: 200,
    dataIndex: 'AccountType',
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 120,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_title'),
    width: 180,
    dataIndex: 'AccountTitle',
  },
];
export const FourTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  ...(CommonTrialBalanceSelectedHistoryColumns(t) as AntColumnType<TtrialBalanceSelectedHistory>[]),

  {
    title: t('opening'),
    width: 200,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('debit'),
    width: 200,
    dataIndex: 'Debit',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    width: 200,
    dataIndex: 'Credit',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    title: t('closing'),
    width: 200,
    dataIndex: 'Closing',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
];

export const SixTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  ...(CommonTrialBalanceSelectedHistoryColumns(t) as AntColumnType<TtrialBalanceSelectedHistory>[]),

  {
    title: t('opening_dr'),
    width: 200,
    dataIndex: 'OpeningDr',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('opening_cr'),
    width: 200,
    dataIndex: 'OpeningCr',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('debit'),
    width: 200,
    dataIndex: 'Debit',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    width: 200,
    dataIndex: 'Credit',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    title: t('closing_dr'),
    width: 200,
    dataIndex: 'ClosingDr',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    title: t('closing_cr'),
    width: 200,
    dataIndex: 'ClosingCr',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
