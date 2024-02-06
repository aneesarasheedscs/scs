import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TtrialBalanceSelectedHistory } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const CommonTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  {
    title: t('class_name'),
    width: 150,
    dataIndex: 'ClassName',
    showCount: true,
    searchableInput: true,
    sorter: (a, b) => a.ClassName.localeCompare(b.ClassName),
  },
  {
    title: t('account_level'),
    width: 170,
    dataIndex: 'AcLevel',
    sorter: (a, b) => a.AcLevel - b.AcLevel,
  },
  {
    title: t('account_type'),
    width: 190,
    dataIndex: 'AccountType',
    searchableInput: true,
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    width: 150,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_title'),
    width: 200,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
];
export const FourTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  ...(CommonTrialBalanceSelectedHistoryColumns(t) as AntColumnType<TtrialBalanceSelectedHistory>[]),

  {
    title: t('opening'),
    width: 200,
    dataIndex: 'Opening',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('debit'),
    width: 200,
    dataIndex: 'Debit',
    sorter: (a, b) => a.Debit - b.Debit,
    align: 'right',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    width: 200,
    dataIndex: 'Credit',
    sorter: (a, b) => a.Credit - b.Credit,
    align: 'right',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    title: t('closing'),
    width: 200,
    dataIndex: 'Closing',
    sorter: (a, b) => a.Closing - b.Closing,
    align: 'right',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];

export const SixTrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  ...(CommonTrialBalanceSelectedHistoryColumns(t) as AntColumnType<TtrialBalanceSelectedHistory>[]),

  {
    title: t('opening_dr'),
    width: 200,
    dataIndex: 'OpeningDr',
    sorter: (a, b) => a.OpeningDr - b.OpeningDr,
    align: 'right',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('opening_cr'),
    width: 200,
    dataIndex: 'OpeningCr',
    sorter: (a, b) => a.OpeningCr - b.OpeningCr,
    align: 'right',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: t('debit'),
    width: 200,
    dataIndex: 'Debit',
    sorter: (a, b) => a.Debit - b.Debit,
    align: 'right',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    width: 200,
    dataIndex: 'Credit',
    sorter: (a, b) => a.Credit - b.Credit,
    align: 'right',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    title: t('closing_dr'),
    width: 200,
    dataIndex: 'ClosingDr',
    sorter: (a, b) => a.ClosingDr - b.ClosingDr,
    align: 'right',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    title: t('closing_cr'),
    width: 200,
    dataIndex: 'ClosingCr',
    sorter: (a, b) => a.ClosingCr - b.ClosingCr,
    align: 'right',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
