import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TDispatchedSTNLoadHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (t: any): AntColumnType<TDispatchedSTNLoadHistory>[] => {
  return [
    {
      title: t('doc_no'),
      dataIndex: 'DocNo',
      searchableInput: true,
      width: 110,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.DocNo - b.DocNo,
    },
    {
      title: t('doc_date'),
      dataIndex: 'DocDate',
      searchableDate: true,
      render: (_, { DocDate }) => formateDate(DocDate),
      width: 120,
      sorter: (a, b) => {
        const dateA = dayjs(a.DocDate);
        const dateB = dayjs(b.DocDate);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
    },
    {
      title: t('location_from'),
      dataIndex: 'SourceLocation',
      width: 240,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.SourceLocation.localeCompare(b.SourceLocation),
    },
    {
      title: t('location_to'),
      dataIndex: 'DestinationLocation',
      width: 260,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.DestinationLocation.localeCompare(b.DestinationLocation),
    },
    {
      title: t('item_name'),
      dataIndex: 'ItemName',
      width: 300,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    },
    {
      title: t('pack_uom'),
      dataIndex: 'UOMCode',
      width: 140,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.UOMCode.localeCompare(b.UOMCode),
    },
    {
      title: t('issued_qty'),
      dataIndex: 'IssuedQty',
      searchableInput: true,
      showTotal: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.IssuedQty - b.IssuedQty,
      width: 140,
      render: (_, { IssuedQty }) => (
        <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(IssuedQty)}</span>
      ),
    },
    {
      title: t('issued_rate'),
      searchableInput: true,
      dataIndex: 'IssuedRate',
      width: 140,
      showTotal: true,

      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.IssuedRate - b.IssuedRate,
      render: (_, { IssuedRate }) => (
        <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
          {numberFormatter(IssuedRate)}
        </span>
      ),
    },
    {
      searchableInput: true,
      title: t('issued_weight'),
      dataIndex: 'BillWeight',
      width: 150,
      showTotal: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.BillWeight - b.BillWeight,
      render: (_, { BillWeight }) => (
        <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
          {numberFormatter(BillWeight)}
        </span>
      ),
    },
    {
      title: t('stock_weight'),
      searchableInput: true,
      dataIndex: 'StockWeight',
      width: 150,
      showTotal: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.StockWeight - b.StockWeight,
      render: (_, { StockWeight }) => (
        <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
          {numberFormatter(StockWeight)}
        </span>
      ),
    },
    {
      title: t('issued_amount'),
      dataIndex: 'IssuedAmount',
      width: 160,
      showTotal: true,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.IssuedAmount - b.IssuedAmount,
      render: (_, { IssuedAmount }) => (
        <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
          {numberFormatter(IssuedAmount)}
        </span>
      ),
    },

    {
      title: t('remarks_header'),
      dataIndex: 'RemarksHeader',
      width: 200,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
    },
  ];
};
