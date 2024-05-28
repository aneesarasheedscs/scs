import { AntColumnType } from '@tradePro/globalTypes';

import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';
import { TtrialBalanceAllLevel } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}
export const FourTrialBalanceAllLevelHistoryColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    title: t('account_title'),
    width: 220,
    dataIndex: 'AccountTitle',
    showCount: true,
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 150,
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
    sorter: (a, b) => a.AcLevel - b.AcLevel,
  },

  {
    title: t('account_type'),
    width: 150,
    searchableInput: true,
    dataIndex: 'IsGroupDetail',
    sorter: (a, b) => a.IsGroupDetail.localeCompare(b.IsGroupDetail),
  },

  {
    title: t('opening'),
    width: 200,
    align: 'right',
    sorter: (a, b) => a.Opening - b.Opening,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
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
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Debit)}</Space>
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
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Credit)}</Space>
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
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];

export const SixTrialBalanceAllLevelHistoryColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    title: t('account_title'),
    width: 300,
    dataIndex: 'AccountTitle',
    showCount: true,
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('AC'),
    dataIndex: 'AccountCode',
    width: 130,
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
    sorter: (a, b) => a.AcLevel - b.AcLevel,
  },

  {
    title: t('account_type'),
    width: 180,
    searchableInput: true,
    dataIndex: 'IsGroupDetail',
    sorter: (a, b) => a.IsGroupDetail.localeCompare(b.IsGroupDetail),
  },
  {
    title: t('opening_dr'),
    width: 200,
    dataIndex: 'OpeningDr',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.OpeningDr - b.OpeningDr,
    render: (OpeningDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpeningDr)}</Space>
    ),
  },
  {
    title: t('opening_cr'),
    width: 200,
    dataIndex: 'OpeningCr',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.OpeningCr - b.OpeningCr,
    render: (OpeningCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpeningCr)}</Space>
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
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Debit)}</Space>
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
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    title: t('closing_dr'),
    width: 200,
    dataIndex: 'ClosingDr',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.CreditDr - b.CreditDr,
    render: (CreditDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditDr)}</Space>
    ),
  },
  {
    title: t('closing_cr'),
    width: 200,
    dataIndex: 'ClosingCr',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.ClosingCr - b.ClosingCr,
    render: (ClosingCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ClosingCr)}</Space>
    ),
  },
];
export const TrialBalanceAllLevelChildColumns = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    // title: t('account_title'),
    width: 240,
    dataIndex: 'AccountTitle',
    // showCount: true,
    // searchableInput: true,
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    // title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 150,
    // sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    // title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
    // sorter: (a, b) => a.AcLevel - b.AcLevel,
  },

  {
    // title: t('account_type'),
    width: 200,
    // searchableInput: true,

    dataIndex: 'IsGroupDetail',
    // sorter: (a, b) => a.IsGroupDetail.localeCompare(b.IsGroupDetail),
  },

  {
    // title: t('opening'),
    width: 210,
    align: 'right',
    // sorter: (a, b) => a.Opening - b.Opening,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    // title: t('debit'),
    width: 210,
    dataIndex: 'Debit',
    // sorter: (a, b) => a.Debit - b.Debit,
    align: 'right',
    showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    // title: t('credit'),
    width: 210,
    dataIndex: 'Credit',
    // sorter: (a, b) => a.Credit - b.Credit,
    align: 'right',
    showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Credit)}</Space>
    ),
  },
  {
    // title: t('closing'),
    width: 210,
    dataIndex: 'Closing',
    // sorter: (a, b) => a.Closing - b.Closing,
    align: 'right',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
export const TrialBalanceAllLevelChildColumnsSix = (t: any): AntColumnType<TtrialBalanceAllLevel>[] => [
  {
    // title: t('account_title'),
    width: 240,
    dataIndex: 'AccountTitle',
    // showCount: true,
    // searchableInput: true,
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    // title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 150,
    // sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    // title: t('account_level'),
    width: 150,
    dataIndex: 'AcLevel',
    // sorter: (a, b) => a.AcLevel - b.AcLevel,
  },

  {
    // title: t('account_type'),
    width: 200,
    // searchableInput: true,
    dataIndex: 'IsGroupDetail',
    // sorter: (a, b) => a.IsGroupDetail.localeCompare(b.IsGroupDetail),
  },

  {
    // title: t('opening_dr'),
    width: 200,
    dataIndex: 'OpeningDr',
    align: 'right',
    // showTotal: true,
    // sorter: (a, b) => a.OpeningDr - b.OpeningDr,
    render: (OpeningDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpeningDr)}</Space>
    ),
  },
  {
    // title: t('opening_cr'),
    width: 200,
    dataIndex: 'OpeningCr',
    align: 'right',
    // showTotal: true,
    // sorter: (a, b) => a.OpeningCr - b.OpeningCr,
    render: (OpeningCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(OpeningCr)}</Space>
    ),
  },

  {
    // title: t('debit'),
    width: 200,
    dataIndex: 'Debit',
    // sorter: (a, b) => a.Debit - b.Debit,
    align: 'right',
    // showTotal: true,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    // title: t('credit'),
    width: 200,
    dataIndex: 'Credit',
    // sorter: (a, b) => a.Credit - b.Credit,
    align: 'right',
    // showTotal: true,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    // title: t('closing_dr'),
    width: 200,
    dataIndex: 'ClosingDr',
    align: 'right',
    // showTotal: true,
    sorter: (a, b) => a.CreditDr - b.CreditDr,
    render: (CreditDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditDr)}</Space>
    ),
  },
  {
    // title: t('closing_cr'),
    width: 200,
    dataIndex: 'ClosingCr',
    align: 'right',
    // showTotal: true,
    // sorter: (a, b) => a.ClosingCr - b.ClosingCr,
    render: (ClosingCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ClosingCr)}</Space>
    ),
  },
];
