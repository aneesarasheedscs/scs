import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFollowUp, Tpayables, Treceivable } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';

export const PayableColumn = (t: any, handleAccountCodeClick: any): AntColumnType<Tpayables>[] => [
  {
    width: 350,
    title: t('account_title_3rd'),
    dataIndex: 'lvl03_Title',
    showCount: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.lvl03_Title.localeCompare(b.lvl03_Title),
  },
  {
    width: 150,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 250,
    title: t('account_title'),
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('opening'),
    dataIndex: 'Opening',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: t('debit'),
    dataIndex: 'Debit',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Debit - b.Debit,
    showTotal: true,
    align: 'right',
    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 150,
    title: t('current_credit'),
    dataIndex: 'Credit',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Credit - b.Credit,
    showTotal: true,
    align: 'right',
    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },

  {
    width: 150,
    title: t('closing'),
    dataIndex: 'Closing',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Closing - b.Closing,
    align: 'right',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    width: 150,
    title: t('last_bill_date'),
    dataIndex: 'LastBillDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { LastBillDate }) => formateDate(LastBillDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.LastBillDate);
      const dateB = dayjs(b.LastBillDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 150,
    title: t('last_bills_amount'),
    dataIndex: 'LastBillsAmount',
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LastBillsAmount - b.LastBillsAmount,
  },
  {
    width: 150,
    title: t('bill_days'),
    dataIndex: 'BillDays',
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BillDays - b.BillDays,
  },
  {
    width: 150,
    title: t('last_paid_amount'),
    dataIndex: 'LastRcvdAmount',
    align: 'right',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LastRcvdAmount - b.LastRcvdAmount,
  },
  {
    width: 150,
    title: t('paid_days'),
    dataIndex: 'RcvdDays',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RcvdDays - b.RcvdDays,
  },
  {
    width: 150,
    title: t('city_name'),
    dataIndex: 'CityName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    width: 150,
    title: t('mobile_personal'),
    dataIndex: 'MobilePersonal',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.MobilePersonal - b.MobilePersonal,
  },
  {
    width: 150,
    title: t('title'),
    dataIndex: 'Title',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Title.localeCompare(b.Title),
  },
];

export const ReceivableColumn = (t: any, handleAccountCodeClick: any): AntColumnType<Treceivable>[] => [
  {
    width: 250,
    title: t('account_title_3rd'),
    dataIndex: 'lvl03_Title',
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.lvl03_Title.localeCompare(b.lvl03_Title),
  },
  {
    width: 150,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 300,
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('opening'),
    dataIndex: 'Opening',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Opening - b.Opening,
    align: 'right',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: t('debit'),
    dataIndex: 'Debit',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Debit - b.Debit,
    showTotal: true,
    align: 'right',
    render: (Debit) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Debit)}</Space>
    ),
  },
  {
    width: 150,
    title: t('credit'),
    dataIndex: 'Credit',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Credit - b.Credit,
    showTotal: true,
    align: 'right',
    render: (Credit) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Credit)}</Space>
    ),
  },

  {
    width: 150,
    title: t('closing'),
    dataIndex: 'Closing',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Closing - b.Closing,
    showTotal: true,
    align: 'right',
    render: (Closing) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    width: 150,
    title: t('last_bill_date'),
    dataIndex: 'LastBillDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { LastBillDate }) => formateDate(LastBillDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.LastBillDate);
      const dateB = dayjs(b.LastBillDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 150,
    title: t('last_bills_amount'),
    dataIndex: 'LastBillsAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LastBillsAmount - b.LastBillsAmount,
  },
  {
    width: 150,
    title: t('bill_days'),
    dataIndex: 'BillDays',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    width: 200,
    title: t('last_rcvd_amount'),
    dataIndex: 'LastRcvdAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LastRcvdAmount - b.LastRcvdAmount,
  },
  {
    width: 200,
    title: t('rcvd_days'),
    dataIndex: 'RcvdDays',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RcvdDays - b.RcvdDays,
  },
  {
    width: 120,
    title: t('city_name'),
    dataIndex: 'CityName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    width: 200,
    title: t('mobile_personal'),
    dataIndex: 'MobilePersonal',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.MobilePersonal - b.MobilePersonal,
  },
  {
    width: 120,
    title: t('title'),
    dataIndex: 'Title',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Title.localeCompare(b.Title),
  },
];
export const FollowUpColumn = (t: any): AntColumnType<TFollowUp>[] => [
  // {
  //   title: t('sr#'),
  //   dataIndex: '',
  //   width: 100,

  //   render: (_, __, index) => index + 1,
  // },
  {
    width: 100,
    title: t('account_title'),
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 100,
    title: t('follow_date'),
    dataIndex: 'FollowUpDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { FollowUpDate }) => formateDate(FollowUpDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.FollowUpDate);
      const dateB = dayjs(b.FollowUpDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 100,
    title: t('NF-Days'),
    dataIndex: 'NF-Days',
  },
  {
    width: 100,
    title: t('promise_date'),
    dataIndex: 'PromiseDate',
    render: (_, { PromiseDate }) => formateDate(PromiseDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.PromiseDate);
      const dateB = dayjs(b.PromiseDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 100,
    title: t('comment_detail'),
    dataIndex: 'CommentDetail',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CommentDetail.localeCompare(b.CommentDetail),
  },
];
