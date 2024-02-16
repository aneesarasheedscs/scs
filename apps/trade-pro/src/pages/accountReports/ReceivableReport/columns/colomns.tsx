import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { ReceivableReportTypeHistory, TFollowUp } from '../type';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@scs/ui';
import { PhoneOutlined } from '@ant-design/icons';

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

    render: (_, { AccountCode, AccountId }) => (
      <>
        {/* <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a> */}
        <a>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 120,
    title: t('opening'),
    showTotal: true,
    dataIndex: 'Opening',
    sorter: (a, b) => a.Opening - b.Opening,
    align: 'right',
    render: (_, { Opening }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
    ),
  },

  {
    title: t('debit'),
    dataIndex: 'ObDebit',
    showTotal: true,
    width: 120,
    sorter: (a, b) => a.ObDebit - b.ObDebit,
    align: 'right',
    render: (_, { ObDebit }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ObDebit)}</Space>
    ),
  },

  {
    title: t('credit'),
    dataIndex: 'ObCredit',
    showTotal: true,
    width: 120,
    sorter: (a, b) => a.ObCredit - b.ObCredit,
    align: 'right',
    render: (_, { ObCredit }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ObCredit)}</Space>
    ),
  },
  {
    title: t('closing'),
    dataIndex: 'ClDebit',
    showTotal: true,
    width: 120,
    sorter: (a, b) => a.ClDebit - b.ClDebit,
    align: 'right',
    render: (_, { ClDebit }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ClDebit)}</Space>
    ),
  },

  {
    title: t('last_bill_date'),
    dataIndex: 'LastBillDate',
    width: 200,
    render: (_, { LastBillDate }) => formateDate(LastBillDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.LastBillDate);
      const dateB = dayjs(b.LastBillDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    title: t('last_biils_amount'),
    dataIndex: 'LastBillsAmount',
    width: 150,
    showTotal: true,
    sorter: (a, b) => a.LastBillsAmount - b.LastBillsAmount,
    align: 'right',
    render: (_, { LastBillsAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(LastBillsAmount)}</Space>
    ),
  },
  {
    title: t('bill_days'),
    dataIndex: 'BillDays',
    showTotal: true,
    width: 160,
    sorter: (a, b) => a.BillDays - b.BillDays,
    align: 'right',
    render: (_, { BillDays }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(BillDays)}</Space>
    ),
  },

  {
    title: t('last_rcvd_date'),
    dataIndex: 'LastRcvdDate',
    width: 150,
    render: (_, { LastRcvdDate }) => formateDate(LastRcvdDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.LastRcvdDate);
      const dateB = dayjs(b.LastRcvdDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('last_rcvd_amount'),
    dataIndex: 'LastRcvdAmount',
    width: 200,
    showTotal: true,
    sorter: (a, b) => a.LastRcvdAmount - b.LastRcvdAmount,
    align: 'right',
    render: (_, { LastRcvdAmount }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(LastRcvdAmount)}</Space>
    ),
  },

  {
    title: t('rcvd_days'),
    showTotal: true,
    dataIndex: 'RcvdDays',
    width: 150,
    sorter: (a, b) => a.RcvdDays - b.RcvdDays,
    align: 'right',
    render: (_, { RcvdDays }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(RcvdDays)}</Space>
    ),
  },
  {
    title: t('city_name'),
    dataIndex: 'CityName',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    title: t('mobile_personal'),
    dataIndex: 'MobilePersonal',
    width: 150,
    sorter: (a, b) => a.MobilePersonal - b.MobilePersonal,
  },

  {
    title: t('title'),
    dataIndex: 'Title',
    width: 130,
    searchableInput: true,
    sorter: (a, b) => a.Title.localeCompare(b.Title),
  },
  {
    title: t('follow_up_date'),
    dataIndex: 'FollowupDate',
    width: 150,
    render: (_, { FollowupDate }) => formateDate(FollowupDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.FollowupDate);
      const dateB = dayjs(b.FollowupDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('promise_date'),
    dataIndex: 'PromiseDate',
    width: 120,
    render: (_, { PromiseDate }) => formateDate(PromiseDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.PromiseDate);
      const dateB = dayjs(b.PromiseDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('company_logo_image'),
    dataIndex: 'CompLogoImage',
    width: 170,
    searchableInput: true,
  },

  {
    title: t('action'),
    dataIndex: 'PromCompLogoImageiseDate',
    width: 150,
    render: (_, record) => (
      <Tooltip title="CellNo">
        <AntButton
          style={{ border: 'none', display: 'flex', justifyContent: 'center', position: 'relative', top: '-5px' }}
          ghost
          size="small"
          icon={<PhoneOutlined />}
        />
      </Tooltip>
    ),
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
