import { TPurchaseOrderHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t: any): AntColumnType<TPurchaseOrderHistory>[] => [
  { title: <>{t('order_no')}</>, dataIndex: 'DocNo', width: 110 },
  {
    width: 150,
    title: <>{t('order_date')}</>,
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  { title: <>{t('delivery_term')}</>, dataIndex: 'DeliveryTerm', width: 150 },
  { title: <>{t('item_name')}</>, dataIndex: 'ItemName', width: 350 },
  { title: <>{t('base_pack_uom')}</>, dataIndex: 'UOMCodeItm', width: 150 },
  {
    width: 150,
    title: <>{t('order_quantity')}</>,
    dataIndex: 'OrderItemQty',
    render: (_, { OrderItemQty }) => numberFormatter(OrderItemQty),
  },
  {
    width: 150,
    title: <>{t('received_quantity')}</>,
    dataIndex: 'ReceivedQty',
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 100,
    title: <>{t('rej_quantity')}</>,
    dataIndex: 'RejQty',
    render: (_, { RejQty }) => numberFormatter(RejQty),
  },
  {
    width: 140,
    dataIndex: 'BalQty',
    title: <>{t('balance_quantity')}</>,
    render: (_, { BalQty }) => numberFormatter(BalQty),
  },
  {
    width: 120,
    title: <>{t('order_weight')}</>,
    dataIndex: 'NetWeight',
    render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 150,
    title: <>{t('received_weight')}</>,
    dataIndex: 'ReceivedWeight',
    render: (_, { ReceivedWeight }) => numberFormatter(ReceivedWeight),
  },
  {
    width: 130,
    title: <>{t('balance_weight')}</>,
    dataIndex: 'BalWeight',
    render: (_, { BalWeight }) => numberFormatter(BalWeight),
  },
  {
    width: 150,
    title: <>{t('item_rate')}</>,
    dataIndex: 'OrderItemRate',
    render: (_, { OrderItemRate }) => numberFormatter(OrderItemRate),
  },
  { title: <>{t('approved_date')}</>, dataIndex: 'PostDate', width: 160 },
  {
    width: 250,
    title: <>{t('order_expiry_date')}</>,
    dataIndex: 'OrderExpiryDate',
    render: (_, { OrderExpiryDate }) => formateDate(OrderExpiryDate),
  },
];
