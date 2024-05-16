import dayjs from 'dayjs';
import { TPurchaseOrderHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';

export const columns = (t:TFunction): AntColumnType<TPurchaseOrderHistory>[] => [
  { title: 'Order No.', dataIndex: 'OrderNo', width: 100 },
  {
    width: 150,
    title: 'Order Date',
    searchableDate: true,
    dataIndex: 'OrderDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { OrderDate }) => formateDate(OrderDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.OrderDate);
      const dateB = dayjs(b.OrderDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 300,
    searchableInput: true,
    title: 'Supplier Name',
    dataIndex: 'SupplierName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  { title: 'Delivery Term', dataIndex: 'DeliveryTerm', width: 150 },
  { title: 'Item Name', dataIndex: 'ItemName', width: 350 },
  { title: 'Base UOM', dataIndex: 'BaseUom', width: 120 },
  {
    width: 120,
    title: 'Order Qty',
    dataIndex: 'OrderQty',
    render: (_, { OrderQty }) => numberFormatter(OrderQty),
  },
  {
    width: 120,
    title: 'Received Qty',
    dataIndex: 'ReceivedQty',
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 120,
    title: 'Balance Qty',
    dataIndex: 'BalanceQty',
    render: (_, { BalanceQty }) => numberFormatter(BalanceQty),
  },
  {
    width: 120,
    showTotal: true,
    title: 'Order Weight',
    dataIndex: 'OrderWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderWeight - b.OrderWeight,
    render: (_, { OrderWeight }) => numberFormatter(OrderWeight),
  },
  {
    width: 130,
    showTotal: true,
    title: 'Received Weight',
    dataIndex: 'ReceivedWeight',
    render: (_, { ReceivedWeight }) => numberFormatter(ReceivedWeight),
  },
  {
    width: 100,
    showAverage: true,
    title: 'Bal Weight',
    dataIndex: 'BalWeight',
    render: (_, { BalWeight }) => numberFormatter(BalWeight),
  },
  {
    width: 100,
    title: 'Item Rate',
    dataIndex: 'ItemRate',
    render: (_, { ItemRate }) => numberFormatter(ItemRate),
  },
  {
    width: 120,
    title: 'Approved Date',
    dataIndex: 'ApprovedDate',
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
  },
  {
    width: 150,
    title: 'Order Expiry Date',
    dataIndex: 'OrderExpiryDate',
    render: (_, { OrderExpiryDate }) => formateDate(OrderExpiryDate),
  },
];
