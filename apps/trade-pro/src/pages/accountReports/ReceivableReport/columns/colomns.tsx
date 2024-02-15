import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { ReceivableReportTypeHistory, TFollowUp } from '../type';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';

export const ReceivablColumn = (t: any): AntColumnType<ReceivableReportTypeHistory>[] => [
  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    width: 300,
    searchableInput: true,
    showCount: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    width: 150,
  },
  {
    width: 120,
    title: t('opening'),
    showTotal: true,
    dataIndex: 'ObDebit',
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { ObDebit }) => numberFormatter(ObDebit),
  },

  {
    title: t('debit'),
    dataIndex: 'ClDebit',
    showTotal: true,
    width: 120,
    render: (_, { ClDebit }) => numberFormatter(ClDebit),
  },

  {
    title: t('credit'),
    dataIndex: 'CurrDebit',
    showTotal: true,
    width: 120,
    render: (_, { CurrDebit }) => numberFormatter(CurrDebit),
  },
  {
    title: t('closing'),
    dataIndex: 'CurrCredit',
    showTotal: true,
    width: 120,
    render: (_, { CurrCredit }) => numberFormatter(CurrCredit),
  },

  {
    title: t('last_bill_date'),

    dataIndex: 'Opening',
    width: 120,
    showTotal: true,

    render: (_, { Opening }) => numberFormatter(Opening),
  },

  {
    title: t('last_biils_amount'),

    dataIndex: 'BillDays',
    width: 150,
    render: (_, { BillDays }) => numberFormatter(BillDays),
  },
  {
    title: t('bill_days'),
    dataIndex: 'LastRcvdAmount',
    showTotal: true,
    width: 160,
    render: (_, { LastRcvdAmount }) => numberFormatter(LastRcvdAmount),
  },

  {
    title: t('last_rcvd_date'),

    dataIndex: 'LastBillDate',
    width: 120,

    render: (_, { LastBillDate }) => formateDate(LastBillDate),
  },
  {
    title: t('last_rcvd_amount'),
    dataIndex: 'BillDays',
    width: 150,
    render: (_, { BillDays }) => numberFormatter(BillDays),
  },

  {
    title: t('rcvd_days'),
    showTotal: true,
    dataIndex: 'LastBillsAmount',
    width: 120,
    render: (_, { LastBillsAmount }) => numberFormatter(LastBillsAmount),
  },
  {
    title: t('city_name'),
    dataIndex: 'LastRcvdDate',
    width: 120,
    render: (_, { LastRcvdDate }) => formateDate(LastRcvdDate),
  },
  {
    title: t('mobile_personal'),
    dataIndex: 'LastRcvdDate',
    width: 120,
    render: (_, { LastRcvdDate }) => formateDate(LastRcvdDate),
  },

  {
    title: t('title'),
    dataIndex: 'CityName',
    width: 130,
    searchableInput: true,
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    title: t('follow_up_date'),
    dataIndex: 'FollowUpDate',
    width: 120,
    render: (_, { FollowUpDate }) => numberFormatter(FollowUpDate),
  },
  {
    title: t('company_logo_image'),
    dataIndex: 'MobilePersonal',
    width: 120,
    render: (_, { MobilePersonal }) => numberFormatter(MobilePersonal),
  },
  {
    title: t('action'),
    dataIndex: 'PromiseDate',
    width: 120,
    render: (_, { PromiseDate }) => numberFormatter(PromiseDate),
  },
];

export const FollowUpColumn = (t: any): AntColumnType<TFollowUp>[] => [
  {
    width: 100,
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    showCount: true,
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
    searchableInput: true,
    align: 'right',
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
    searchableInput: true,
    sorter: (a, b) => a.CommentDetail.localeCompare(b.CommentDetail),
  },
];
