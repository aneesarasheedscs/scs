import { AntColumnType } from '@tradePro/globalTypes';

export const columns = (): AntColumnType<any>[] => [
  { title: 'Order No.', dataIndex: 'DocNo', fixed: 'left', width: 100 },
  { title: 'Order Date', dataIndex: 'DocDate', fixed: 'left', width: 150 },
  { title: 'Supplier Name', dataIndex: 'SupplierName', fixed: 'left', width: 200 },
  { title: 'Delivery Term', dataIndex: 'DeliveryTerm', width: 100 },
  { title: 'Item Name', dataIndex: 'ItemName', width: 100 },
  { title: 'Base UOM', dataIndex: 'UOMCodeItm', width: 100 },
  { title: 'Order Qty', dataIndex: 'OrderItemQty', width: 100 },
  { title: 'Received Qty', dataIndex: 'ReceivedQty', width: 100 },
  { title: 'Rej Qty', dataIndex: 'RejQty', width: 100 },
  { title: 'Balance Qty', dataIndex: 'BalQty', width: 100 },
  { title: 'Order Weight', dataIndex: 'NetWeight', width: 100 },
  { title: 'Received Weight', dataIndex: 'ReceivedWeight', width: 100 },
  { title: 'Bal Weight', dataIndex: 'BalWeight', width: 100 },
  { title: 'Item Rate', dataIndex: 'OrderItemRate', width: 100 },
  { title: 'Approved Date', dataIndex: 'PostDate', width: 100 },
  { title: 'Order Expiry Date', dataIndex: 'OrderExpiryDate', width: 100 },
];
