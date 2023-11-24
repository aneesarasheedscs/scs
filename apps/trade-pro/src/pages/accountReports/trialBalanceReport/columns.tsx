import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { TrialBalanceHistory, TrialBalanceSearchCriteria } from './type';
import dayjs from 'dayjs';

function handleRowClick(AccountId: number, data?: TrialBalanceSearchCriteria) {
  console.log('Clicked on accountId:', AccountId + ' ' + data?.DateType);
  // Perform any other actions you need with the accountId here
}

export const ColumnsTrialBalanceReport = (
  t: any,
  formdata?: TrialBalanceSearchCriteria
): AntColumnType<TrialBalanceHistory>[] => [
  {
    title: <>{t('sr')}</>,
    dataIndex: '',
    width: 85,
    render: (_, __, index) => index + 1,
  },
  {
    title: <> {t('parent_account')}</>,
    dataIndex: 'ParentAccount',
    width: 150,
  },
  {
    title: <>{t('parent_account_title')}</>,
    dataIndex: 'ParentAccountTitle',
    width: 180,
  },
  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 120,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId, formdata)}>{AccountCode}</a>,
  },
  {
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',
    width: 150,
  },
  {
    title: <>{t('opening')}</>,
    dataIndex: 'Opening',
    width: 120,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    title: <>{t('opening_debit')}</>,
    dataIndex: 'OpeningDr',
    width: 120,
    render: (OpeningDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningDr)}</Space>
    ),
  },
  {
    title: <>{t('opening_credit')}</>,
    dataIndex: 'OpeningCr',
    width: 120,
    render: (OpeningCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningCr)}</Space>
    ),
  },
  {
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    width: 120,
    render: (Debit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    width: 120,
    render: (Credit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    title: <>{t('closing')}</>,
    dataIndex: 'Closing',
    width: 120,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },

  {
    title: <>{t('closing_debit')}</>,
    dataIndex: 'ClosingDr',
    width: 120,
    render: (ClosingDr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingDr)}</Space>
    ),
  },
  {
    title: <>{t('closing_credit')}</>,
    dataIndex: 'ClosingCr',
    width: 150,
    render: (ClosingCr, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingCr)}</Space>
    ),
  },
];
