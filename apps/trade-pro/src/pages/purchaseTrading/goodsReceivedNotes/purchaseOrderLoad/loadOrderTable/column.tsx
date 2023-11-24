import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TGRNDetailTable, TGrnDetailTable } from '../../types';
import { Checkbox, Space, Tooltip } from 'antd';

export const columns = (t?: any, handleCheckboxChange?: any, selectedRows?: any): AntColumnType<TGrnDetailTable>[] => [
  {
    title: 'Select Item',
    dataIndex: 'Id',
    width: 100,
    render: (_, record) => (
      <Checkbox
        onChange={(e) => handleCheckboxChange(record.OrderDetailId, e.target.checked)}
        checked={selectedRows.includes(record.OrderDetailId)}
      />
    ),
  },
  { title: <>{t('order_no')}</>, dataIndex: 'DocNo', width: 110 },
  {
    width: 150,
    title: <>{t('order_date')}</>,
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    width: 320,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  { title: <>{t('delivery_term')}</>, dataIndex: 'DeliveryTerm', width: 230 },
  { title: <>{t('payment_term')}</>, dataIndex: 'PaymentTerm', width: 230 },
  {
    width: 180,
    title: <>{t('item_quantity')}</>,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => (
      <>
        <Space style={{ marginLeft: '80%' }}>{ItemQty}</Space>
      </>
      // numberFormatter(ItemQty)
    ),
  },

  {
    width: 180,
    title: <>{t('remarks_header')}</>,
    dataIndex: 'RemarksHeader',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
];

export const Detailcolumns = (
  t?: any,
  handleCheckboxChange?: any,
  selectedRows?: any
): AntColumnType<TGrnDetailTable>[] => [
  {
    title: 'Select Item',
    dataIndex: 'Id',
    width: 100,
    render: (_, record) => (
      <Checkbox
        onChange={(e) => handleCheckboxChange(record.OrderDetailId, e.target.checked)}
        checked={selectedRows.includes(record.OrderDetailId)}
      />
    ),
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  { title: <>{t('base_pack_uom')}</>, dataIndex: 'PackUom', width: 180 },
  { title: <>{t('item_rate')}</>, dataIndex: 'ItemRate', width: 100 },
  {
    width: 100,
    title: <>{t('rate_uom')}</>,
    dataIndex: 'RateUom',
    // render: (_, { OrderItemQty }) => numberFormatter(OrderItemQty),
  },
  {
    width: 150,
    title: <>{t('item_quantity')}</>,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => (
      <>
        <Space style={{ marginLeft: '80%' }}>{ItemQty}</Space>
      </>
      // numberFormatter(ItemQty)
    ),
  },
  {
    width: 140,
    title: <>{t('received_quantity')}</>,
    dataIndex: 'ReceivedQty',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_quantity')}</>,
    dataIndex: 'BalQty',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_weight')}</>,
    dataIndex: 'NetWeight',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_amount')}</>,
    dataIndex: 'Amount',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
];
