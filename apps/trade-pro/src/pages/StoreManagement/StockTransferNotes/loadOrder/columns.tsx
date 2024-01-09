import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { TLoadORderHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (t: any): AntColumnType<TLoadORderHistory>[] => {
  return [
    {
      title: <>{t('order_no')}</>,
      dataIndex: 'OrderNo',
      searchableInput: true,
      width: 130,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.OrderNo - b.OrderNo,
    },
    {
      title: <>{t('order_date')}</>,
      dataIndex: 'OrderDate',
      searchableDate: true,
      render: (_, { OrderDate }) => formateDate(OrderDate),
      width: 150,
      sorter: (a, b) => {
        const dateA = dayjs(a.OrderDate);
        const dateB = dayjs(b.OrderDate);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
    },
    {
      title: <>{t('location_from')}</>,
      dataIndex: 'SourceLocation',
      width: 250,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.SourceLocation.localeCompare(b.SourceLocation),
    },
    {
      title: <>{t('location_to')}</>,
      dataIndex: 'DestinationLocation',
      width: 280,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.DestinationLocation.localeCompare(b.DestinationLocation),
    },
    {
      title: <>{t('item_name')}</>,
      dataIndex: 'ItemName',
      width: 250,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    },
    {
      title: <>{t('pack_uom')}</>,
      dataIndex: 'PackUom',
      width: 150,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
    },
    {
      title: <>{t('req_qty')}</>,
      dataIndex: 'ReqQty',
      searchableDate: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ReqQty - b.ReqQty,
      width: 150,
    },
    {
      title: <>{t('approved_qty')}</>,
      dataIndex: 'ApprovedQty',
      width: 150,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ApprovedQty - b.ApprovedQty,
    },
    {
      title: <>{t('req_rate')}</>,
      searchableDate: true,
      dataIndex: 'ReqRate',
      width: 150,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ReqRate - b.ReqRate,
    },
    {
      searchableInput: true,
      title: <>{t('req_weight')}</>,
      dataIndex: 'ReqWeight',
      width: 180,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ReqWeight - b.ReqWeight,
    },
    {
      title: <>{t('stock_weight')}</>,
      searchableDate: true,
      dataIndex: 'StockWeight',
      width: 150,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.StockWeight - b.StockWeight,
    },
    {
      title: <>{t('req_amount')}</>,
      dataIndex: 'ReqAmount',
      width: 180,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.ReqAmount - b.ReqAmount,
    },

    {
      title: <>{t('remarks')}</>,
      dataIndex: 'RemarksHeader',
      width: 150,
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
    },
    {
      title: <>{t('attachment')}</>,
      dataIndex: '',
      width: 150,
    },
  ];
};
