import { TPurchaseOrderHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (): AntColumnType<TPurchaseOrderHistory>[] => [
  { title: 'Order No.', dataIndex: 'DocNo', width: 100 },
  {
    width: 150,
    title: 'Order Date',
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
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
  { title: 'Base UOM', dataIndex: 'UOMCodeItm', width: 120 },
  {
    width: 120,
    title: 'Order Qty',
    dataIndex: 'OrderItemQty',
    render: (_, { OrderItemQty }) => numberFormatter(OrderItemQty),
  },
  {
    width: 120,
    title: 'Received Qty',
    dataIndex: 'ReceivedQty',
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 100,
    title: 'Rej Qty',
    dataIndex: 'RejQty',
    render: (_, { RejQty }) => numberFormatter(RejQty),
  },
  {
    width: 120,
    dataIndex: 'BalQty',
    title: 'Balance Qty',
    render: (_, { BalQty }) => numberFormatter(BalQty),
  },
  {
    width: 120,
    title: 'Order Weight',
    dataIndex: 'NetWeight',
    render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 130,
    title: 'Received Weight',
    dataIndex: 'ReceivedWeight',
    render: (_, { ReceivedWeight }) => numberFormatter(ReceivedWeight),
  },
  {
    width: 100,
    title: 'Bal Weight',
    dataIndex: 'BalWeight',
    render: (_, { BalWeight }) => numberFormatter(BalWeight),
  },
  {
    width: 100,
    title: 'Item Rate',
    dataIndex: 'OrderItemRate',
    render: (_, { OrderItemRate }) => numberFormatter(OrderItemRate),
  },
  { title: 'Approved Date', dataIndex: 'PostDate', width: 120 },
  {
    width: 150,
    title: 'Order Expiry Date',
    dataIndex: 'OrderExpiryDate',
    render: (_, { OrderExpiryDate }) => formateDate(OrderExpiryDate),
  },
];
