import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TGRNDetailTable, TGRNDetailTableHistory } from '../../types';
import { Checkbox, Space, Tooltip } from 'antd';

export const columns = (t?: any): AntColumnType<TGRNDetailTableHistory>[] => {
  return [
    {
      title: 'Select Item',
      dataIndex: 'Id',
      width: 100,
      render: (_, record) => <Checkbox />,
    },
    { title: <>{t('order_no')}</>, dataIndex: 'OrderNo', width: 110 },
    {
      width: 150,
      title: <>{t('order_date')}</>,
      searchableDate: true,
      dataIndex: 'OrderDate',
      render: (_, { OrderDate }) => formateDate(OrderDate),
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
    { title: <>{t('payment_term')}</>, dataIndex: 'UOMCodeItm', width: 230 },
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
      dataIndex: 'Remarks',
      // render: (_, { NetWeight }) => numberFormatter(NetWeight),
    },
  ];
};
export const Detailcolumns = (t: any): AntColumnType<TGRNDetailTableHistory>[] => [
  {
    title: 'Select Item',
    dataIndex: 'Id',
    width: 100,
    render: (_, record) => <Checkbox />,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  { title: <>{t('base_pack_uom')}</>, dataIndex: 'BaseUom', width: 180 },
  { title: <>{t('item_rate')}</>, dataIndex: ' ', width: 100 },
  {
    width: 100,
    title: <>{t('rate_uom')}</>,
    dataIndex: ' ',
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
    dataIndex: ' ',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_quantity')}</>,
    dataIndex: ' ',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_weight')}</>,
    dataIndex: ' ',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('balance_amount')}</>,
    dataIndex: ' ',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
];
