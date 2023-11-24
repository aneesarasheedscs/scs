import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TtrialBalanceSelectedHistory } from './type';

export const TrialBalanceSelectedHistoryColumns = (t: any): AntColumnType<TtrialBalanceSelectedHistory>[] => [
  {
    title: <>{t('sr#')}</>,
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
