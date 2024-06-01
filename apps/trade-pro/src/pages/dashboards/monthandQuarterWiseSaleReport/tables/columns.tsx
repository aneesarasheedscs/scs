import dayjs from 'dayjs';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TMonthlySaleReport, TQuarterlySaleReport } from '../types';

export const columns = (t?: any): AntColumnType<TMonthlySaleReport>[] => [
  {
    width: 50,
    title: t('sr'),
    render: (__, _, index) => index + 1,
  },
  {
    width: 100,
    title: t('month'),
    searchableInput: true,
    dataIndex: 'SalesMonth',
    sortDirections: ['ascend', 'descend'],
    render: (_, { SalesMonth }) => formateDate(SalesMonth),
    sorter: (a, b) => {
      const dateA = dayjs(a.SalesMonth);
      const dateB = dayjs(b.SalesMonth);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 100,
    title: t('amount'),
    align: 'right',
    dataIndex: 'CurrSaleAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CurrSaleAmount - b.CurrSaleAmount,
    render: (_, { CurrSaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>
        {numberFormatter(CurrSaleAmount)}
      </span>
    ),
  },
];

export const column = (t?: any): AntColumnType<TQuarterlySaleReport>[] => [
  {
    title: t('sr'),
    width: 50,
    render: (__, _, index) => index + 1,
  },
  {
    width: 80,
    title: t('start_date'),
    searchableDate: true,
    dataIndex: 'QuarterStartDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { QuarterStartDate }) => formateDate(QuarterStartDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.QuarterStartDate);
      const dateB = dayjs(b.QuarterStartDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 80,
    title: t('end_date'),
    searchableDate: true,
    dataIndex: 'QuarterEndDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { QuarterEndDate }) => formateDate(QuarterEndDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.QuarterEndDate);
      const dateB = dayjs(b.QuarterEndDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 80,
    title: t('quarter_year'),
    dataIndex: 'YearNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.YearNo - b.YearNo,
    render: (_, { YearNo }) => numberFormatter(YearNo),
  },
  {
    width: 80,
    title: t('amount'),
    dataIndex: 'CurrSaleAmount',
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CurrSaleAmount - b.CurrSaleAmount,
    render: (_, { CurrSaleAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '0%' }}>
        {numberFormatter(CurrSaleAmount)}
      </span>
    ),
  },
];
