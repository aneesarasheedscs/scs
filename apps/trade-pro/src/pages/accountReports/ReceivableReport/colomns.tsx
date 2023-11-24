import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { ReceivableReportTypeHistory } from './type';
import { formateDate } from '@tradePro/utils/formateDate';

export const ReceivablColumn = (): AntColumnType<ReceivableReportTypeHistory>[] => [
  {
    title: 'sr#',
    dataIndex: '',
    width: 50,
    render: (_, __, index) => index + 1,
  },

  {
    title: 'AccountTitle',
    dataIndex: 'AccountTitle',
    width: 300,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: 'AccountCode',
    dataIndex: 'AccountCode',
    width: 150,
    render: (_, { AccountCode }) => numberFormatter(AccountCode),
  },
  {
    width: 120,
    title: 'ObDebit',
    showTotal: true,

    dataIndex: 'ObDebit',
    render: (_, { ObDebit }) => numberFormatter(ObDebit),
  },

  {
    title: 'ClDebit',
    dataIndex: 'ClDebit',
    showTotal: true,
    width: 120,
    render: (_, { ClDebit }) => numberFormatter(ClDebit),
  },

  {
    title: 'CurrDebit',
    dataIndex: 'CurrDebit',
    showTotal: true,
    width: 120,
    render: (_, { CurrDebit }) => numberFormatter(CurrDebit),
  },
  {
    title: 'CurrCredit',
    dataIndex: 'CurrCredit',
    showTotal: true,
    width: 120,
    render: (_, { CurrCredit }) => numberFormatter(CurrCredit),
  },

  {
    title: 'Opening',
    dataIndex: 'Opening',
    width: 120,
    showTotal: true,

    render: (_, { Opening }) => numberFormatter(Opening),
  },

  {
    title: 'BillDays',
    dataIndex: 'BillDays',
    width: 120,
    render: (_, { BillDays }) => numberFormatter(BillDays),
  },
  {
    title: 'LastRcvdAmount',
    dataIndex: 'LastRcvdAmount',
    showTotal: true,
    width: 160,
    render: (_, { LastRcvdAmount }) => numberFormatter(LastRcvdAmount),
  },

  {
    title: 'LastBillDate',
    dataIndex: 'LastBillDate',
    width: 120,

    render: (_, { LastBillDate }) => formateDate(LastBillDate),
  },
  {
    title: 'BillDays',
    dataIndex: 'BillDays',
    width: 120,
    render: (_, { BillDays }) => numberFormatter(BillDays),
  },

  {
    title: 'LastBillsAmount',
    showTotal: true,
    dataIndex: 'LastBillsAmount',
    width: 120,
    render: (_, { LastBillsAmount }) => numberFormatter(LastBillsAmount),
  },
  {
    title: 'LastRcvdDate',
    dataIndex: 'LastRcvdDate',
    width: 120,
    render: (_, { LastRcvdDate }) => formateDate(LastRcvdDate),
  },
  {
    title: 'LastRcvdDate',
    dataIndex: 'LastRcvdDate',
    width: 120,
    render: (_, { LastRcvdDate }) => formateDate(LastRcvdDate),
  },

  {
    title: 'CityName',
    dataIndex: 'CityName',
    width: 130,
    searchableInput: true,
    sorter: (a, b) => a.CityName.localeCompare(b.CityName),
  },
  {
    title: 'FollowUpDate',
    dataIndex: 'FollowUpDate',
    width: 120,
    render: (_, { FollowUpDate }) => numberFormatter(FollowUpDate),
  },
  {
    title: 'MobilePersonal',
    dataIndex: 'MobilePersonal',
    width: 120,
    render: (_, { MobilePersonal }) => numberFormatter(MobilePersonal),
  },
  {
    title: 'PromiseDate',
    dataIndex: 'PromiseDate',
    width: 120,
    render: (_, { PromiseDate }) => numberFormatter(PromiseDate),
  },
];
