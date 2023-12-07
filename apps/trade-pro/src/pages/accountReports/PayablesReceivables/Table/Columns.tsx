import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFollowUp, Tpayables, Treceivable } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';

export const PayableColumn = (t: any, handleAccountCodeClick: any): AntColumnType<Tpayables>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 100,
    render: (_, __, index) => index + 1,
  },
  {
    width: 260,
    title: <>{t('account_title_3rd')}</>,
    dataIndex: 'lvl03_Title',
  },
  {
    width: 150,
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 150,
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('opening'),
    dataIndex: 'Opening',
    align: 'right',
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    align: 'right',
    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('current_credit')}</>,
    dataIndex: 'Credit',
    align: 'right',
    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },

  {
    width: 150,
    title: <>{t('closing')}</>,
    dataIndex: 'Closing',
    align: 'right',
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('last_bill_date')}</>,
    dataIndex: 'LastBillDate',
    render: (_, { LastBillDate }) => formateDate(LastBillDate),
  },
  {
    width: 150,
    title: <>{t('last_bills_amount')}</>,
    dataIndex: 'LastBillsAmount',
  },
  {
    width: 150,
    title: <>{t('bill_days')}</>,
    dataIndex: 'BillDays',
  },
  {
    width: 150,
    title: <>{t('last_paid_amount')}</>,
    dataIndex: 'LastRcvdAmount',
  },
  {
    width: 150,
    title: <>{t('paid_days')}</>,
    dataIndex: 'RcvdDays',
  },
  {
    width: 150,
    title: <>{t('city_name')}</>,
    dataIndex: 'CityName',
  },
  {
    width: 150,
    title: <>{t('mobile_personal')}</>,
    dataIndex: 'MobilePersonal',
  },
  {
    width: 150,
    title: <>{t('title')}</>,
    dataIndex: 'Title',
  },
];

export const ReceivableColumn = (t: any, handleAccountCodeClick: any): AntColumnType<Treceivable>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 100,

    render: (_, __, index) => index + 1,
  },
  {
    width: 250,
    title: <>{t('account_title_3rd')}</>,
    dataIndex: 'lvl03_Title',
  },
  {
    width: 150,
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 250,
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('opening'),
    dataIndex: 'Opening',
    align: 'right',
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('debit')}</>,
    dataIndex: 'Debit',
    align: 'right',
    render: (Debit) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('credit')}</>,
    dataIndex: 'Credit',
    align: 'right',
    render: (Credit) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    width: 150,
    title: <>{t('closing')}</>,
    dataIndex: 'Closing',
    align: 'right',
    render: (Closing) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('last_bill_date')}</>,
    dataIndex: 'LastBillDate',
    render: (_, { LastBillDate }) => formateDate(LastBillDate),
  },
  {
    width: 150,
    title: <>{t('last_bills_amount')}</>,
    dataIndex: 'LastBillsAmount',
  },
  {
    width: 150,
    title: <>{t('bill_days')}</>,
    dataIndex: 'BillDays',
  },
  {
    width: 150,
    title: <>{t('last_rcvd_amount')}</>,
    dataIndex: 'LastRcvdAmount',
  },
  {
    width: 120,
    title: <>{t('rcvd_days')}</>,
    dataIndex: 'RcvdDays',
  },
  {
    width: 120,
    title: <>{t('city_name')}</>,
    dataIndex: 'CityName',
  },
  {
    width: 120,
    title: <>{t('mobile_personal')}</>,
    dataIndex: 'MobilePersonal',
  },
  {
    width: 120,
    title: <>{t('title')}</>,
    dataIndex: 'Title',
  },
];
export const FollowUpColumn = (t: any): AntColumnType<TFollowUp>[] => [
  // {
  //   title: <>{t('sr#')}</>,
  //   dataIndex: '',
  //   width: 100,

  //   render: (_, __, index) => index + 1,
  // },
  {
    width: 100,
    title: <>{t('account_title')}</>,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 100,
    title: <>{t('follow_date')}</>,
    dataIndex: 'FollowUpDate',
    render: (_, { FollowUpDate }) => formateDate(FollowUpDate),
  },
  {
    width: 100,
    title: <>{t('NF-Days')}</>,
    dataIndex: 'NF-Days',
  },
  {
    width: 100,
    title: t('promise_date'),
    dataIndex: 'PromiseDate',
    render: (_, { PromiseDate }) => formateDate(PromiseDate),
  },
  {
    width: 100,
    title: t('comment_detail'),
    dataIndex: 'CommentDetail',
  },
];
