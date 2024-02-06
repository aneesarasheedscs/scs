import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TrialBalanceHistory, TrialBalanceSixCol } from './type';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const SixColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceSixCol>[] => [
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 110,
    showCount: true,

    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_title'),
    searchableInput: true,

    dataIndex: 'AccountTitle',
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 225,
  },
  {
    title: t('Opening Dr'),
    showTotal: true,
    dataIndex: 'OpeningDr',
    sorter: (a, b) => a.OpeningDr - b.OpeningDr,
    width: 196,
    align: 'right',
    render: (OpeningDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(OpeningDr)}</Space>
    ),
  },
  {
    title: t('opening_cr'),
    showTotal: true,
    dataIndex: 'OpeningCr',

    width: 196,
    align: 'right',
    sorter: (a, b) => a.OpeningCr - b.OpeningCr,
    render: (OpeningCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(OpeningCr)}</Space>
    ),
  },

  {
    title: t('debit'),
    dataIndex: 'Debit',
    showTotal: true,
    width: 196,
    align: 'right',

    sorter: (a, b) => a.Debit - b.Debit,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-7%' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    dataIndex: 'Credit',
    showTotal: true,
    align: 'right',

    width: 196,
    sorter: (a, b) => a.Credit - b.Credit,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-7%' }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    title: t('closing_cr'),
    dataIndex: 'ClosingCr',
    showTotal: true,
    width: 196,
    align: 'right',
    sorter: (a, b) => a.ClosingCr - b.ClosingCr,
    render: (ClosingCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(ClosingCr)}</Space>
    ),
  },
  {
    title: t('closing_dr'),
    dataIndex: 'ClosingDr',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.ClosingDr - b.ClosingDr,
    width: 196,
    render: (ClosingDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>{numberFormatter(ClosingDr)}</Space>
    ),
  },
];

export const FourColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceHistory>[] => [
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',

    width: 196,
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    searchableInput: true,
    width: 300,
  },
  {
    title: t('opening'),
    showTotal: true,
    dataIndex: 'Opening',
    align: 'right',
    sorter: (a, b) => a.Opening - b.Opening,

    width: 250,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-6%' }}>{numberFormatter(Opening)}</Space>
    ),
  },

  {
    title: t('debit'),
    dataIndex: 'Debit',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.Debit - b.Debit,

    width: 250,

    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-7%' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: t('credit'),
    dataIndex: 'Credit',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.Credit - b.Credit,
    width: 250,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-7%' }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    title: t('closing'),
    dataIndex: 'Closing',
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.Closing - b.Closing,
    width: 250,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '-6%' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
