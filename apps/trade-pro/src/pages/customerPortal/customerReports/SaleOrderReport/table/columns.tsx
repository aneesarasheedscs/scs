import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
// import { SaleOrderHistory } from './type';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { Space } from 'antd';

export const columns = (t: any): AntColumnType<any>[] => [
  {
    title: t('order_no'),
    dataIndex: 'DocNo',
    width: 110,
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    title: t('order_date'),
    width: 150,
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
    title: t('item_name'),
    width: 250,
    dataIndex: 'ItemName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    align: 'right',
    title: t('rate'),
    searchableInput: true,
    dataIndex: 'OrderItemRate',
    width: 80,
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderItemRate - b.OrderItemRate,
  },
  {
    title: t('order_qty'),
    dataIndex: 'OrderItemQty',
    searchableInput: true,
    width: 100,
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderItemQty - b.OrderItemQty,
  },
  {
    title: t('dispatch_qty'),
    dataIndex: 'DispatchQty',
    searchableInput: true,
    width: 100,
    align: 'right',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DispatchQty - b.DispatchQty,
  },
  {
    title: t('bal_qty'),
    dataIndex: 'BalQty',
    width: 100,
    align: 'right',
    showTotal: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalQty - b.BalQty,
  },

  {
    title: t('status'),
    dataIndex: 'OrderStatus',
    width: 110,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderStatus.localeCompare(b.OrderStatus),
  },
  {
    title: t('order_weight'),
    dataIndex: 'NetWeight',
    width: 100,
    align: 'right',
    showTotal: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NetWeight - b.NetWeight,
  },
  {
    title: t('dispatch_weight'),
    dataIndex: 'DispatchWeight',
    width: 100,
    align: 'right',
    sorter: (a, b) => a.DispatchWeight - b.DispatchWeight,
    showTotal: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t('bal_weight'),
    dataIndex: 'BalWeight',
    sorter: (a, b) => a.BalWeight - b.BalWeight,
    width: 100,
    align: 'right',
    showTotal: true,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
  },
];
