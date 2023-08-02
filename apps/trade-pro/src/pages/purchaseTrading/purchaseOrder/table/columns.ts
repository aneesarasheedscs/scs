import { AntColumnType } from '@tradePro/globalTypes';

export const columns = (): AntColumnType<any>[] => [
  { title: 'Order No.', dataIndex: '', fixed: 'left', width: 100 },
  { title: 'Order Date', dataIndex: '', fixed: 'left', width: 150 },
  { title: 'Supplier Name', dataIndex: '', fixed: 'left', width: 200 },
  { title: 'Delivery Term', dataIndex: '', width: 100 },
  { title: 'Item Name', dataIndex: '', width: 100 },
  { title: 'Base UOM', dataIndex: '', width: 100 },
  { title: 'Order Qty', dataIndex: '', width: 100 },
  { title: 'Received Qty', dataIndex: '', width: 100 },
  { title: 'Rej Qty', dataIndex: '', width: 100 },
  { title: 'Balance Qty', dataIndex: '', width: 100 },
  { title: 'Order Weight', dataIndex: '', width: 100 },
  { title: 'Received Weight', dataIndex: '', width: 100 },
  { title: 'Bal Weight', dataIndex: '', width: 100 },
  { title: 'Item Rate', dataIndex: '', width: 100 },
  { title: 'Approved Date', dataIndex: '', width: 100 },
  { title: 'Order Expiry Date', dataIndex: '', width: 100 },
];
