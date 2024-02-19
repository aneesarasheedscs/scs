import { AntColumnType } from '@tradePro/globalTypes';
import { TInventryReportHistory } from './types';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t: any): AntColumnType<TInventryReportHistory>[] => [
  {
    title: <>{t('document_type')}</>,
    width: 200,
    searchableInput: true,
    dataIndex: 'DocumentType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentType.localeCompare(b.DocumentType),
  },
  {
    title: <>{t('doc_date')}</>,
    width: 200,
    searchableDate: true,
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    title: <>{t('doc_no')}</>,
    width: 200,
    dataIndex: 'DocNo',
    render: (_, { DocNo }) => <span>{numberFormatter(DocNo)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    title: <>{t('ware_house')}</>,
    dataIndex: 'WareHouse',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouse.localeCompare(b.WareHouse),
  },
  {
    title: <>{t('job_lot')}</>,
    dataIndex: 'JobLot',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
  },
  {
    title: <>{t('item_code')}</>,
    dataIndex: 'ItemCode',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemCode - b.ItemCode,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('base_uom')}</>,
    dataIndex: 'BaseUom',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BaseUom.localeCompare(b.BaseUom),
  },
  {
    title: <>{t('qty_in')}</>,
    dataIndex: 'QtyIn',
    width: 200,
    showTotal: true,
    render: (_, { QtyIn }) => <span>{numberFormatter(QtyIn)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.QtyIn - b.QtyIn,
  },
  {
    title: <>{t('qty_out')}</>,
    dataIndex: 'QtyOut',
    width: 200,
    showTotal: true,
    render: (_, { QtyOut }) => <span>{numberFormatter(QtyOut)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.QtyOut);
      const dateB = dayjs(b.QtyOut);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('bal_qty')}</>,
    dataIndex: 'BalQty',
    width: 200,
    render: (_, { BalQty }) => <span>{numberFormatter(BalQty)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.BalQty);
      const dateB = dayjs(b.BalQty);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('weight_in')}</>,
    dataIndex: 'WeightIn',
    width: 200,
    showTotal: true,
    render: (_, { WeightIn }) => <span>{numberFormatter(WeightIn)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.WeightIn);
      const dateB = dayjs(b.WeightIn);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('weight_out')}</>,
    dataIndex: 'WeightOut',
    width: 200,
    showTotal: true,
    render: (_, { WeightOut }) => <span>{numberFormatter(WeightOut)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.WeightOut);
      const dateB = dayjs(b.WeightOut);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('bal_weight')}</>,
    dataIndex: 'BalWeight',
    width: 200,
    render: (_, { BalWeight }) => <span>{numberFormatter(BalWeight)}</span>,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.BalWeight);
      const dateB = dayjs(b.BalWeight);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
];
